import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {User} from "../model/user.model";
import {selectBarber, selectCustomer, selectLoggedUser} from "../store/selectors";
import {Barber} from "../model/barber.model";
import {Customer} from "../model/customer.model";
import {filter, Observable, Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$: Observable<User> | undefined;
  private _barber$: Observable<Barber> | undefined;
  private _customer$: Observable<Customer> | undefined;

  private ngUnsubscribe = new Subject();

  constructor(private store$: Store) {
    this.selectLoggedUser();
    this.selectCustomer();
    this.selectBarber();
  }

  getUser(){
    return this._user$;
  }

  getBarber(){
    return this._barber$;
  }

  getCustomer(){
    return this._customer$;
  }

  private selectLoggedUser() {
    this._user$ = this.store$.select(selectLoggedUser)
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  private selectCustomer() {
    this._customer$ = this.store$.select(selectCustomer)
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  private selectBarber() {
    this._barber$ = this.store$.select(selectBarber)
      .pipe(takeUntil(this.ngUnsubscribe));
  }
}
