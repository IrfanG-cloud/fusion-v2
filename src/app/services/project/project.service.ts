import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from 'src/app/utilities/http/api-end-points';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  httpClint: any;
  constructor(private httpClient: HttpClient) {}

  createProject(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.CREATE_PROJECT,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getProjectDetails(): Observable<any> {
    let workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || '{}'
    );
    let project = JSON.parse(localStorage.getItem('selectedProject') || '{}');

    let requestBody = {
      payload: JSON.stringify({
        workspace_kuid: workspace.ws_kuid,
        project_kuid: project.p_kuid,
        pg: 0,
      }),
    };

    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.PROJECT_DETAIL,
        requestBody
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchProjectNotifications(): Observable<any> {
    let workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || '{}'
    );
    let project = JSON.parse(localStorage.getItem('selectedProject') || '{}');

    let requestBody = {
      payload: JSON.stringify({
        workspace_kuid: workspace.ws_kuid,
        project_kuid: project.p_kuid,
      }),
    };

    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROJECTS.FETCH_NOTIFICATIONS,
        requestBody
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getProjectBugListing(page: number): Observable<any> {
    let workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || '{}'
    );
    let project = JSON.parse(localStorage.getItem('selectedProject') || '{}');

    let requestBody = {
      payload: JSON.stringify({
        workspace_kuid: workspace.ws_kuid,
        project_kuid: project.p_kuid,
        pg: page,
      }),
    };

    console.log('User request body', requestBody);

    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROJECTS.PROJECT_BUG_LISTING,
        requestBody
      )
      .pipe(
        map((res) => {
          console.log('API RESPONES=>', res);
          return res;
        })
      );
  }
  getProjectBugDetails(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROJECTS.PROJECT_BUG_DETAILS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  getProjectCrashDetails(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROJECTS.PROJECT_CRASH_DETAILS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateProjectDetails(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROJECTS.UPDATE_PROJECT_DETAILS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  uploadAvatar(formData: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.UPLOAD_AVATAR,
        formData
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  deleteProject(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.DELETE_PROJECT,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getProjectCrashListing(): Observable<any> {
    let workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || '{}'
    );
    let project = JSON.parse(localStorage.getItem('selectedProject') || '{}');

    let requestBody = {
      payload: JSON.stringify({
        workspace_kuid: workspace.ws_kuid,
        project_kuid: project.p_kuid,
        pg: 0,
      }),
    };
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROJECTS.PROJECT_CRASH_LISTING,
        requestBody
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // fetching project tags from backend server
  getProjectTags(): Observable<any> {
    let workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || '{}'
    );
    let project = JSON.parse(localStorage.getItem('selectedProject') || '{}');

    let requestBody = {
      payload: JSON.stringify({
        workspace_kuid: workspace.ws_kuid,
        project_kuid: project.p_kuid,
      }),
    };
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.PROJECT_TAGS,
        requestBody
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  // fetching project statuses  from backend server
  getProjectStatus(): Observable<any> {
    let workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || '{}'
    );
    let project = JSON.parse(localStorage.getItem('selectedProject') || '{}');

    let requestBody = {
      payload: JSON.stringify({
        workspace_kuid: workspace.ws_kuid,
        project_kuid: project.p_kuid,
      }),
    };
    console.log('statuses body  =>', requestBody);
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.PROJECT_STATUSES,
        requestBody
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // invite members to project
  // --------------------------------------
  inviteMember(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl +
          API_ENDPOINTS.PROJECTS.PROJECT_INVITE_MEMBER,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateMemberRole(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.UPDATE_MEMBER_ROLE,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchMembers(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.FETCH_MEMBERS,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  fetchProjectRoles(body: any): Observable<any> {
    return this.httpClient
      .post(
        environment.workspaceApiUrl + API_ENDPOINTS.PROJECTS.PROJECT_USER_ROLE,
        body
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
