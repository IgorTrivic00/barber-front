import {Component, EventEmitter, Input, Output} from "@angular/core";
import {PrimengModule} from "../../../../shared/primeng.module";
import {AppSharedModule} from "../../../../shared/app-shared.module";
import {ServiceModalComponent} from "../../../modal/service-modal/service-modal.component";
import {DecimalPipe} from "@angular/common";
import {Service} from "../../../model/service.model";
import {User} from "../../../../auth/model/user.model";
import {Store} from "@ngrx/store";
import {AuthService} from "../../../../auth/service/auth.service";
import {deleteService, updateService} from "../../../store/actions";
import {UserRole} from "../../../../auth/model/user-role.model";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
  styleUrls: ['./service-item.component.scss']
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
              private store$: Store) {
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

  // @ts-ignore
  getDuration(duration: number | undefined) {
    if (!duration){
      return;
    }
    if(duration > 3600) {
      let hour = duration / 3600;
      let minutes = duration % 60;
      if(hour && !minutes){
        return Math.round(hour) + " sat/a"
      }
      else if(hour && minutes) {
        return Math.round(hour) + " sat/a i " + Math.round(minutes) + " minuta"
      }
    }else {
      return Math.round(duration / 60) + " minuta";
    }
  }
}


