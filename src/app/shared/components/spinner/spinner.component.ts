import { Component } from '@angular/core';
import {PrimengModule} from "../../primeng.module";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    PrimengModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

}
