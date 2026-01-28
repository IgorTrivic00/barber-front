import {Component, inject} from '@angular/core';
import {AppModule} from "./app.module";
import {Store} from "@ngrx/store";
import {LocalStorageService} from "./shared/service/local-storage.service";
import {NavigationService} from "./shared/service/navigation.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SpinnerService} from "./shared/service/spinner.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  spinnerService = inject(SpinnerService);

  constructor(private store$: Store,
              private navigationService: NavigationService,
              private localStorageService: LocalStorageService) {
    this.localStorageService.mapLocalStorageToStore();
  }
}
