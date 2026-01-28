import {Injectable, signal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  showNavBar = signal(true);

  show(){
    this.showNavBar.set(true);
  }

  hide(){
    this.showNavBar.set(false);
  }

}
