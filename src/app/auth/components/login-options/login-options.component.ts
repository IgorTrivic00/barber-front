import {Component, OnDestroy} from '@angular/core';
import {AppSharedModule} from "../../../shared/app-shared.module";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectLastUrl} from "../../../shared/store/selectors";
import {Subject, takeUntil} from "rxjs";
import {showMessage} from "../../../shared/store/actions";
import {Severity} from "../../../shared/constants/constants";

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
export class LoginOptionsComponent implements OnDestroy{

  lastUrl: string | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private router: Router) {
    this.selectLastUrl();
  }

  private selectLastUrl() {
    this.store$.pipe(select(selectLastUrl), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if (value) {
        this.lastUrl = value;
      }
    });
  }

  return() {
    this.router.navigate([this.lastUrl]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
