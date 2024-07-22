import { Component } from '@angular/core';
import {AppModule} from "./app.module";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {LocalStorageService} from "./shared/service/local-storage.service";
import {selectSpinner} from "./shared/store/selectors";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  loading$!: Observable<boolean>;

  constructor(private store$: Store,
              private localStorageService: LocalStorageService) {
    this.loading$ = this.store$.pipe(select(selectSpinner));
    this.localStorageService.mapLocalStorageToStore();
  }
}
