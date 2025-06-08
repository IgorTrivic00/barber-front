import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Button} from "primeng/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ServiceListComponent} from "../../components/services/service-list.component";
import {Service} from "../../model/service.model";
import {Store} from "@ngrx/store";
import {selectServices} from "../../store/selectors";
import {filter, Subject, takeUntil} from "rxjs";
import {cloneDeep} from "lodash";
import {hideNavBar} from "../../../shared/store/actions";
import {DialogService} from "primeng/dynamicdialog";
import {AuthService} from "../../../auth/service/auth.service";
import {NgIf} from "@angular/common";
import {clearServiceSearch, searchServices} from "../../store/actions";


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    BarberListComponent,
    Button,
    RouterLink,
    ServiceListComponent,
    NgIf
  ],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent implements OnInit, OnDestroy{

  services: Service[] | undefined;
  barberUuid: string | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private dialogService: DialogService,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute) {
    this.selectBarberService();
    this.barberUuid = this.route.snapshot.params['barberUuid'];
  }

  ngOnInit(): void {
    this.initDispatch();
  }

  private selectBarberService() {
    this.store$.select(selectServices)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.services = cloneDeep(value));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearServiceSearch());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initDispatch() {
    this.store$.dispatch(hideNavBar());
    this.store$.dispatch(searchServices({filter: {barberUuids: [this.barberUuid!]}}));
  }

  return() {
    this.router.navigate(['barbers']);
  }
}


