import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {ServiceListComponent} from '../../components/services/service-list.component';
import { CommonModule } from '@angular/common';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {ServiceModalComponent} from "../../modal/service-modal/service-modal.component";
import {Service} from "../../model/service.model";
import {Barber} from "../../../auth/model/barber.model";
import {AuthService} from "../../../auth/service/auth.service";
import {DialogService} from "primeng/dynamicdialog";
import {ServiceService} from "../../services/service.service";
import {MINE_SERVICE_SEARCH_ID} from "../../constants/constants";


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
export class BarberDashboardComponent implements OnInit {

  barber: Barber | undefined;
  serviceService = inject(ServiceService);
  constructor(private dialogService: DialogService,
              private userService: AuthService) {
    this.userService.getLoggedBarber()?.subscribe(value => this.barber = value);
  }

  ngOnInit(): void {
    this.findMineServices();
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
        this.addService(response);
      }
    });
  }

  addService(response: {service: Service, file: any}) {
    if (this.barber){
      const service = {
        ...response.service,
        barber: this.barber
      };
      this.serviceService.add(service, response.file, this.findMineServices);
    }
  }

  updateService(service: Service) {
    this.serviceService.update(service, this.findMineServices);
  }

  deleteService(service: Service) {
    this.serviceService.delete(service.uuid, this.findMineServices);
  }

  findMineServices = () => {
    this.serviceService.findMine();
  }

  protected readonly MINE_SERVICE_SEARCH_ID = MINE_SERVICE_SEARCH_ID;
}
