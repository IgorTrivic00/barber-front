import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {PrimengModule} from "./shared/primeng.module";
import {AppSharedModule} from "./shared/app-shared.module";
import {AuthModule} from "./auth/auth.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    RouterOutlet,
    AuthModule,
    PrimengModule,
    CommonModule,
    AppSharedModule,
  ],
  exports: [
    AuthModule,
    PrimengModule,
    CommonModule,
    AppSharedModule,
    RouterOutlet
  ]
})
export class AppModule{

}
