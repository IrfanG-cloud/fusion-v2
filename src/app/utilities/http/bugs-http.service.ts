import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_ENDPOINTS } from './api-end-points';

@Injectable({
  providedIn: 'root'
})
export class BugsHttpService {

  constructor(
    private httpClint: HttpClient,

  ) { }

  getSingleBug(requestData: any) {
    return this.httpClint.post(environment.baseApiUrl + API_ENDPOINTS.BUGS.SINGLE_BUG_URL, requestData)
  }

  getAttachments(url: string) {
    return this.httpClint.get(environment.downloadImageApiUrl + url);
  }

  sendMessageToSlack(data: any) {
    const headers = new HttpHeaders()
    headers.append('Content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers.append('Access-Control-Allow-Methods', 'POST');
    return this.httpClint.post('https://hooks.slack.com/services/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', JSON.stringify({ "text": "data" }), { headers: headers })
  }
}
