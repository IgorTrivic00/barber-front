import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectLastUrl} from "../../../shared/store/selectors";
import {CalendarModule} from "primeng/calendar";
import {returnToPreviousPage, showNavBar} from "../../../shared/store/actions";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    CalendarModule,
  ],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.scss'
})
export class AppointmentPageComponent implements OnInit{

  lastUrl: string | undefined;
  minDate: Date;

  constructor(private store$: Store) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.store$.dispatch(showNavBar());
  }

}
