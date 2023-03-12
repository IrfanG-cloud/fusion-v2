import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../authentication/token.service';
import { API_ENDPOINTS } from '../http/api-end-points';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public token: TokenService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url !=
      environment.baseApiUrl + API_ENDPOINTS.HANDSHAKE.TOKEN_REQ_URL
    ) {
      if (
        request.url ==
          environment.workspaceApiUrl +
            API_ENDPOINTS.PROFILE.UPLOAD_USER_PROFILE ||
        request.url ==
          environment.workspaceApiUrl +
            API_ENDPOINTS.WORKSPACES.UPLOAD_AVATAR ||
        request.url ==
          environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.UPLOAD_AVATAR
      ) {
        request = request.clone({
          setHeaders: {
            Authorization: `${this.token.getToken()}`,
          },
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `${this.token.getToken()}`,
            'Content-Type': 'application/json',
            Accept: 'text/plain',
          },
        });
      }
    }

    return next.handle(request);
  }
}
