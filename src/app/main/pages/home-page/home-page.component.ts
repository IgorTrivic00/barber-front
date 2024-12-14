import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {enviroment} from "../../../enviroments/enviroment";
import {WorkDaySwiperComponent} from "../../components/work-day-swiper/work-day-swiper.component";
import {Store} from "@ngrx/store";
import {showNavBar} from "../../../shared/store/actions";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    Button,
    WorkDaySwiperComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{

  redirectToInstagram() {
    const instagramUserName = enviroment.instagramUserName;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `instagram://user?username=${instagramUserName}`;
      setTimeout(() => {
        window.location.href = `https://www.instagram.com/${instagramUserName}/`;
      }, 500);
    } else {
      window.location.href = `https://www.instagram.com/${instagramUserName}/`;
    }
  }

  constructor(private store$: Store) {
  }

  redirectToCall() {
    window.location.href = `tel:${enviroment.mobileNumber}`;
  }

  ngOnInit(): void {
    this.store$.dispatch(showNavBar());
  }
}
