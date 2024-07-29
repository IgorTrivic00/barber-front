import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../../../auth/model/user.model";
import {Subject, takeUntil} from "rxjs";
import {select, Store} from "@ngrx/store";
import {cloneDeep} from "lodash";
import {selectCustomer, selectLoggedUser} from '../../../../../auth/store/selectors';
import {Customer} from "../../../../../auth/model/customer.model";
import {AvatarModule} from "primeng/avatar";
import {updateCustomer} from "../../../../store/actions";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    AvatarModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy{

  form: FormGroup | undefined;

  user: User | undefined;
  customer: Customer | undefined;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private store$: Store,
              private formBuilder: FormBuilder) {
    this.selectLoggedUser();
    this.selectCustomer();
  }

  ngOnInit(): void {
    this.initForm();
  }


  private selectLoggedUser() {
    this.store$.pipe(select(selectLoggedUser), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if(value){
        this.user = cloneDeep(value);
      }
    });
  }

  private selectCustomer() {
    this.store$.pipe(select(selectCustomer), takeUntil(this.ngUnsubscribe)).subscribe(value => {
      if(value){
        this.customer = cloneDeep(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm(){
    this.form = this.formBuilder.group({
      name: [this.customer?.name],
      email: [this.user?.email],
      mobile: [this.customer?.mobile]
    })
  }

  updateCustomer() {
    this.customer = {
      ...this.customer,
      name: this.form?.get('name')?.value
    };
    this.store$.dispatch(updateCustomer({customer: this.customer!}));
  }
}
