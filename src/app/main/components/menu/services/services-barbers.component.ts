import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "./barber-list/barber-list.component";
import {Barber} from "../../../../auth/model/barber.model";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectBarbers} from "../../../store/selectors";
import {cloneDeep} from "lodash";
import {getBarbers} from "../../../store/actions";
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";
import {AppModule} from "../../../../app.module";

@Component({
  selector: 'app-services-barbers',
  standalone: true,
  imports: [
    BarberListComponent
  ],
  templateUrl: './services-barbers.component.html',
  styleUrl: './services-barbers.component.scss'
})
export class ServicesBarbersComponent implements OnInit, OnDestroy{

  barbers: Barber[] | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private router: Router) {
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

  redirectToServices(barber: Barber){
    this.router.navigate(['services', barber.uuid]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
