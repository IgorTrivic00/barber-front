import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { PrimengModule } from '../../../shared/primeng.module';
import {DialogModule} from 'primeng/dialog';
import { AppSharedModule } from '../../../shared/app-shared.module';
import {Service} from "../../model/service.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from "primeng/api";
import {UploadPhotoComponent} from "../../components/upload-photo/upload-photo.component";
import {AppModule} from "../../../app.module";
import {ContentService} from "../../services/content.service";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-service-modal',
  imports: [PrimengModule, DialogModule, AppSharedModule, ConfirmDialogModule, UploadPhotoComponent, AppModule],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss',
  standalone: true
})
export class ServiceModalComponent implements OnInit {

  service!: Service;
  form!: FormGroup;

  @ViewChild('photo', {static: false}) uploadPhoto!: UploadPhotoComponent;

  constructor(private ref: DynamicDialogRef,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private config: DynamicDialogConfig,
              private contentService: ContentService) {
    this.initService();
  }

  ngOnInit(): void {
    this.initForm();
  }

  cancel() {
    this.ref.close();
  }

  save() {
    const service = {
      ...this.service,
      ...this.form?.getRawValue()
    } as Service;
    if(!this.service.uuid){
      service.uuid = uuidv4();
    }
    service.photo = this.contentService.setPhoto(this.uploadPhoto.filePreview, service.uuid!);
    this.ref.close({service, file: this.uploadPhoto.selectedFile});
  }

  private initService() {
    if(this.config.data?.service){
      this.service = this.config.data.service;
    }
    if (!this.service) {
      this.service = { serviceName: '', price: 0, duration: 0 };
    }
  }

  private initForm() {
    this.form =  this.fb.group({
      serviceName: [this.service?.serviceName, Validators.required],
      price: [this.service?.price, [Validators.required, Validators.min(1)]],
      duration: [this.service?.duration, [Validators.required, Validators.min(1)]],
    });
  }

  confirmSave() {
    this.confirmationService.confirm({
      message: 'Da li ste sigurni da želite da nastavite?',
      header: 'Potvrda',
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Ne',
      rejectButtonStyleClass: 'secondary',
      acceptLabel: 'Da',
      accept: () => {
        this.save();
      }
    });
  }
}
