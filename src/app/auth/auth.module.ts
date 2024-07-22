import {NgModule} from "@angular/core";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {AppSharedModule} from "../shared/app-shared.module";

@NgModule({
  imports: [
    LoginPageComponent,
    RegisterPageComponent,
    AppSharedModule
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent
  ]
})
export class AuthModule {

}
