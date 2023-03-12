import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from './api-end-points';

@Injectable({
  providedIn: 'root'
})
export class IntegrationHttpService {

  constructor(
    private httpClint: HttpClient,

  ) { }

  //jiraIntegration
  jiraIntegration1stApi(requestData: any) {
    return this.httpClint.post(environment.baseApiUrl + API_ENDPOINTS.INTEGRATION.JIRA_BASIC_1ST_URL, requestData)
  }

  jiraIntegration2ndApi(requestData: any) {
    return this.httpClint.post(environment.baseApiUrl + API_ENDPOINTS.INTEGRATION.JIRA_VERIFY_INTEGRATION_URL, requestData)
  }
}
