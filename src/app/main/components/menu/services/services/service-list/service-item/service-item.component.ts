import { Component, Input } from '@angular/core';
import { Service } from "../../../../../../model/service.model";
import { PrimengModule } from "../../../../../../../shared/primeng.module";
import { DecimalPipe } from "@angular/common";
import { User } from '../../../../../../../auth/model/user.model';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from "rxjs";
import { cloneDeep } from "lodash";
import { UserRole } from '../../../../../../../auth/model/user-role.model';
import { deleteService } from '../../../../../../store/actions';
import { selectLoggedUser } from '../../../../../../../auth/store/selectors';
import { ConfirmationModalComponent } from "../../../../../../../shared/confirmation-modal/confirmation-modal.component";

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [
    PrimengModule,
    ConfirmationModalComponent
],
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
  providers: [DecimalPipe]
})
export class ServiceItemComponent {

  @Input() service: Service | undefined;
  
  user: User | undefined;
  confirmationModalVisible = false; 
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private decimalPipe: DecimalPipe, private store$: Store) {
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

  protected readonly UserRole = UserRole;
}
