import {Component, OnInit} from '@angular/core';
import {PrimengModule} from "../../../shared/primeng.module";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{

  ngOnInit(): void {

  }


}
