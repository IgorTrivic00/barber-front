import { Component } from '@angular/core';
import {BarberListComponent} from "./barber-list/barber-list.component";
import {DataService} from "../../../services/data.service";
import {Barber} from "../../../model/barber.model";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    BarberListComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  barbers: Barber[];

  constructor(private dataService: DataService) {
    this.barbers = this.dataService.getMockBarbers();
  }

}
