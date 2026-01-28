import {Barber} from "../../auth/model/barber.model";
import {Photo} from "./photo.model";


export interface Service {
  uuid?: string;
  serviceName?: string;
  duration?: number;
  price?: number;
  barber?: Barber;
  photoId?: number;
  photo?: Photo;
}
