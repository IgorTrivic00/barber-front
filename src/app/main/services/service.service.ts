import {inject, Injectable, signal} from "@angular/core";
import {ServiceFilter} from "../model/service-filter.model";
import {Service} from "../model/service.model";
import {MainApiService} from "../api/main-api.service";
import {SearchResponse} from "../model/search-response.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private searchCache = signal<Map<String, SearchResponse<Service>>>(new Map<String, SearchResponse<Service>>());
  private apiService = inject(MainApiService);
  private filterCache = new Map<String, ServiceFilter>();

  search(id: string, filter: ServiceFilter){
    const filterFromCache = this.filterCache.get(id);
    const merged = {
    ...filterFromCache,
    ...filter
    } as ServiceFilter;
    this.filterCache.set(id, merged);
    this._search(id, merged);
  }

  getResponse(id: string){
    return this.searchCache().get(id);
  }

  private _search(id: string, filter: ServiceFilter){
    this.apiService.searchServices(filter).subscribe(value => {
      this.searchCache.update(cache => {
        const next = new Map(cache);
        next.set(id, value);
        return next;
      });
    });
  }
}
