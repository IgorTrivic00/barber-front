import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { PrimengModule } from '../../../shared/primeng.module';
import {DialogModule} from 'primeng/dialog';
import { AppSharedModule } from '../../../shared/app-shared.module';
import {Service} from "../../model/service.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [PrimengModule, DialogModule, AppSharedModule, ConfirmDialogModule],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss'
})
export class ServiceModalComponent implements OnInit {

  service: Service | undefined;
  form: FormGroup | undefined;

  constructor(private ref: DynamicDialogRef,
              private fb: FormBuilder,
              private confirmationService: ConfirmationService,
              private config: DynamicDialogConfig) {
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
    };
    this.ref.close(service);
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
