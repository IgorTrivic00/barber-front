import {Injectable} from "@angular/core";
import {Barber} from "../model/barber.model";
import {BarberTitle} from "../model/barber-title.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  getWorkDays(){
    const items: any[] = [];
    items.push({
      day: 'PON',
      work: '09:00 - 17:00'
    });
    items.push({
      day: 'UTO',
      work: '09:00 - 17:00'
    });
    items.push({
      day: 'SRE',
      work: '09:00 - 17:00'
    });
    items.push({
      day: 'ČET',
      work: '09:00 - 17:00'
    });
    items.push({
      day: 'PET',
      work: '09:00 - 17:00'
    });
    items.push({
      day: 'SUB',
      work: '09:00 - 17:00'
    });
    items.push({
      day: 'NED',
      work: ''
    });
    return items;
  }

}
