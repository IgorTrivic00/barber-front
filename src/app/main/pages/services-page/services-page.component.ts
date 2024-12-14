import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Button} from "primeng/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ServiceListComponent} from "../../components/services/service-list.component";
import {Service} from "../../model/service.model";
import {addService, getBarber, getBarberServices} from "../../store/actions";
import {select, Store} from "@ngrx/store";
import {selectBarber, selectBarberServices} from "../../store/selectors";
import {filter, Subject, takeUntil} from "rxjs";
import {cloneDeep} from "lodash";
import {hideNavBar, returnToPreviousPage, showNavBar} from "../../../shared/store/actions";
import {ServiceModalComponent} from "../../modal/service-modal/service-modal.component";
import {v4 as uuidv4} from "uuid";
import {DialogService} from "primeng/dynamicdialog";
import {Barber} from "../../../auth/model/barber.model";


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
  barber: Barber | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private dialogService: DialogService,
              private route: ActivatedRoute) {
    this.selectBarberService();
    this.selectBarber();
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
    this.store$.dispatch(getBarber({barberUuid: this.barberUuid!}));
  }

  return() {
    this.store$.dispatch(returnToPreviousPage());
  }

  onAddService() {
    this.dialogService.open(ServiceModalComponent, {
      header: 'Dodaj uslugu',
      width: '85%',
      height: 'auto',
      contentStyle: {
        overflow: 'auto'
      },
      baseZIndex: 10000
    }).onClose.subscribe(response => {
      if(response){
        if(!response.uuid){
          this.addService(response);
        }
      }
    });
  }

  addService(service: Service) {
    if(this.barber){
      service = {
        ...service,
        uuid: uuidv4(),
        barber: this.barber
      };
      this.store$.dispatch(addService({ service }));
    }
  }

  private selectBarber() {
    this.store$.select(selectBarber)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.barber = value);
  }
}


