import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { EncryptionService } from 'src/app/utilities/authentication/encryption-service';
import { Project } from 'src/app/utilities/models/project';
import { API_ENDPOINTS } from 'src/app/utilities/http/api-end-points';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    public _commonService: CommonService,
    public _router: Router,
    private httpClint: HttpClient,
    private encryptionService: EncryptionService
  ) {}
  public tempArray: any = [];
  getProjectsObservable(body: any, type: string): Observable<any> {
    if (!this.tempArray) {
      return this.tempArray;
    }

    let endPorint =
      type == 'owned'
        ? API_ENDPOINTS.PROJECTS.PROJECT_LIST_OWNED
        : API_ENDPOINTS.PROJECTS.PROJECT_LIST_SHARED;

    console.log('API END POINT TYPE=>', type);
    return this.httpClint
      .post(environment.workspaceApiUrl + endPorint, body)
      .pipe(
        map((res) => {
          this.tempArray = res;
          return res;
        })
      );
  }

  getSearchedProjectData(platform: string, data: any) {
    return data.filter((ele: any) => {
      return ele.p_platformType == platform.toLocaleLowerCase();
    });
  }
}
