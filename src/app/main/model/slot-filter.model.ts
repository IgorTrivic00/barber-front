import {SlotState} from "./slot-state.enum";

export interface SlotFilter {
  barberUuids?: string[];
  states?: SlotState[];
  from?: string;
  to?: string;
}
