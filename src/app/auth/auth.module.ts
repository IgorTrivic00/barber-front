import {NgModule} from "@angular/core";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {AppCommonModule} from "../shared/app-common.module";

@NgModule({
  imports: [
    LoginPageComponent,
    RegisterPageComponent,
    AppCommonModule
  ],
  exports: [
    LoginPageComponent,
    RegisterPageComponent
  ]
})
export class AuthModule {

}
