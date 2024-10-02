import {Component, OnDestroy, OnInit} from '@angular/core';
import { BarberListComponent } from '../../barber-list/barber-list.component';
import {Button} from "primeng/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { ServiceListComponent } from '../service-list/service-list.component';
import { Barber } from '../../../../../../auth/model/barber.model';
import {Observable, Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import { getBarbers,getBarberServices, getBarbersSuccess } from '../../../../../store/actions';
import {cloneDeep} from "lodash";
import { Service } from '../../../../../model/service.model';
import { selectBarberServices } from '../../../../../store/selectors'; 
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MainApiService } from '../../../../../api/main-api.service';

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
export class ServicesBarberComponent implements OnInit, OnDestroy{


services: Service[] | undefined;
//services: Service[] = [];
barberUuid: string | undefined;
visible: boolean = false; // Kontrola vidljivosti dijaloga
newService: Service = { serviceName: '', price: 0 , duration: 0} ;
private ngUnsubscribe: Subject<void> = new Subject<void>();

constructor(private store$: Store,
            private route: ActivatedRoute,private mainApiService:MainApiService) {
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



onAddService() {
  this.visible = true; 
}

addService() {
  if (
    this.newService.serviceName && 
    this.newService.price !== undefined && this.newService.price > 0 &&
    this.newService.duration !== undefined && this.newService.duration > 0
  ) {
   
    this.mainApiService.addService(this.newService).subscribe({
      next: (savedService) => {
    
        this.services?.push(cloneDeep(savedService));
        
       
        this.newService = { serviceName: '', price: 0, duration: 0 };
        this.visible = false;
      },
      error: (error) => {
      
        alert('Došlo je do greške prilikom čuvanja servisa!');
        console.error('Greška:', error);
      }
    });
  } else {
    alert('Molimo unesite ispravan naziv, cenu i trajanje servisa!');
  }
}



}
