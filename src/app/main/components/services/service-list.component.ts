import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ServiceItemComponent} from "./service-item/service-item.component";
import {Service} from "../../model/service.model";


@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    ServiceItemComponent
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {

  @Input() services: Service[] | undefined;

  @Output() deleteEmitter: EventEmitter<Service> = new EventEmitter<Service>();
  @Output() updateEmitter: EventEmitter<Service> = new EventEmitter<Service>();

  updateService(service: Service) {
    this.updateEmitter.emit(service);
  }

  deleteService(service: Service) {
    this.deleteEmitter.emit(service);
  }

}
