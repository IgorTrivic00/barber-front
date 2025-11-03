import {Injectable} from "@angular/core";
import {Photo} from "../model/photo.model";
import {v4 as uuidv4} from "uuid";

@Injectable({
  providedIn: "root"
})
export class ContentService {

  constructor() {
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

}
