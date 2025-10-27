import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from "../../model/appointment.model";
import {AppointmentItemComponent} from "./appointment-item/appointment-item.component";
import {NgIf} from "@angular/common";
import {NoResultComponent} from "../no-result/no-result.component";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    AppointmentItemComponent,
    NgIf,
    NoResultComponent
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  @Input() appointments!: Appointment[];

  @Output() cancelEmitter: EventEmitter<Appointment> = new EventEmitter<Appointment>();
  @Output() completeEmitter: EventEmitter<Appointment> = new EventEmitter<Appointment>();

  constructor() { }

  ngOnInit(): void {
  }

  cancelAppointment(appointment: Appointment) {
    this.cancelEmitter.emit(appointment);
  }

  completeAppointment(appointment: Appointment) {
    this.completeEmitter.emit(appointment);
  }

}
