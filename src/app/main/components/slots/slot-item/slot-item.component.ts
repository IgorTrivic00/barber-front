import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from "../../../model/slot.model";
import {DatePipe} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-slot-item',
  standalone: true,
  templateUrl: './slot-item.component.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./slot-item.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
  ]
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
