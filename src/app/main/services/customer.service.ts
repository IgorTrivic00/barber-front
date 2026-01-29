import {inject, Injectable} from "@angular/core";
import {CustomerApiService} from "../api/customer-api.service";
import {Customer} from "../../auth/model/customer.model";
import {ToastrService} from "../../shared/service/toastr.service";
import {Severity} from "../../shared/constants/constants";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CustomerService{

  private apiService = inject(CustomerApiService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  update(customer: Customer){
    this.apiService.update(customer).subscribe(value => {
      this.toastrService.showMessage(Severity.SUCCESS,"Uspešno sačuvano!");
      this.router.navigate(['settings']);
    });
  }

}
