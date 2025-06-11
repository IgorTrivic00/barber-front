import { Component } from '@angular/core';
import {Appointment} from "../../model/appointment.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Button, ButtonDirective} from "primeng/button";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-confirm-appointment-modal',
  standalone: true,
  imports: [
    ButtonDirective,
    DatePipe,
    Button
  ],
  templateUrl: './confirm-appointment-modal.component.html',
  styleUrl: './confirm-appointment-modal.component.scss'
})
export class ConfirmAppointmentModalComponent {

  appointment: Appointment | undefined;
  dateFormat = "HH:mm"

  constructor(private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) {
    if(this.config.data?.appointment){
      this.appointment = this.config.data.appointment;
    }
    console.log(this.appointment)
  }

  cancel() {
    this.ref.close(false);
  }

  confirm() {
    this.ref.close(true);
  }
}
