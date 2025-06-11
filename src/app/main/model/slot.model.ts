import {SlotType} from "./slot-type.enum";
import {SlotState} from "./slot-state.enum";

export interface Slot {
  uuid: string;
  slotType: SlotType,
  slotState: SlotState,
  start: Date;
  end: Date;
  barberUuid: string;
  selected?: boolean;
}
