import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimengModule} from "../../../../shared/primeng.module";
import {User} from "../../../../auth/model/user.model";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectLoggedUser} from "../../../../auth/store/selectors";
import {cloneDeep} from "lodash";
import {UserRole} from "../../../../auth/model/user-role.model";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnDestroy{

  user: User | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store) {
    this.selectLoggedUser();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private selectLoggedUser() {
    this.store$.pipe(select(selectLoggedUser), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if(value){
        this.user = cloneDeep(value);
      }
    })
  }

  protected readonly UserRole = UserRole;
}
