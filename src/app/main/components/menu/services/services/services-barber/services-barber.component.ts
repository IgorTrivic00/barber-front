import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from '../../barber-list/barber-list.component';
import {Button} from "primeng/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ServiceListComponent} from '../service-list/service-list.component';
import {Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import {addService, getBarberServices} from '../../../../../store/actions';
import {cloneDeep} from "lodash";
import {Service} from '../../../../../model/service.model';
import {selectBarberServices} from '../../../../../store/selectors';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {MainApiService} from '../../../../../api/main-api.service';
import {showMessage} from "../../../../../../shared/store/actions";
import {Severity} from "../../../../../../shared/constants/constants";
import { v4 as uuidv4 } from 'uuid';
import {selectBarber} from "../../../../../../auth/store/selectors";
import {Barber} from "../../../../../../auth/model/barber.model";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    FormsModule,
    BarberListComponent,
    Button,
    RouterLink,
    ServiceListComponent,
    DialogModule
  ],
  templateUrl: './services-barber.component.html',
  styleUrl: './services-barber.component.scss'
})
export class ServicesBarberComponent implements OnInit, OnDestroy {


  services: Service[] | undefined;
  barberUuid: string | undefined;
  visible: boolean = false;
  barber: Barber | undefined;
  newService: Service = {serviceName: '', price: 0, duration: 0};

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private route: ActivatedRoute, private mainApiService: MainApiService) {
    this.initSelectors();
    this.barberUuid = this.route.snapshot.params['barberUuid'];
  }

  ngOnInit(): void {
    this.initDispatch();
  }

  private selectBarberService() {
    this.store$.pipe(select(selectBarberServices), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (value) {
        this.services = cloneDeep(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAddService() {
    this.visible = true;
  }

  addService() {
    if (
      this.newService.serviceName &&
      this.newService.price !== undefined && this.newService.price > 0 &&
      this.newService.duration !== undefined && this.newService.duration > 0
    ) {
      this.newService.uuid = uuidv4();
      this.newService.barber = this.barber;
      this.store$.dispatch(addService({service: this.newService}));
      this.visible = true;
    } else {
      this.store$.dispatch(showMessage({severity: Severity.ERROR, detail: 'Greska!'}));
    }
  }

  private initSelectors() {
    this.selectBarberService();
    this.selectBarber();
  }

  private initDispatch() {
    this.getBarberServices();
  }

  private getBarberServices() {
    this.store$.dispatch(getBarberServices({barberUuid: this.barberUuid!}));
  }

  private selectBarber() {
    this.store$.pipe(select(selectBarber), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (value) {
        this.barber = cloneDeep(value);
      }
    })
  }
}
