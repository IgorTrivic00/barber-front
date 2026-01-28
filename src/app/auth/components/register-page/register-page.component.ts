import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppSharedModule} from "../../../shared/app-shared.module";
import {PrimengModule} from "../../../shared/primeng.module";
import {Severity} from "../../../shared/constants/constants";
import {registerCustomer} from "../../store/actions";
import {UserRole} from "../../model/user-role.model";
import {AuthenticationRequest} from "../../model/request_response/authentication-request.model";
import { v4 as uuidv4 } from 'uuid';
import {ToastrService} from "../../../shared/service/toastr.service";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    AppSharedModule,
    PrimengModule
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit{

  registrationForm!: FormGroup;
  toastService = inject(ToastrService);

  constructor(private formBuilder: FormBuilder,
              private store$: Store) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      name: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  registerCustomer() {
    if(!this.formValidation()){
      return;
    }
    const request: AuthenticationRequest = {
      customer: {
        uuid: uuidv4(),
        name: this.registrationForm.get('name')?.value
      },
      user: {
        ...this.registrationForm.getRawValue(),
        uuid: uuidv4(),
        userRole: UserRole.CUSTOMER
      }
    }
    this.store$.dispatch(registerCustomer({request}));
  }

  private formValidation() {
    if (!this.registrationForm.get('email')?.valid) {
      this.toastService.showMessage(Severity.ERROR, 'Email je obavezno polje');
      return false;
    }
    if (!this.registrationForm.get('password')?.valid) {
      this.toastService.showMessage(Severity.ERROR, 'Lozinka je obavezno polje');
      return false;
    }

    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('confirmPassword')?.value) {
      this.toastService.showMessage(Severity.ERROR, 'Lozinke se ne poklapaju');
      return false;
    }
    return true;
  }
}
