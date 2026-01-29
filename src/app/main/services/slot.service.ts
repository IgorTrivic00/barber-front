import {inject, Injectable, signal} from "@angular/core";
import {SlotApiService} from "../api/slot-api.service";
import {SlotFilter} from "../model/slot-filter.model";
import {SearchResponse} from "../model/search-response.model";
import {Slot} from "../model/slot.model";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private searchCache = signal(new Map<String, SearchResponse<Slot>>());
  private filterCache = new Map<String, SlotFilter>();
  private apiService = inject(SlotApiService);

  search(id: string, filter: SlotFilter | undefined){
    const resultFilter = this.updateFilterCache(id, filter);
    this._search(id, resultFilter);
  }

  getResponse(id: string){
    return this.searchCache().get(id);
  }

  private _search(id: string, filter: SlotFilter | undefined){
    this.apiService.search(filter).pipe(map(value => {
      return {
        ...value,
        data: value.data.map(slot => {
          return {
            ...slot,
            selected: false
          }
        })
      };
    })).subscribe(value => {
      this.updateSearchCache(id, value);
      this.updateFilterCache(id, filter);
    });
  }

  private updateSearchCache(id: string, value: any){
    this.searchCache.update(cache => {
      const next = new Map(cache);
      next.set(id, value);
      return next;
    });
  }

  private updateFilterCache(id: string, filter: SlotFilter | undefined){
    const filterFromCache = this.filterCache.get(id);
    const merged = {
      ...filterFromCache,
      ...filter
    } as SlotFilter;
    this.filterCache.set(id, merged);
    return this.filterCache.get(id);
  }
}
