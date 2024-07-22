import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    SpinnerComponent,
    RouterModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    SpinnerComponent,
    RouterModule,
  ]
})
export class AppCommonModule {

}
