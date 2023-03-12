import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from 'src/app/utilities/http/api-end-points';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  httpClint: any;
  constructor(private httpClient: HttpClient) {}

  getUserWorkspaces(): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.WORKSPACES.USER_WORKSPACES_LIST,
        {}
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  createUserWorkspace(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.WORKSPACES.WORKSPACES_CREATE,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteWorkspaces(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.WORKSPACES.DELETE_WORKSPACE_BY_ID,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateWorkspace(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.WORKSPACES.UPDATE_WORKSPACE_DETAILS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  inviteMemberToWorkspace(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.WORKSPACES.INVITE_MEMBER,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchWorkspaceMembers(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.WORKSPACES.FETCH_WORKSPACE_MEMBERS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchWorkspacePendingInvitedMembers(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.WORKSPACES.FETCH_PENDING_INVITED_MEMBERS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  removeInvite(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.WORKSPACES.REMOVE_INVITE,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  removeMemberShip(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.WORKSPACES.REMOVE_MEMBERSHIP,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchWorkspaceRole(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.WORKSPACES.FETCH_WORKSPACE_ROLE,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  uploadWorkspaceAvatar(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.WORKSPACES.UPLOAD_AVATAR,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
