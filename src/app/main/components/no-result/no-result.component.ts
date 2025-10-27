import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-no-result',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './no-result.component.html',
  styleUrl: './no-result.component.scss'
})
export class NoResultComponent {

  @Input() label!: string;

}
