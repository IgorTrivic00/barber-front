import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../enviroments/enviroment";
import {SlotFilter} from "../model/slot-filter.model";
import {SearchResponse} from "../model/search-response.model";
import {Slot} from "../model/slot.model";

@Injectable({
  providedIn: 'root'
})
export class SlotApiService{

  private readonly SLOT_API = enviroment.baseUrl + '/api/v1/slot';

  private httpClient = inject(HttpClient);

  search(filter: SlotFilter | undefined) {
    return this.httpClient.post<SearchResponse<Slot>>(this.SLOT_API + '/search', filter);
  }

}
