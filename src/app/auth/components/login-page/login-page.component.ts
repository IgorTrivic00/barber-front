import {Component, OnInit} from '@angular/core';
import {PrimengModule} from "../../../shared/primeng.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppCommonModule} from "../../../shared/app-common.module";
import {Store} from "@ngrx/store";
import {showMessage} from "../../../shared/store/actions";
import {Severity} from "../../../shared/constants/constants";
import {User} from "../../model/user.model";
import {login} from "../../store/actions";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    PrimengModule,
    AppCommonModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit{

  loginForm!: FormGroup;

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
      this.store$.dispatch(showMessage({severity: Severity.ERROR, detail: 'Email je obavezno polje'}));
      return false;
    }
    if (!this.loginForm.get('password')?.valid) {
      this.store$.dispatch(showMessage({severity: Severity.ERROR, detail: 'Lozinka je obavezno polje'}));
      return false;
    }
    return true;
  }
}
