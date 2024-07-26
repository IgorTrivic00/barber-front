import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {enviroment} from "../../../enviroments/enviroment";
import {WorkDaySwiperComponent} from "../work-day-swiper/work-day-swiper.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Button,
    WorkDaySwiperComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  redirectToInstagram() {
    const url = 'instagram://user?username=' + enviroment.instagramUserName;
    window.location.href = url;
  }

  redirectToCall() {
    const url = `tel:${enviroment.mobileNumber}`;
    window.location.href = url;
  }
}
