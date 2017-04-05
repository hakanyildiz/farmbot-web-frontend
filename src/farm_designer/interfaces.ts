import { OpenFarm } from "./openfarm";
import { DropDownItem } from "../ui/index";
import { CowardlyDictionary } from "../util";
import {
  TaggedFarmEvent,
  TaggedSequence,
  TaggedRegimen,
  TaggedPoint,
  TaggedPlant
} from "../resources/tagged_resources";

export interface Props {
  dispatch: Function;
  designer: DesignerState;
  points: TaggedPoint[];
  plants: TaggedPlant[];
}

export interface UpdateSequenceOrRegimenProps {
  label: string;
  value: number;
  kind: string;
  farm_event_id: number;
}

export type TimeUnit =
  | "never"
  | "minutely"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly";

export interface FarmEvent {
  id?: number | undefined;
  start_time: string;
  end_time?: string | undefined;
  repeat?: number | undefined;
  time_unit: TimeUnit;
  next_time: string;
  executable_id: number;
  executable_type: "Sequence" | "Regimen";
  readonly calendar?: string[] | undefined;
};

export interface MovePlantProps {
  deltaX: number;
  deltaY: number;
  plant: TaggedPlant;
}

/** OFCrop bundled with corresponding profile image from OpenFarm API. */
export interface CropLiveSearchResult {
  crop: OpenFarm.OFCrop;
  image: string;
}

export interface Plant {
  id?: number;
  dirty?: boolean | undefined;
  planted_at: string;
  // img_url: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  spread?: number | undefined;
  planting_area_id: string;
  // icon_url: string; // ? Maybe this will change.
  openfarm_slug: string; // ? Maybe this will change.
}

export interface Crop {
  id?: undefined; // ?
  name: string;
  guides_count: number;
  processing_pictures: number;
  description?: string | undefined;
  growing_degree_days?: number | undefined;
  height?: number | undefined;
  common_names?: string[] | undefined;
  main_image_path?: string | undefined;
  row_spacing?: string | undefined;
  slug?: string | undefined;
  sowing_method?: string | undefined;
  spread?: string | undefined;
  sun_requirements?: string | undefined;
  svg_icon?: string | undefined;
  tags_array?: string | undefined;
  taxon?: string | undefined;
}

export interface DesignerState {
  x_size: number;
  y_size: number;
  cropSearchQuery: string;
  cropSearchResults: CropLiveSearchResult[];
}

export interface Point {
  id: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  created_at: string;
  meta: { [key: string]: (string | undefined) };
}

export interface AddEditFarmEventProps {
  selectOptions: DropDownItem[];
  repeatOptions: DropDownItem[];
  farmEvents: TaggedFarmEvent[];
  regimensById: CowardlyDictionary<TaggedRegimen>;
  sequencesById: CowardlyDictionary<TaggedSequence>;
  farmEventsById: CowardlyDictionary<TaggedFarmEvent>;
  getFarmEvent(): TaggedFarmEvent | undefined;
  formatDate(input: string): string;
  formatTime(input: string): string;
  handleTime(e: React.SyntheticEvent<HTMLInputElement>, currentISO: string): string;
  dispatch: Function;
}

/** One CalendarDay has many CalendarOccurrences. For instance, a FarmEvent
 * that executes every 8 hours will create 3 CalendarOccurrences in a single
 * CalendarDay */
export interface CalendarOccurrence {
  sortKey: number;
  timeStr: string;
  executableName: string;
  executableId: number;
  id: number;
}

/** A group of FarmEvents for a particular day on the calendar. */
export interface CalendarDay {
  /** Unix timestamp. Used as a unique key in JSX and for sorting. */
  sortKey: string;
  month: string;
  day: number;
  /** Every event that will execute on that day. */
  items: CalendarOccurrence[];
}

export interface FarmEventProps {
  /** Sorted list of the first (100?) events due on the calendar. */
  calendarRows: CalendarDay[];
  /** Call this function to navigate to different pages. */
  push: (url: string) => void;
}

export interface GardenMapProps {
  dispatch: Function;
  designer: DesignerState;
  points: TaggedPoint[];
  plants: TaggedPlant[];
}

export interface GardenMapState {
  activePlant: Plant | undefined;
  tempX: number | undefined;
  tempY: number | undefined;
}

export interface GardenPlantProps {
  plant: TaggedPlant;
  onUpdate: (deltaX: number, deltaY: number, idx: number) => void;
  onDrop: (uuid: string) => void;
}

export interface GardenPointProps {
  point: TaggedPoint;
}

export type PlantOptions = Partial<Plant>;

export interface SpeciesInfoProps {
  cropSearchResults: CropLiveSearchResult[];
}

export interface PlantData {
  name: string;
  x: number;
  y: number;
  planted_at: string;
  uuid: string;
  id?: number;
}

export interface EditPlantInfoProps {
  push(url: string): void;
  dispatch: Function;
  findPlant(stringyID: string | undefined): TaggedPlant | undefined;
}

export interface DNDSpeciesMobileState {
  isDragging: boolean;
}

export interface DraggableEvent {
  currentTarget: HTMLImageElement;
  dataTransfer: { setDragImage: Function; };
}

export interface DraggableSvgImageState {
  isDragging: boolean;
  transX: number;
  transY: number;
}

export interface DraggableSvgImageProps {
  plant: TaggedPlant;
  id: number;
  height: number;
  width: number;
  onUpdate: (deltaX: number, deltaY: number, idx: number) => void;
  onDrop: (uuid: string) => void;
  x: number;
  y: number;
  href: string;
}

export interface OFSearchProps {
  dispatch: Function;
  cropSearchResults: CropLiveSearchResult[];
  query: string;
}

export interface OFSearchState {
  results: CropLiveSearchResult[];
}

