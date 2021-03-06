import * as React from "react";
import { GardenPlantProps, GardenPlantState } from "../interfaces";
import { cachedIcon, DEFAULT_ICON } from "../../open_farm/index";
import { Circle } from "./circle";
import { round } from "./util";

export class GardenPlant extends
  React.Component<GardenPlantProps, Partial<GardenPlantState>> {

  state: GardenPlantState = { icon: DEFAULT_ICON }

  componentDidMount() {
    let OFS = this.props.plant.body.openfarm_slug;
    cachedIcon(OFS).then((icon: string) => this.setState({ icon }));
  }

  render() {
    let { selected, plant, onClick, dispatch } = this.props;
    let { radius, x, y } = plant.body;
    let action = { type: "TOGGLE_HOVERED_PLANT", payload: plant };

    return <g>
      <Circle
        className={"plant-indicator"}
        x={round(x)}
        y={round(y)}
        r={radius}
        selected={selected}
      />

      <image
        className={"plant-image is-chosen-" + selected}
        href={this.state.icon}
        onClick={() => onClick(this.props.plant)}
        onMouseEnter={() => dispatch(action)}
        onMouseLeave={() => dispatch(action)}
        height={radius * 2}
        width={radius * 2}
        x={round(x) - radius}
        y={round(y) - radius} />
    </g>
  }
}
