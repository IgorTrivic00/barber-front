import { Component } from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {RouterOutlet} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectShowNavBar} from "../../store/selectors";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";

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

  showNavBar$: Observable<boolean> | undefined;

  constructor(private store$: Store) {
    this.initSelectors();
  }

  private initSelectors() {
    this.showNavBar$ = this.store$.select(selectShowNavBar);
  }
}
