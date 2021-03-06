import { BotStateTree } from "farmbot";
import {
  ALLOWED_MESSAGE_TYPES,
  McuParamName,
  ConfigurationName
} from "farmbot";
import { AuthState } from "../auth/interfaces";
import {
  TaggedImage,
  TaggedPeripheral,
  TaggedDevice
} from "../resources/tagged_resources";
import { RestResources } from "../resources/interfaces";

export interface Props {
  auth: AuthState | undefined;
  bot: BotState;
  deviceAccount: TaggedDevice;
  images: TaggedImage[];
  dispatch: Function;
}

/** How the device is stored in the API side.
 * This is what comes back from the API as JSON.
 */
export interface DeviceAccountSettings {
  id: number;
  name: string;
  webcam_url?: string;
};

/** Meta information about a log message. */
interface Meta {
  type: ALLOWED_MESSAGE_TYPES;
  /** Bot Position X */
  x: number | undefined;
  /** Bot Position Y */
  y: number | undefined;
  /** Bot Position Z */
  z: number | undefined;
}

export interface BotState {
  /** How many steps to move when the user presses a manual movement arrow */
  stepSize: number;
  /** The current os version on the github release api */
  currentOSVersion?: string;
  /** The current fw version on the github release api */
  currentFWVersion?: string;
  /** Is the bot in sync with the api */
  dirty: boolean;
  /** The state of the bot, as reported by the bot over MQTT. */
  hardware: HardwareState;
  /** Hardware settings auto update on blur. Tells the UI if it should load a
   * spinner or not. */
  isUpdating?: boolean;
  controlPanelClosed: boolean;
}

export interface BotProp {
  bot: BotState;
}

/** Status registers for the bot's status */
export type HardwareState = BotStateTree;

export interface GithubRelease {
  tag_name: string;
}

export interface MoveRelProps {
  x: number;
  y: number;
  z: number;
  speed?: number | undefined;
}

export type Xyz = "x" | "y" | "z";
export type Axis = Xyz | "all";

export interface CalibrationButtonProps {
  disabled: boolean;
  axis: Axis;
}

export interface FarmbotOsProps {
  bot: BotState;
  account: TaggedDevice;
  auth: AuthState;
  dispatch: Function;
}

export interface FarmbotOsState {
  cameraStatus: "" | "sending" | "done" | "error";
}

export interface StepsPerMMBoxProps {
  bot: BotState;
  setting: ConfigurationName;
  dispatch: Function;
}

export interface McuInputBoxProps {
  bot: BotState;
  setting: McuParamName;
  dispatch: Function;
  name?: string;
}

export interface EStopButtonProps {
  bot: BotState;
  auth: AuthState | undefined;
}

export interface PeripheralsProps {
  resources: RestResources;
  bot: BotState;
  peripherals: TaggedPeripheral[];
  dispatch: Function;
}

export interface FarmwareProps {
  bot: BotState;
  dispatch: Function;
  images: TaggedImage[];
  currentImage: TaggedImage | undefined;
}

export interface HardwareSettingsProps {
  controlPanelClosed: boolean;
  dispatch: Function;
  bot: BotState;
}
