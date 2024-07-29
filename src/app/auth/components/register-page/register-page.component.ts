import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppSharedModule} from "../../../shared/app-shared.module";
import {PrimengModule} from "../../../shared/primeng.module";
import {showMessage} from "../../../shared/store/actions";
import {Severity} from "../../../shared/constants/constants";
import {registerCustomer} from "../../store/actions";
import {UserRole} from "../../model/user-role.model";
import {Customer} from "../../model/customer.model";

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
    const customer: Customer = {
      user: {
        ...this.registrationForm.getRawValue(),
        userRole: UserRole.CUSTOMER
      },
      name: this.registrationForm.get('name')?.value
    };
    this.store$.dispatch(registerCustomer({customer}));
  }

  private formValidation() {
    if (!this.registrationForm.get('email')?.valid) {
      this.store$.dispatch(showMessage({severity: Severity.ERROR, detail: 'Email je obavezno polje'}));
      return false;
    }
    if (!this.registrationForm.get('password')?.valid) {
      this.store$.dispatch(showMessage({severity: Severity.ERROR, detail: 'Lozinka je obavezno polje'}));
      return false;
    }

    if (this.registrationForm.get('password')?.value !== this.registrationForm.get('confirmPassword')?.value) {
      this.store$.dispatch(showMessage({severity: Severity.ERROR, detail: 'Lozinke se ne poklapaju'}));
      return false;
    }
    return true;
  }
}
