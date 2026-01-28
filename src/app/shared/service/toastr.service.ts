import {effect, inject, Injectable, signal} from "@angular/core";
import {MessageService} from "primeng/api";
import {Severity, SeverityMap} from "../constants/constants";

interface Message {
  severity: Severity;
  detail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastrService{

  private messageService = inject(MessageService);
  private message = signal<Message | null>(null);

  constructor() {
    effect(() => {
      this.messageService.add({severity: this.message()?.severity, summary: SeverityMap.get(<Severity>this.message()?.severity), detail: this.message()?.detail});
    })
  }

  showMessage(severity: Severity, detail?: string){
    this.message.set({severity: severity, detail: detail});
  }

}
