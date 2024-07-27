import {Component, OnInit} from '@angular/core';
import {PrimengModule} from "../../../../../shared/primeng.module";
import {DataService} from "../../../../services/data.service";

@Component({
  selector: 'app-work-day-swiper',
  standalone: true,
  imports: [
    PrimengModule
  ],
  templateUrl: './work-day-swiper.component.html',
  styleUrl: './work-day-swiper.component.scss'
})
export class WorkDaySwiperComponent implements OnInit{

  items: any[] | undefined;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.items = this.dataService.getWorkDays();
  }

  formatLabel(item: any): string {
    return `${item.day}\n${item.work}`;
  }

}
