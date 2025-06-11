import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from "../../../model/slot.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-slot-item',
  standalone: true,
  templateUrl: './slot-item.component.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./slot-item.component.scss']
})
export class SlotItemComponent implements OnInit {

  @Input() slot: Slot | undefined;

  @Output() selectEmitter: EventEmitter<Slot> = new EventEmitter<Slot>();

  dateTimeFormat = 'HH:mm';

  constructor() { }

  ngOnInit(): void {
  }

  selectSlot() {
    this.selectEmitter.emit(this.slot);
  }
}
