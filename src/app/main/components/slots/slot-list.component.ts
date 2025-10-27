import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from "../../model/slot.model";
import {SlotItemComponent} from "./slot-item/slot-item.component";
import {CommonModule} from "@angular/common";
import {NoResultComponent} from "../no-result/no-result.component";

@Component({
  selector: 'app-slot-list',
  templateUrl: './slot-list.component.html',
  standalone: true,
  imports: [
    SlotItemComponent,
    CommonModule,
    NoResultComponent
  ],
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
