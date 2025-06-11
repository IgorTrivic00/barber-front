import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from "../../model/slot.model";

@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.scss']
})
export class SlotListComponent implements OnInit {

  @Input() slots: Slot[] | undefined;

  @Output() selectEmitter: EventEmitter<Slot> = new EventEmitter<Slot>();

  constructor() { }

  ngOnInit(): void {
  }

  selectSlot(slot: Slot) {
    this.selectEmitter.emit(slot);
  }

}
