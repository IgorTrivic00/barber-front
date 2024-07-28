import {Component, Input} from '@angular/core';
import {Barber} from "../../../../../model/barber.model";
import {PrimengModule} from "../../../../../../shared/primeng.module";
import {BarberTitle} from "../../../../../model/barber-title.model";

@Component({
  selector: 'app-barber-item',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './barber-item.component.html',
  styleUrl: './barber-item.component.scss'
})
export class BarberItemComponent {

  @Input() barber: Barber | undefined;

  getBarberTitle(barberTitle: BarberTitle) {
    switch (barberTitle){
      case BarberTitle.MASTER:
        return 'Master Barber';
    }
  }
}
