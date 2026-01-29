import {inject, Injectable, signal} from "@angular/core";
import {ServiceFilter} from "../model/service-filter.model";
import {Service} from "../model/service.model";
import {SearchResponse} from "../model/search-response.model";
import {ServiceApiService} from "../api/service-api.service";
import {MINE_SERVICE_SEARCH_ID} from "../constants/constants";
import {Severity} from "../../shared/constants/constants";
import {ToastrService} from "../../shared/service/toastr.service";
import {LocalStorageService} from "../../shared/service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private searchCache = signal(new Map<String, SearchResponse<Service>>());
  private _selectedService= signal<Service | undefined>(undefined);
  private filterCache = new Map<String, ServiceFilter>();
  private apiService = inject(ServiceApiService);
  private toastrService = inject(ToastrService);
  private storageService = inject(LocalStorageService);

  search(id: string, filter: ServiceFilter){
    const resultFilter = this.updateFilterCache(id, filter);
    this._search(id, resultFilter);
  }

  getResponse(id: string){
    return this.searchCache().get(id);
  }

  findMine(){
    this.apiService.findMine()
      .subscribe(value => this.updateSearchCache(MINE_SERVICE_SEARCH_ID, value));
  }

  add(service: Service, file?: any, callbackFn?: () => any){
    this.apiService.add(service, file).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Usluga je uspešno dodata!");
      if(callbackFn){
        callbackFn();
      }
    });
  }

  delete(uuid: string | undefined, callbackFn?: () => any){
    this.apiService.delete(uuid).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Usluga je uspešno obrisana!");
      if(callbackFn){
        callbackFn();
      }
    });
  }

  update(service: Service, callbackFn?: () => any){
    this.apiService.update(service).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Usluga uspešno ažurirana!");
      if(callbackFn){
        callbackFn();
      }
    });
  }

  selectService(service: Service){
    this._selectedService.set(service);
    this.storageService.setSavedState(service, "selectedService");
  }

  get selectedService() {
    return this._selectedService;
  }

  private _search(id: string, filter: ServiceFilter | undefined){
    this.apiService.search(filter)
      .subscribe(value => this.updateSearchCache(id, value));
  }

  private updateSearchCache(id: string, value: any){
    this.searchCache.update(cache => {
      const next = new Map(cache);
      next.set(id, value);
      return next;
    });
  }

  private updateFilterCache(id: string, filter: ServiceFilter){
    const filterFromCache = this.filterCache.get(id);
    const merged = {
      ...filterFromCache,
      ...filter
    } as ServiceFilter;
    this.filterCache.set(id, merged);
    return this.filterCache.get(id);
  }
}
