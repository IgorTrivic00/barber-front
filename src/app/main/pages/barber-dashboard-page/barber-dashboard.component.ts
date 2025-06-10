import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ServiceListComponent} from '../../components/services/service-list.component';
import {filter, Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import { CommonModule } from '@angular/common';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {cloneDeep} from "lodash";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {ServiceModalComponent} from "../../modal/service-modal/service-modal.component";
import {Service} from "../../model/service.model";
import {Barber} from "../../../auth/model/barber.model";
import {selectServices} from "../../store/selectors";
import { v4 as uuidv4 } from 'uuid';
import {addService, clearServiceSearch, deleteService, findMyServices, searchServices, updateService} from "../../store/actions";
import {showMessage} from "../../../shared/store/actions";
import {Severity} from "../../../shared/constants/constants";
import {AuthService} from "../../../auth/service/auth.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";


@Component({
  selector: 'app-barber-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    BarberListComponent,
    Button,
    RouterLink,
    DialogModule,
    ServiceListComponent,
    ServiceModalComponent,
    CommonModule,
],
  templateUrl: './barber-dashboard.component.html',
  styleUrl: './barber-dashboard.component.scss'
})
export class BarberDashboardComponent implements OnInit, OnDestroy {

  services: Service[] | undefined;
  barber: Barber | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private userService: AuthService) {
    this.initSelectors();
    this.userService.getLoggedBarber()?.subscribe(value => this.barber = value);
  }

  ngOnInit(): void {
    this.initDispatch();
  }

  private selectServices() {
    this.store$.select(selectServices)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.services = cloneDeep(value));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearServiceSearch());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
    if (this.barber){
      service = {
        ...service,
        uuid: uuidv4(),
        barber: this.barber
      };
      this.store$.dispatch(addService({ service, callbackFn: this.findMyServices }));
    }
  }

  updateService(service: Service) {
    this.store$.dispatch(updateService({ service, callbackFn: this.findMyServices }));
  }

  deleteService(service: Service) {
    this.store$.dispatch(deleteService({uuid: service.uuid, callbackFn: this.findMyServices }));
  }

  private initSelectors() {
    this.selectServices();
  }

  private initDispatch() {
    this.findMyServices();
  }

  findMyServices = () => {
    this.store$.dispatch(findMyServices());
  }

}
