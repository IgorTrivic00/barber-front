import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "../../model/appointment.model";
import {AppointmentItemComponent} from "./appointment-item/appointment-item.component";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [AppointmentItemComponent],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  @Input() appointments!: Appointment[];

  constructor() { }

  ngOnInit(): void {
  }

}
