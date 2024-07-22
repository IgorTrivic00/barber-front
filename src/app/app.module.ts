import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {PrimengModule} from "./shared/primeng.module";
import {AppCommonModule} from "./shared/app-common.module";
import {AuthModule} from "./auth/auth.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    RouterOutlet,
    AuthModule,
    PrimengModule,
    CommonModule,
    AppCommonModule,
  ],
  exports: [
    AuthModule,
    PrimengModule,
    CommonModule,
    AppCommonModule,
    RouterOutlet
  ]
})
export class AppModule{

}
