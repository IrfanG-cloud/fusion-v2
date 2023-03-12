import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common/common.service';
import { environment } from 'src/environments/environment';
import { EncryptionService } from '../authentication/encryption-service';
import { API_ENDPOINTS } from '../http/api-end-points';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private route: Router,
    private commonService: CommonService,
    private encryptionService: EncryptionService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    //console.log('HTTP Request started');
    const logFormat = 'background: maroon; color: white';

    this.commonService.setLoader(false);
    const errorMessage = '';

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.commonService.setLoader(false);
        this.commonService.isLoading = false;
        const errorMessage = this.setError(error);
        let decryptError: any;
        // console.log('error From Intercepter------>>', error)
        //Temprary condition for Matress API
        if (
          request.url ==
          environment.baseApiUrl + API_ENDPOINTS.CRASHES.MATRICS_URL
        ) {
          return throwError(errorMessage);
        }

        if (error.message == 'try handshake again') {
          this.commonService.showError(
            'Please login to access the content.',
            'Authorization Required!'
          );

          localStorage.clear();
          this.route.navigateByUrl('/account/signin');
          return throwError(errorMessage);
        } else if (typeof error['error'] === 'string') {
          decryptError = this.encryptionService.decrypt(
            error['error'],
            localStorage.getItem('encryptionKey')
          );
        }
        //console.log('This is error from Error intercepttor --->', decryptError);
        switch (error.status) {
          case HttpError.BadRequest:
            this.commonService.showError(
              error.error.message.title,
              error.error.message.description
            );
            // this.commonService.showError(
            //   decryptError['error']['description'],
            //   'Error - ' + decryptError['error']['code']
            // );
            if (this.route.url.includes('/account/signin')) {
              localStorage.clear();
              this.route.navigateByUrl('/account/signin');
            }
            break;

          case HttpError.Unauthorized:
            this.commonService.showError(
              error.error.message.title,
              error.error.message.description
            );
            // this.commonService.showError("Sorry your token is expired !!", "Unauthorized Request")
            console.error('%c Unauthorized 401', logFormat);
            localStorage.clear();
            this.route.navigateByUrl('/account/signin');
            break;

          case HttpError.NotFound:
            this.commonService.showError(
              'Not Found 404 !!',
              'Please check your request'
            );
            console.error('%c Not Found 404', logFormat);
            break;

          case HttpError.TimeOut:
            this.commonService.showError(
              'Please Try Again !!',
              'Request Time is Out'
            );
            console.error('%c TimeOut 408', logFormat);
            break;

          case HttpError.Forbidden:
            this.commonService.showError(
              error.error.message.title,
              error.error.message.description
            );
            // this.commonService.showError(decryptError['error']['description'], "Error - " + decryptError['error']['code'])
            console.error('%c Forbidden 403', logFormat);
            break;

          case HttpError.InternalServerError:
            // this.commonService.showError(decryptError['error']['description'], "Error - " + decryptError['error']['code'])
            console.error('%c big bad 500', logFormat);
            this.commonService.showError(
              'Interval Server Error.',
              'Please Try Again'
            );
            // this.commonService.showSideBar = false;
            break;
          default:
            this.commonService.showError(
              'Something went wrong.',
              'Please Try Again'
            );
            break;
        }
        return throwError(errorMessage);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = error.error.message;
    } else {
      // server side error
      if (error.status !== 0) {
        errorMessage = error.error;
      }
    }
    return errorMessage;
  }
}
export class HttpError {
  static BadRequest = 400;
  static Unauthorized = 503;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
  //   static InternalServerErrorWith503 = 503;
}
