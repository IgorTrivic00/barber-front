import {SlotState} from "./enums/slot-state.enum";

export interface SlotFilter {
  barberUuids?: string[];
  states?: SlotState[];
  from?: string;
  to?: string;
}
