
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengModule } from '../../primeng.module';
@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {
  @Input() label:string | undefined;
  @Output() confirm = new EventEmitter<void>(); 
  @Output() cancel = new EventEmitter<void>(); 

  onConfirm() {
    this.confirm.emit(); 
  }

  onCancel() {
    this.cancel.emit(); 
  }
}
