import {Component, inject, OnInit} from '@angular/core';
import {PrimengModule} from "../../../shared/primeng.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppSharedModule} from "../../../shared/app-shared.module";
import {Store} from "@ngrx/store";
import {returnToPreviousPage} from "../../../shared/store/actions";
import {Severity} from "../../../shared/constants/constants";
import {User} from "../../model/user.model";
import {login} from "../../store/actions";
import {ToastrService} from "../../../shared/service/toastr.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    PrimengModule,
    AppSharedModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{

  loginForm!: FormGroup;
  toastService = inject(ToastrService);

  constructor(private formBuilder: FormBuilder,
              private store$: Store) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  login() {
    if(!this.formValidation()){
      return;
    }
    const user: User = this.loginForm.getRawValue();
    this.store$.dispatch(login({user}));
  }

  private formValidation() {
    if (!this.loginForm.get('email')?.valid) {
      this.toastService.showMessage(Severity.ERROR, 'Email je obavezno polje');
      return false;
    }
    if (!this.loginForm.get('password')?.valid) {
      this.toastService.showMessage(Severity.ERROR, 'Lozinka je obavezno polje');
      return false;
    }
    return true;
  }

  return() {
    this.store$.dispatch(returnToPreviousPage());
  }
}
