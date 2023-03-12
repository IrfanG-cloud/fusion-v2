import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from 'src/app/utilities/http/api-end-points';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  httpClint: any;
  constructor(private httpClient: HttpClient) {}

  updateUserDetails(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROFILE.CHANGE_USER_NAME,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  uploadUserImage(formData: FormData): Observable<any> {
    console.log(formData);

    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROFILE.UPLOAD_USER_PROFILE,
        formData
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateUserPassword(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROFILE.CHANGE_USER_PASSWORD,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
