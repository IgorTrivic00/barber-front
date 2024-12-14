import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppSharedModule} from "../../../shared/app-shared.module";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectLastUrl} from "../../../shared/store/selectors";
import {filter, Subject, takeUntil} from "rxjs";
import {hideNavBar, returnToPreviousPage} from "../../../shared/store/actions";

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

  constructor(private store$: Store) {
  }

  return() {
    this.store$.dispatch(returnToPreviousPage());
  }

  ngOnInit(): void {
    this.store$.dispatch(hideNavBar());
  }
}
