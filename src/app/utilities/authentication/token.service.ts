import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from '../http/api-end-points';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(public http: HttpClient) {}

  public getToken(): any {
    let token = localStorage.getItem('token');
    if (token == null || token == undefined) {
      return (token = '');
    } else {
      return token;
    }
  }

  public getEncryptionKey(): any {
    let token = localStorage.getItem('encryptionKey');
    if (token == null || token == undefined) {
      return (token = '');
    } else {
      return token;
    }
  }

  public requestTokenAndEncKeyObservable(): Observable<any> {
    return this.http
      .get<any>(environment.baseApiUrl + API_ENDPOINTS.AUTH.TOKEN_REQ_URL)
      .pipe(
        map((response) => {
          let key = response.token;
          let newToken = key.substr(key.length - 16);
          let newEncryption = key.substring(0, key.length - 16);

          localStorage.setItem('token', newToken);
          localStorage.setItem('encryptionKey', newEncryption);
          return newEncryption;
        })
      );
  }

  public requestHandShakeToken(): Observable<any> {

    return this.http
      .post(environment.baseApiUrl + API_ENDPOINTS.HANDSHAKE.TOKEN_REQ_URL, {
        payload: JSON.stringify({
          agent_iam: 'web-app',
        }),
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
