import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from 'src/app/utilities/http/api-end-points';

@Injectable({
  providedIn: 'root',
})
export class CrashService {
  constructor(private httpClient: HttpClient) {}
  assignees: any = [];

  getAssignee(body: any): Observable<any> {
    if (this.assignees.length > 0) {
      return this.assignees;
    }

    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.ASSIGNEE.FETCH_ASSIGNEE,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateResolationStatus(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.RESOLUTION_STATUS.UPDATE_CRASH_RESOLUTION_STATUS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchResolationStatus(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.RESOLUTION_STATUS.FETCH_RESOLUTION_STATUSES,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateCrashAssignee(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.ASSIGNEE.UPDATE_ASSIGNEE,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  crashSearch(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.CRASHES.CRASH_SEARCH,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  deleteBug(body: any): Observable<any> {
    return this.httpClient
      .post(environment.workspaceApiUrl + API_ENDPOINTS.BUGS.DELETE_BUG, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  fetchCrashFilters(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.CRASHES.FETCH_FILTERS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  applyCrashFilters(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.CRASHES.APPLY_FILTERS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
