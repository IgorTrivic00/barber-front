import {Component, Input} from '@angular/core';
import {Barber} from "../../../../../model/barber.model";
import {PrimengModule} from "../../../../../../shared/primeng.module";

@Component({
  selector: 'app-barber-item',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './barber-item.component.html',
  styleUrl: './barber-item.component.scss'
})
export class BarberItemComponent {

  @Input() barber: Barber | undefined;

}
