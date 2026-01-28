import {Component, inject, OnInit} from '@angular/core';
import {AppSharedModule} from "../../../shared/app-shared.module";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {returnToPreviousPage} from "../../../shared/store/actions";
import {NavBarService} from "../../../shared/service/nav-bar.service";

@Component({
  selector: 'app-login-options',
  standalone: true,
    imports: [
        AppSharedModule,
        Button,
        InputTextModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './login-options.component.html',
  styleUrl: './login-options.component.scss'
})
export class LoginOptionsComponent implements OnInit{

  navBarService = inject(NavBarService);

  constructor(private store$: Store) {
  }

  return() {
    this.store$.dispatch(returnToPreviousPage());
  }

  ngOnInit(): void {
    this.navBarService.hide();
  }
}
