import * as React from "react";
import { DetectorState, WeedDetectorENV } from "./interfaces";
import { WeedDetectorBody } from "./weed_detector_body";
import { TitleBar } from "./weed_detector_title";
import { devices } from "../device";
import { success, error, Row, Col, Widget } from "../ui/index";
import { t } from "i18next";
import { resetWeedDetection, selectImage } from "./actions";
import { Progress } from "../util";
import { Pair } from "farmbot/dist";
import { HSV } from "./index";
import { FarmwareProps } from "../devices/interfaces";
import { connect } from "react-redux";
import { mapStateToProps } from "../farmware/state_to_props";
const PLANT_DETECTION_OPTIONS_KEY = "PLANT_DETECTION_options";

@connect(mapStateToProps)
export class WeedDetector
  extends React.Component<FarmwareProps, Partial<DetectorState>> {
  constructor() {
    super();
    this.state = { remoteFarmwareSettings: {} };
  }

  /** Attempts to deserialize data on the device.
   * Returns {} as Partial<WeedDetectorENV> if anything goes wrong. */
  get optionsOnDevice(): Partial<WeedDetectorENV> {
    let { user_env } = this.props.bot.hardware;
    let jsonString = user_env[PLANT_DETECTION_OPTIONS_KEY] || "{}";
    try { return JSON.parse(jsonString) } catch (e) { return {}; }
  }

  get farmwareSettings() {
    return { ...this.optionsOnDevice, ...this.state.remoteFarmwareSettings };
  }

  componentDidMount() {
    const IS_ONLINE = !!this
      .props
      .bot
      .hardware
      .user_env["LAST_CLIENT_CONNECTED"];
    const NEEDS_SETUP = !!Object.keys(this.optionsOnDevice).length;
    let remoteFarmwareSettings = this.farmwareSettings;
    (IS_ONLINE && NEEDS_SETUP) ?
      this.saveSettings() : this.setState({ remoteFarmwareSettings });
  }

  clearWeeds = () => {
    let progress = (p: Readonly<Progress>) => {
      let percentage = `${Math.round((p.completed / p.total) * 100)} %`;
      this.setState({ deletionProgress: p.isDone ? "" : percentage });
    };
    this.props.dispatch(resetWeedDetection(progress));
    this.setState({ deletionProgress: "Deleting..." });
  }

  saveSettings = () => {
    let nextEnv = {
      [PLANT_DETECTION_OPTIONS_KEY]: JSON.stringify(this.farmwareSettings)
    };

    let ok = () => success(t("Settings saved."));
    let no = () => error(t("Settings NOT saved."));

    devices.current.setUserEnv(nextEnv).then(ok, no);
  }

  sliderChange = (key: keyof HSV<"">, values: [number, number]) => {
    let oldSettings = this.farmwareSettings;
    let newSettings = { [key]: values };
    let remoteFarmwareSettings = { ...oldSettings, ...newSettings };
    this.setState({ remoteFarmwareSettings });
  }

  test = () => {
    let settings = this.farmwareSettings;
    let pairs = Object
      .keys(settings)
      .map<Pair>(function (value: keyof typeof settings, index) {
        let label = JSON.stringify(settings[value]) || "null";
        return { kind: "pair", args: { value, label } };
      });
    devices.current.execScript("plant-detection", pairs);
  }

  render() {
    return <Widget className="weed-detector-widget coming-soon">
      <Row>
        <Col>
          <TitleBar
            onDeletionClick={this.clearWeeds}
            deletionProgress={this.state.deletionProgress}
            onSave={this.saveSettings}
            onTest={this.test}
            title={"Weed Detector"}
          />
          <Row>
            <Col sm={12}>
              <WeedDetectorBody
                onFlip={(uuid) => this.props.dispatch(selectImage(uuid))}
                currentImage={this.props.currentImage}
                images={this.props.images}
                onSliderChange={this.sliderChange}
                H={this.farmwareSettings.H}
                S={this.farmwareSettings.S}
                V={this.farmwareSettings.V}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Widget>;
  }
}
