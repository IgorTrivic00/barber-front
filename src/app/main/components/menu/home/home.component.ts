import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {enviroment} from "../../../../enviroments/enviroment";
import {WorkDaySwiperComponent} from "./work-day-swiper/work-day-swiper.component";

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

    // ovo je obrisan deo ne treba ti
   /* const url = 'instagram://user?username=' + enviroment.instagramUserName;
    window.location.href = url;*/

    const instagramUserName = enviroment.instagramUserName;
  
    // Prov radimo proveru da li je korisnik na mobilnom uredjaju ili nije 
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    if (isMobile) {
      // AAko jeste onda pokusava da dje na aplikaciju ako je imas instaliranu ako ne ,
      const appUrl = `instagram://user?username=${instagramUserName}`;
      window.location.href = appUrl;
  
      //  otvorice ti  web verziju
      setTimeout(() => {
        const webUrl = `https://www.instagram.com/${instagramUserName}/`;
        window.location.href = webUrl;
      }, 500); 
    } else {
      // Ako nije mobilni uređaj, preusmeri direktno na web verziju
      const webUrl = `https://www.instagram.com/${instagramUserName}/`;
      window.location.href = webUrl;
    }
  }

  redirectToCall() {
    const url = `tel:${enviroment.mobileNumber}`;
    window.location.href = url;
  }
}
