import * as React from "react";
import { connect } from "react-redux";
import { Page, Col, Row } from "../ui/index";
import { WeedDetector } from "../images/index";
import { FarmwarePanel } from "./farmware_panel";
import { Props } from "./interfaces";
import { mapStateToProps } from "./state_to_props";
import { Photos } from "./photos";
import { CameraCalibration } from "./camera_calibration";
import { FarmwareProps } from "../devices/interfaces";

@connect(mapStateToProps)
export class FarmwarePage extends React.Component<FarmwareProps, void> {
  render() {
    return <Page className="farmware">
      <Row>
        <Col xs={12} sm={4}>
          <WeedDetector
            bot={this.props.bot}
            dispatch={this.props.dispatch}
            currentImage={this.props.currentImage}
            images={this.props.images} />
        </Col>
        <Col xs={12} sm={4}>
          <Photos
            dispatch={this.props.dispatch}
            images={this.props.images}
            currentImage={this.props.currentImage} />
        </Col>
        <Col xs={12} sm={4}>
          <CameraCalibration
            currentImage={this.props.currentImage}
            images={this.props.images} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={3}>
          <FarmwarePanel bot={this.props.bot} />
        </Col>
      </Row>
    </Page>;
  }
};
