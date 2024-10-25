import {Component, Input} from '@angular/core';
import {Service} from "../../../../../model/service.model";
import {ServiceItemComponent} from "./service-item/service-item.component";


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

}
