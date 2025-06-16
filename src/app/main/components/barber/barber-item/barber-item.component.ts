import {Component, Input} from '@angular/core';
import {PrimengModule} from "../../../../shared/primeng.module";
import {Barber} from "../../../../auth/model/barber.model";
import {BarberTitle} from "../../../../auth/model/barber-title.model";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-barber-item',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './barber-item.component.html',
  styleUrl: './barber-item.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class BarberItemComponent {

  @Input() barber: Barber | undefined;
  @Input() callBack: any;

  constructor() {
  }

  getBarberTitle(barberTitle: BarberTitle) {
    switch (barberTitle){
      case BarberTitle.MASTER:
        return 'Master Barber';
    }
  }

  callCallBack() {
    this.callBack(this.barber);
  }
}
