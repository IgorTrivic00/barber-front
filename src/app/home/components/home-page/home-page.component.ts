import {Component, OnDestroy} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {MenuItem} from "primeng/api";
import {selectLoggedUser} from "../../../auth/store/selectors";
import {PrimengModule} from "../../../shared/primeng.module";
import {User} from "../../../auth/model/user.model";
import { logout } from '../../../auth/store/actions';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PrimengModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnDestroy {

  loggedUser: User | undefined;
  items: MenuItem[] | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store) {
    this.initSelectors();
  }

  logout() {
    this.store$.dispatch(logout());
  }

  private initSelectors() {
    this.store$.pipe(select(selectLoggedUser), takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
      if(user){
        this.loggedUser = user;
      }
    });
    this.items = [
      {
        items: [
          {
            label: 'Odjava',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            }
          }
        ]
      }
    ];
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
