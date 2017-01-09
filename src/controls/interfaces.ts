import { BotState } from "../devices/interfaces";
import { Everything } from "../interfaces";

export interface ControlsState {
    isEditingCameraURL: boolean;
}

export interface AxisInputBoxProps {
    bot: BotState;
    axis: string;
    label: string;
    dispatch: Function;
}

export interface DirectionButtonProps extends Everything {
  axis: "x"|"y"|"z";
  direction: "up"|"down"|"left"|"right";
  steps: number;
}

export interface ToggleProps { }

export interface ToggleState {
  /** Function that is executed when the toggle button is clicked */
  toggleAction: () => void;
  toggleval: number | string | undefined;
}

export interface SaveWebcamParams {
  dispatch: Function;
  apiUrl: string;
  webcam_url: string;
  updateState: Function;
}

export interface WebcamSaveBtnProps {
  dispatch: Function;
  webcamUrl: string;
  apiUrl: string;
  updateState: Function;
}
