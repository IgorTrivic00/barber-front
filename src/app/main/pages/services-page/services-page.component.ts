import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Button} from "primeng/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ServiceListComponent} from "../../components/services/service-list.component";
import {Service} from "../../model/service.model";
import {getBarberServices} from "../../store/actions";
import {select, Store} from "@ngrx/store";
import {selectBarberServices} from "../../store/selectors";
import {Subject, takeUntil} from "rxjs";
import {cloneDeep} from "lodash";
import {hideNavBar, returnToPreviousPage, showNavBar} from "../../../shared/store/actions";


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    BarberListComponent,
    Button,
    RouterLink,
    ServiceListComponent
  ],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent implements OnInit, OnDestroy{

  services: Service[] | undefined;
  barberUuid: string | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private route: ActivatedRoute) {
    this.selectBarberService();
    this.barberUuid = this.route.snapshot.params['barberUuid'];
  }

  ngOnInit(): void {
    this.initDispatch();
  }

  private selectBarberService() {
    this.store$.pipe(select(selectBarberServices), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if(value){
        this.services = cloneDeep(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initDispatch() {
    this.store$.dispatch(hideNavBar());
    this.store$.dispatch(getBarberServices({barberUuid: this.barberUuid!}));
  }

  return() {
    this.store$.dispatch(returnToPreviousPage());
  }
}


