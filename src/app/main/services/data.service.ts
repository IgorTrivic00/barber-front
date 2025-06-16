import {Injectable} from "@angular/core";
import {AppointmentState} from "../model/enums/appointment-state.enum";

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
      work:`Neradan dan`
    });
    return items;
  }

  translateAppointmentState(state: AppointmentState){
    switch (state){
      case AppointmentState.CANCELLED: return 'Otkazan';
      case AppointmentState.COMPLETED: return 'Završen';
      case AppointmentState.SCHEDULED: return 'Zakazan';
    }
  }

  // @ts-ignore
  getDuration(duration: number | undefined) {
    if (!duration) {
      return;
    }
    if (duration > 3600) {
      let hour = duration / 3600;
      let minutes = duration % 60;
      if (hour && !minutes) {
        return Math.round(hour) + " sat/a"
      } else if (hour && minutes) {
        return Math.round(hour) + " sat/a i " + Math.round(minutes) + " minuta"
      }
    } else {
      return Math.round(duration / 60) + " minuta";
    }
  }

}
