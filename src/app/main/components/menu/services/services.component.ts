import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "./barber-list/barber-list.component";
import {Barber} from "../../../model/barber.model";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectBarbers} from "../../../store/selectors";
import {cloneDeep} from "lodash";
import {getBarbers} from "../../../store/actions";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    BarberListComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, OnDestroy{

  barbers: Barber[] | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store) {
    this.selectBarbers();
  }

  ngOnInit(): void {
    this.store$.dispatch(getBarbers());
  }

  private selectBarbers() {
    this.store$.pipe(select(selectBarbers), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if(value){
        this.barbers = cloneDeep(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
