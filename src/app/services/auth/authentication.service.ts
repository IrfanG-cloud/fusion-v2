import { Injectable } from '@angular/core';
import { User } from 'src/app/utilities/models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/utilities/authentication/token.service';
import { EncryptionService } from 'src/app/utilities/authentication/encryption-service';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from 'src/app/utilities/http/api-end-points';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser = new Subject<any>();
  public currentUser$ = this.currentUser.asObservable();
  skeletonValue = new BehaviorSubject(false);

  constructor(
    private encryptionService: EncryptionService,
    private tokenService: TokenService,
      private httpClint: HttpClient,
    private _commonService:CommonService
  ) {}

  logout() {
    localStorage.removeItem('isLoggedIn');
  }

  async loginUserObservable(userData: User): Promise<Observable<any>> {
    return this.httpClint
      .post(environment.baseApiUrl + API_ENDPOINTS.USER.LOGIN_CLIENT_URL, {
        payload: JSON.stringify(userData),
      })
      .pipe(
        map((response) => {
          console.log('Login Response=>', JSON.parse(JSON.stringify(response)));
          let { status, token, user } = JSON.parse(JSON.stringify(response));
          if (status == 'success') {
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
              this._commonService.showServerError = true;
          }
          this.currentUser.next(user);
          return response;
        })
      );
  }

  async signUpUserObservable(user: User): Promise<Observable<any>> {
    console.log('User=>', user);
    return this.httpClint
      .post(environment.baseApiUrl + API_ENDPOINTS.USER.REGISTER_CLIENT_URL, {
        payload: JSON.stringify(user),
      })
      .pipe(
        map((response) => {
          console.log('sign up api response', response);
          return response;
        })
      );
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
