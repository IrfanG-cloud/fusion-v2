import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from 'src/app/utilities/http/api-end-points';

@Injectable({
  providedIn: 'root',
})
export class BugService {
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
          API_ENDPOINTS.RESOLUTION_STATUS.UPDATE_RESOLUTION_STATUS,
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
  updateBugAssignee(body: any): Observable<any> {
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
  bugSearch(body: any): Observable<any> {
    return this.httpClient
      .post(environment.workspaceApiUrl + API_ENDPOINTS.BUGS.BUG_SEARCH, body)
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
  submitComment(body: any): Observable<any> {
    return this.httpClient
      .post(environment.workspaceApiUrl + API_ENDPOINTS.BUGS.POST_COMMENT, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchComment(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.BUGS.FETCH_COMMENT,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchBugFilters(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.BUGS.FETCH_BUG_FILTERS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  applyBugFilters(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.BUGS.APPLY_BUG_FILTERS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
