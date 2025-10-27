import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ServiceItemComponent} from "./service-item/service-item.component";
import {Service} from "../../model/service.model";
import {NgIf} from "@angular/common";
import {NoResultComponent} from "../no-result/no-result.component";


@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    ServiceItemComponent,
    NgIf,
    NoResultComponent
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss'
})
export class ServiceListComponent {

  @Input() services!: Service[];

  @Output() deleteEmitter: EventEmitter<Service> = new EventEmitter<Service>();
  @Output() updateEmitter: EventEmitter<Service> = new EventEmitter<Service>();

  updateService(service: Service) {
    this.updateEmitter.emit(service);
  }

  deleteService(service: Service) {
    this.deleteEmitter.emit(service);
  }

}
