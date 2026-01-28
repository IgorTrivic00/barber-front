import {Component, inject, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {enviroment} from "../../../enviroments/enviroment";
import {WorkDaySwiperComponent} from "../../components/work-day-swiper/work-day-swiper.component";
import {NavBarService} from "../../../shared/service/nav-bar.service";
import {ToastrService} from "../../../shared/service/toastr.service";
import {Severity} from "../../../shared/constants/constants";

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

  navBarService = inject(NavBarService);
  navBarService1 = inject(ToastrService);

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

  redirectToCall() {
    window.location.href = `tel:${enviroment.mobileNumber}`;
  }

  ngOnInit(): void {
    this.navBarService.show();
  }
}
