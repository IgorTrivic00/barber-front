import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppSharedModule} from "../../../shared/app-shared.module";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectLastUrl} from "../../../shared/store/selectors";
import {filter, Subject, takeUntil} from "rxjs";
import {hideNavBar} from "../../../shared/store/actions";

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
export class LoginOptionsComponent implements OnInit, OnDestroy{

  lastUrl: string | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private router: Router) {
    this.selectLastUrl();
  }

  private selectLastUrl() {
    this.store$.select(selectLastUrl)
      .pipe(filter(Boolean), takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.lastUrl = value);
  }

  return() {
    this.router.navigate([this.lastUrl]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.store$.dispatch(hideNavBar());
  }
}
