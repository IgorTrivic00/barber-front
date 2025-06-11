import {SlotType} from "./enums/slot-type.enum";
import {SlotState} from "./enums/slot-state.enum";

export interface Slot {
  uuid: string;
  slotType: SlotType,
  slotState: SlotState,
  start: Date;
  end: Date;
  barberUuid: string;
  selected?: boolean;
}
