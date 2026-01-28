import {Injectable} from "@angular/core";
import {Photo} from "../model/photo.model";
import {v4 as uuidv4} from "uuid";
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../enviroments/enviroment";
import {first, Observable} from "rxjs";
import {selectToken} from "../../auth/store/selectors";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class ContentService {

  constructor(private httpClient: HttpClient,
              private store$: Store) {
  }

  setPhoto(filePreview: any, ownerUuid: string): Photo {
    let photo!: Photo;
    if (!filePreview.uuid) {
      filePreview.uuid = uuidv4();
    }
    filePreview.ownerUuid = ownerUuid;
    delete filePreview.preview;
    if (filePreview.contentType?.startsWith('image')) {
      photo = filePreview as Photo;
    }
    return photo;
  }

  serveContent(ownerUuid: string | undefined, id: number | undefined){
    const url = enviroment.baseUrl + '/api/v1/content/photo/' + ownerUuid + '/' + id;
    return this.httpClient.get(url, {responseType: 'blob'});
  }
}
