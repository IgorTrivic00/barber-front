import {inject, Injectable} from "@angular/core";
import {enviroment} from "../../enviroments/enviroment";
import {HttpClient} from "@angular/common/http";
import {ServiceFilter} from "../model/service-filter.model";
import {SearchResponse} from "../model/search-response.model";
import {Service} from "../model/service.model";

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  private readonly SERVICE_API = enviroment.baseUrl + '/api/v1/service';

  private httpClient = inject(HttpClient);

  search(filter: ServiceFilter) {
    return this.httpClient.post<SearchResponse<Service>>(this.SERVICE_API + '/search', filter);
  }

  add(service: Service, file?: any){
    const formData = new FormData();
    formData.append('service', new Blob([JSON.stringify(service)], {type: 'application/json'}));
    if(file){
      formData.append('photo', file);
    }
    return this.httpClient.post<Service>(this.SERVICE_API + '/add', formData);
  }

  delete(uuid: string | undefined) {
    return this.httpClient.delete<Service>(this.SERVICE_API + '/' + uuid);
  }

  update(service: Service) {
    return this.httpClient.put<Service>(this.SERVICE_API , service);
  }

  findMine() {
    return this.httpClient.get<SearchResponse<Service>>(this.SERVICE_API + '/my-services');
  }

}
