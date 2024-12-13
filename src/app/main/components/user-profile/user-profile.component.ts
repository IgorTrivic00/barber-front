import {Component, OnDestroy, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../auth/model/user.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {Customer} from "../../../auth/model/customer.model";
import {AvatarModule} from "primeng/avatar";
import {updateCustomer} from "../../store/actions";
import {UserService} from "../../../auth/service/user.service";
import {hideNavBar, showNavBar} from "../../../shared/store/actions";

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
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.userService.getUser()?.subscribe(value => this.user = value);
    this.userService.getCustomer()?.subscribe(value => this.customer = value);
  }

  ngOnInit(): void {
    this.initForm();
    this.store$.dispatch(hideNavBar());
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
