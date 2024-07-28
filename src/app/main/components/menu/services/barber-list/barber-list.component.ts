import {Component, Input} from '@angular/core';
import {Barber} from "../../../../model/barber.model";
import {BarberItemComponent} from "./barber-item/barber-item.component";

@Component({
  selector: 'app-barber-list',
  standalone: true,
  imports: [
    BarberItemComponent
  ],
  templateUrl: './barber-list.component.html',
  styleUrl: './barber-list.component.scss'
})
export class BarberListComponent {

  @Input() barbers: Barber[] | undefined;
  @Input() callBack: any;

}
