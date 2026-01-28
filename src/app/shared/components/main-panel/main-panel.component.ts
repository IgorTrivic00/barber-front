import {Component, inject} from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {NavBarService} from "../../service/nav-bar.service";

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterOutlet,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss'
})
export class MainPanelComponent {

  navBarService = inject(NavBarService);

}
