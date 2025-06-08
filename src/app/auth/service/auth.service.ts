import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {User} from "../model/user.model";
import {selectLoggedBarber, selectLoggedCustomer, selectLoggedUser} from "../store/selectors";
import {Barber} from "../model/barber.model";
import {Customer} from "../model/customer.model";
import {filter, Observable, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$: Observable<User> | undefined;
  private _barber$: Observable<Barber> | undefined;
  private _customer$: Observable<Customer> | undefined;

  private ngUnsubscribe = new Subject();

  constructor(private store$: Store) {
    this.selectLoggedUser();
    this.selectLoggedCustomer();
    this.selectLoggedBarber();
  }

  getLoggedUser(){
    return this._user$;
  }

  getLoggedBarber(){
    return this._barber$;
  }

  getLoggedCustomer(){
    return this._customer$;
  }

  private selectLoggedUser() {
    this._user$ = this.store$.select(selectLoggedUser)
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  private selectLoggedCustomer() {
    this._customer$ = this.store$.select(selectLoggedCustomer)
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  private selectLoggedBarber() {
    this._barber$ = this.store$.select(selectLoggedBarber)
      .pipe(takeUntil(this.ngUnsubscribe));
  }
}
