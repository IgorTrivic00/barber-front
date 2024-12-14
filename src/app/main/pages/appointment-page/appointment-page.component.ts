import {Component, OnDestroy} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectLastUrl} from "../../../shared/store/selectors";
import {CalendarModule} from "primeng/calendar";
import {returnToPreviousPage} from "../../../shared/store/actions";

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
export class AppointmentPageComponent {

  lastUrl: string | undefined;
  minDate: Date;

  constructor(private store$: Store) {
    this.minDate = new Date();
  }

  return() {
    this.store$.dispatch(returnToPreviousPage());
  }

}
