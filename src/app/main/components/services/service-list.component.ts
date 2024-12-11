import {Component, Input} from '@angular/core';
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

}
