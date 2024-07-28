import {Component, Input} from '@angular/core';
import {Service} from "../../../../../../model/service.model";
import {PrimengModule} from "../../../../../../../shared/primeng.module";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-service-item',
  standalone: true,
    imports: [
        PrimengModule
    ],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.scss',
  providers: [DecimalPipe]

})
export class ServiceItemComponent {

  @Input() service: Service | undefined;

  constructor(private decimalPipe: DecimalPipe) {
  }

  getDuration(duration: number | undefined) {
    return (duration! / 60).toString();
  }

  getPrice(price: number | undefined) {
    if (Number.isFinite(price)) {
      return this.decimalPipe.transform(price!.toFixed(2), '1.2-2');
    } else {
      return price;
    }
  }
}
