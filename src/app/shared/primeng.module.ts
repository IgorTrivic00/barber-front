import {NgModule} from "@angular/core";
import {ImageModule} from "primeng/image";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import {InputTextareaModule} from "primeng/inputtextarea";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputGroupModule} from "primeng/inputgroup";
import { MenuModule } from 'primeng/menu';


@NgModule({
  imports: [
    ImageModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    InputTextareaModule,
    IconFieldModule,
    InputIconModule,
    InputGroupModule,
    MenuModule
  ],
  exports: [
    ImageModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    InputTextareaModule,
    IconFieldModule,
    InputIconModule,
    InputGroupModule,
    MenuModule
  ]
})
export class PrimengModule{

}
