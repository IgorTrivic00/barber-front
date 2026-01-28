import {NgModule} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {PrimengModule} from "./shared/primeng.module";
import {AppSharedModule} from "./shared/app-shared.module";
import {AuthModule} from "./auth/auth.module";
import {CommonModule} from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

@NgModule({ exports: [
        AuthModule,
        PrimengModule,
        CommonModule,
        AppSharedModule,
        RouterOutlet,
        HttpClientModule,
    ],
    declarations: [], imports: [RouterOutlet,
        AuthModule,
        PrimengModule,
        CommonModule,
        AppSharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule{

}
