import {Component, EventEmitter, Input, Output} from "@angular/core";
import {PrimengModule} from "../../../../shared/primeng.module";
import {AppSharedModule} from "../../../../shared/app-shared.module";
import {ServiceModalComponent} from "../../../modal/service-modal/service-modal.component";
import {DecimalPipe} from "@angular/common";
import {Service} from "../../../model/service.model";
import {User} from "../../../../auth/model/user.model";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../../auth/service/auth.service";
import {UserRole} from "../../../../auth/model/user-role.model";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {Router} from "@angular/router";
import {selectService} from "../../../store/actions";
import {DataService} from "../../../services/data.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [
    PrimengModule,
    AppSharedModule,
    ServiceModalComponent,
    ConfirmDialogModule
  ],
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ServiceItemComponent {

  @Input() service: Service | undefined;

  @Output() deleteEmitter: EventEmitter<Service> = new EventEmitter<Service>();
  @Output() updateEmitter: EventEmitter<Service> = new EventEmitter<Service>();

  user: User | undefined;

  constructor(private decimalPipe: DecimalPipe,
              private userService: AuthService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService,
              private store$: Store,
              private dataService: DataService,
              private router: Router) {
    this.userService.getLoggedUser()?.subscribe(value => this.user = value);
  }

  getPrice(price: number | undefined) {
    if (Number.isFinite(price)) {
      return this.decimalPipe.transform(price!.toFixed(2), '1.2-2');
    } else {
      return price;
    }
  }

  deleteService() {
    this.deleteEmitter.emit(this.service);
  }

  onEditService() {
    this.dialogService.open(ServiceModalComponent, {
      header: 'Izmeni uslugu',
      width: '85%',
      height: 'auto',
      data: {
        service: this.service
      },
      contentStyle: {
        overflow: 'auto'
      },
      baseZIndex: 10000
    }).onClose.subscribe(response => {
      if(response){
        this.updateService(response);
      }
    });
  }

  updateService(updatedService: Service) {
    const service = {
      ...this.service,
      ...updatedService
    };
    this.updateEmitter.emit(service);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Da li ste sigurni da želite da nastavite?',
      header: 'Potvrda',
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Ne',
      rejectButtonStyleClass: 'secondary',
      acceptLabel: 'Da',
      accept: () => {
        this.deleteService();
      }
    });
  }

  protected readonly UserRole = UserRole;

  navigate(route: string) {
    this.store$.dispatch(selectService({service: this.service!}));
    this.router.navigate([route]);
  }

  getDuration(duration: number | undefined) {
    return this.dataService.getDuration(duration);
  }
}


