import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from "../../../model/slot.model";

@Component({
  selector: 'app-slot-item',
  templateUrl: './slot-item.component.html',
  styleUrls: ['./slot-item.component.scss']
})
export class SlotItemComponent implements OnInit {

  @Input() slot: Slot | undefined;

  @Output() selectEmitter: EventEmitter<Slot> = new EventEmitter<Slot>();

  dateTimeFormat = 'hh:mm';

  constructor() { }

  ngOnInit(): void {
  }

  selectSlot() {
    this.selectEmitter.emit(this.slot);
  }
}
