import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from "../../model/appointment.model";
import {AppointmentItemComponent} from "./appointment-item/appointment-item.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    AppointmentItemComponent,
    NgIf
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  @Input() appointments!: Appointment[];

  @Output() cancelEmitter: EventEmitter<Appointment> = new EventEmitter<Appointment>();

  constructor() { }

  ngOnInit(): void {
  }

  cancelAppointment(appointment: Appointment) {
    this.cancelEmitter.emit(appointment);
  }

}
