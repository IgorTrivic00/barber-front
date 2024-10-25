import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PrimengModule } from '../../primeng.module';
import {DialogModule} from 'primeng/dialog';
import { AppSharedModule } from '../../app-shared.module';  
@Component({
  selector: 'app-service-modal',
  standalone: true,
  imports: [PrimengModule, DialogModule,AppSharedModule],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss'
})
export class ServiceModalComponent implements OnInit {


    @Input() visible: boolean = false; 
    @Input() isEditMode: boolean = false;  
    @Input() serviceData: any = {};  
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();  
    @Output() onSave: EventEmitter<any> = new EventEmitter(); 
    @Output() onCancel: EventEmitter<void> = new EventEmitter(); 
  
    serviceForm!: FormGroup;
  
    ngOnInit(): void {
     
      if (!this.serviceData) {
        this.serviceData = { serviceName: '', price: 0, duration: 0 };
      }
      this.serviceForm = new FormGroup({
        serviceName: new FormControl(this.serviceData.serviceName || '', Validators.required),
        price: new FormControl(this.serviceData.price || 0, [Validators.required, Validators.min(1)]),
        duration: new FormControl(this.serviceData.duration || 0, [Validators.required, Validators.min(1)]),
      });
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['serviceData'] && changes['serviceData'].currentValue) {
        if (this.serviceForm) {
         
          this.serviceForm.setValue({
            serviceName: this.serviceData.serviceName || '',
            price: this.serviceData.price || 0,
            duration: this.serviceData.duration || 0
          });
        }
      }
    }
  
    
    isFormValid(): boolean {
      return this.serviceForm.valid;
    }
  
   
    save() {
      if (this.serviceForm.valid) {
        console.log(this.serviceForm.value);
        this.onSave.emit(this.serviceForm.value);  
        this.toggleModal(false); 
      }
    }
  
    
    cancel() {
      this.onCancel.emit();
      this.toggleModal(false);  
    }
  
   
    toggleModal(value: boolean) {
      this.visible = value;
      this.visibleChange.emit(this.visible); 
    }
}
