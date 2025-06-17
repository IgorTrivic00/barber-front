import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "../../../model/appointment.model";
import {AvatarModule} from "primeng/avatar";
import {CardModule} from "primeng/card";
import {animate, style, transition, trigger} from "@angular/animations";
import {DataService} from "../../../services/data.service";
import {DatePipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatRadioButton} from "@angular/material/radio";
import {AuthService} from "../../../../auth/service/auth.service";
import {User} from "../../../../auth/model/user.model";
import { UserRole } from '../../../../auth/model/user-role.model';
import {Button} from "primeng/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-appointment-item',
  standalone: true,
  templateUrl: './appointment-item.component.html',
  imports: [
    AvatarModule,
    CardModule,
    TitleCasePipe,
    NgClass,
    DatePipe,
    MatButton,
    MatRadioButton,
    NgIf,
    Button,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
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

  loggedUser!: User;
  dateTimeFormat = 'HH:mm';

  constructor(private dataService: DataService,
              private authService: AuthService,
              private router: Router) {
    this.authService.getLoggedUser()?.subscribe(value => this.loggedUser = value);
  }

  ngOnInit(): void {
  }

  getDuration(duration: number | undefined) {
    return this.dataService.getDuration(duration);
  }

  viewAppointment() {
    this.router.navigate(['appointment', this.appointment.uuid]);
  }
}
