import {Component, OnDestroy} from '@angular/core';
import {PrimengModule} from "../../primeng.module";
import {User} from "../../../auth/model/user.model";
import {Store} from "@ngrx/store";
import {Subject} from "rxjs";
import {UserRole} from "../../../auth/model/user-role.model";
import {Router} from '@angular/router';
import {Barber} from '../../../auth/model/barber.model';
import {AuthService} from "../../../auth/service/auth.service";


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnDestroy {

  user: User | undefined;
  barber: Barber | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private router: Router,
              private userService: AuthService
  ) {
    this.userService.getLoggedUser()?.subscribe(value => this.user = value);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  navigateToMyServices() {
    this.router.navigate(['my-services'])
  }


  protected readonly UserRole = UserRole;
}
