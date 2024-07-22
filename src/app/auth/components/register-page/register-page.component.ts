import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppCommonModule} from "../../../shared/app-common.module";
import {PrimengModule} from "../../../shared/primeng.module";
import {showMessage} from "../../../shared/store/actions";
import {Severity} from "../../../shared/constants/constants";
import {login, register} from "../../store/actions";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    AppCommonModule,
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
      firstName: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  register() {
    if(!this.formValidation()){
      return;
    }
    const user: User = this.registrationForm.getRawValue();
    this.store$.dispatch(register({user}));
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
