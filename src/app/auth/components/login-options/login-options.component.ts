import { Component } from '@angular/core';
import {AppSharedModule} from "../../../shared/app-shared.module";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login-options',
  standalone: true,
    imports: [
        AppSharedModule,
        Button,
        InputTextModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './login-options.component.html',
  styleUrl: './login-options.component.scss'
})
export class LoginOptionsComponent {

}
