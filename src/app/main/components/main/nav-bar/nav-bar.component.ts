import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimengModule} from "../../../../shared/primeng.module";
import {User} from "../../../../auth/model/user.model";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectBarber, selectLoggedUser, selectUserSession} from "../../../../auth/store/selectors";
import {cloneDeep} from "lodash";
import {UserRole} from "../../../../auth/model/user-role.model";
import { UserSession } from '../../../../auth/model/user-session.model';
import { Router } from '@angular/router';
import { Barber } from '../../../../auth/model/barber.model';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnDestroy{


  user: User | undefined;
  userSession: UserSession | undefined;
  barber:Barber| undefined;



  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
    private route:Router
  ) {
    this.selectLoggedUser();
    this.selectUserSession();
    this.selecBarber();
    

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

  private selectUserSession() {
    this.store$.pipe(select(selectUserSession), takeUntil(this.ngUnsubscribe)).subscribe(value => {
       if(value){
         this.userSession = cloneDeep(value);
       }
     })
   }

   private selecBarber() {
    this.store$.pipe(select(selectBarber), takeUntil(this.ngUnsubscribe)).subscribe(value => {
       if(value){
         this.barber = cloneDeep(value);
       }
     })
   }
   navigateToMyService() {
    this.route.navigate(['my-services',this.barber?.uuid])
    }
    

  protected readonly UserRole = UserRole;
}
