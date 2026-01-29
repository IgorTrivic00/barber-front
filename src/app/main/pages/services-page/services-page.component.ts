import {Component, inject, OnInit} from '@angular/core';
import {BarberListComponent} from "../../components/barber/barber-list.component";
import {Button} from "primeng/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ServiceListComponent} from "../../components/services/service-list.component";
import {NgIf} from "@angular/common";
import {NavBarService} from "../../../shared/service/nav-bar.service";
import {ServiceService} from "../../services/service.service";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    BarberListComponent,
    Button,
    RouterLink,
    ServiceListComponent,
    NgIf
  ],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss'
})
export class ServicesPageComponent implements OnInit{

  private readonly barberUuid: string | undefined;
  private navBarService = inject(NavBarService);
  serviceService = inject(ServiceService);
  searchId = 'barber-services';

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.barberUuid = this.route.snapshot.params['barberUuid'];
  }

  ngOnInit(): void {
    this.navBarService.hide();
    this.serviceService.search(this.searchId, {barberUuids: [this.barberUuid!]});
  }

  return() {
    this.router.navigate(['barbers']);
  }
}


