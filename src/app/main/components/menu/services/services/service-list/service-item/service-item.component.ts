import { Component, Input } from '@angular/core';
import { Service } from "../../../../../../model/service.model";
import { PrimengModule } from "../../../../../../../shared/primeng.module";
import { DecimalPipe } from "@angular/common";
import { User } from '../../../../../../../auth/model/user.model';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from "rxjs";
import { cloneDeep } from "lodash";
import { UserRole } from '../../../../../../../auth/model/user-role.model';
import { deleteService, updateService } from '../../../../../../store/actions';
import { selectLoggedUser } from '../../../../../../../auth/store/selectors';
import { ConfirmationModalComponent } from "../../../../../../../shared/modals/confirmation-modal/confirmation-modal.component";
import { AppSharedModule } from '../../../../../../../shared/app-shared.module';
import { ServiceModalComponent } from '../../../../../../../shared/modals/service-modal/service-modal.component';
import { v4 as uuidv4 } from 'uuid';
import { MainApiService } from '../../../../../../api/main-api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [
    PrimengModule,
    ConfirmationModalComponent,
    AppSharedModule,
    ServiceModalComponent
    

],
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
  providers: [DecimalPipe]
})
export class ServiceItemComponent {

  @Input() service: Service | undefined;
  
  user: User | undefined;
  confirmationModalVisible = false; 
  editModalVisible = false;  
  serviceToEdit: Service | undefined;  
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private decimalPipe: DecimalPipe, private store$: Store,private route: ActivatedRoute,private mainApiService: MainApiService) {
    this.selectLoggedUser();
  }

  getDuration(duration: number | undefined) {
    return (duration! / 60).toString();
  }

  getPrice(price: number | undefined) {
    if (Number.isFinite(price)) {
      return this.decimalPipe.transform(price!.toFixed(2), '1.2-2');
    } else {
      return price;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private selectLoggedUser() {
    this.store$.pipe(select(selectLoggedUser), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (value) {
        this.user = cloneDeep(value);
      }
    });
  }

  deleteService(service: Service | undefined) {
    if (service && service.uuid) {
      this.store$.dispatch(deleteService({ serviceUuid: service.uuid }));
      this.confirmationModalVisible = false; 
    } else {
      console.error('Service UUID is undefined!');
    }
  }

  onEditService(service: Service | undefined) {
    if (!service || !service.uuid) {
      console.log('Service is undefined or missing UUID');
      return;
    }
  
    this.serviceToEdit = { ...service };  
    console.log(this.serviceToEdit);
    
    this.editModalVisible = true; 
  }
  
  updateService(updatedService: Service) {
  
  
   
    if (!updatedService || !updatedService.serviceName || !updatedService.price || !updatedService.duration) {
      console.error('Service data is invalid! Missing required fields.');
      return;
    }
  console.log(this.serviceToEdit)
   //updatedService.uuid=this.serviceToEdit?.uuid;
    const finalService = {
      ...this.serviceToEdit,
      serviceName: updatedService.serviceName,
      price: updatedService.price,
      duration: updatedService.duration
    };
  
    console.log('Ažurirani podaci za slanje:', finalService);
  

    this.store$.dispatch(updateService({ service: finalService }));
  
  
    this.editModalVisible = false;
  }





  protected readonly UserRole = UserRole;
}


