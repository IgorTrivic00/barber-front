import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "../../../model/appointment.model";
import {AvatarModule} from "primeng/avatar";
import {CardModule} from "primeng/card";
import {animate, style, transition, trigger} from "@angular/animations";
import {DataService} from "../../../services/data.service";
import {DatePipe, NgClass, TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-item',
  standalone: true,
  templateUrl: './appointment-item.component.html',
  imports: [
    AvatarModule,
    CardModule,
    TitleCasePipe,
    NgClass,
    DatePipe
  ],
  styleUrls: ['./appointment-item.component.scss'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class AppointmentItemComponent implements OnInit {

  @Input() appointment!: Appointment;

  dateTimeFormat = 'HH:mm';

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getDuration(duration: number | undefined) {
    return this.dataService.getDuration(duration);
  }

  onAppointmentClick() {
    this.router.navigate(['appointment', this.appointment.uuid]);
  }
}
