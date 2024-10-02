import {Component, OnDestroy} from '@angular/core';
import {Button} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectLastUrl} from "../../../../shared/store/selectors";
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    CalendarModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent implements OnDestroy{

  lastUrl: string | undefined;
  minDate: Date;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private router: Router) {
    this.minDate = new Date();
    this.initSelectors();
  }

  return() {
    this.router.navigate([this.lastUrl]);
  }

  private initSelectors() {
    this.selectLastUrl();
  }

  private selectLastUrl() {
    this.store$.pipe(select(selectLastUrl), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if(value){
        this.lastUrl = value;
      }
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
