import {Injectable} from "@angular/core";
import {User} from "../model/user.model";
import {AuthConfiguration} from "../auth.configuration";
import {map, take} from "rxjs";
import {LogoutRequest} from "../model/request_response/logout.request";
import {KeepAliveRequest} from "../model/request_response/keep-alive.request";
import {KeepAliveResponse} from "../model/request_response/keep-alive.response";
import {UserSession} from "../model/user-session.model";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  readonly API_AUTH = this.authConfig.authApi;

  constructor(private httpClient: HttpClient,
              private authConfig: AuthConfiguration) {
  }

  login(user: User) {
    return this.httpClient.post<UserSession>(this.API_AUTH + "login", user);
  }

  registerCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(this.API_AUTH + "register-customer", customer);
  }

  logout(userSession: any) {
    const logoutRequest: LogoutRequest = {token: !!userSession ? userSession.token : ''};
    return this.httpClient.post<any>(this.API_AUTH + 'logout', logoutRequest).pipe(
      map(() => userSession),
      take(1)
    );
  }

  keepAlive(keepAliveRequest: any) {
    const ka: KeepAliveRequest = {token: !!keepAliveRequest ? keepAliveRequest.token : ''};
    return this.httpClient.post<KeepAliveResponse>(this.API_AUTH + 'keep-alive', ka);
  }
}
