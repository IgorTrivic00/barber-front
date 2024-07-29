import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "../barber-list/barber-list.component";
import {Button} from "primeng/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ServiceListComponent} from "./service-list/service-list.component";
import {Barber} from "../../../../../auth/model/barber.model";
import {Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import {getBarbers, getBarberServices, getBarbersSuccess} from "../../../../store/actions";
import {cloneDeep} from "lodash";
import {Service} from "../../../../model/service.model";
import {selectBarberServices} from "../../../../store/selectors";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    BarberListComponent,
    Button,
    RouterLink,
    ServiceListComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, OnDestroy{

  services: Service[] | undefined;
  barberUuid: string | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private route: ActivatedRoute) {
    this.selectBarberService();
    this.barberUuid = this.route.snapshot.params['barberUuid'];
  }

  ngOnInit(): void {
    this.store$.dispatch(getBarberServices({barberUuid: this.barberUuid!}));
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

}
