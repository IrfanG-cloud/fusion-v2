import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public isLoading: boolean = false;
  private showHeader = new BehaviorSubject(true); //new Subject<any>();
  showHeader$ = this.showHeader.asObservable();
  private showProjectSideBar = new BehaviorSubject(true); //new Subject<any>();
  showProjectSideBar$ = this.showProjectSideBar.asObservable();
  public showSideBar = true;
  public selectedProject: any = '';
  public showServerError: boolean = false;

  private showskeleton = new BehaviorSubject(false); //new Subject<any>();
  showskeleton$ = this.showskeleton.asObservable();

  skeletonValue = new BehaviorSubject(false);

  constructor(
    private toastr: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  // showHeader=true
  setHeaderValue(value: any) {
    this.showHeader.next(value);
  }

  setSidebarValue(value: any) {
    this.showProjectSideBar.next(value);
  }

  public isObjectEmpty(object: any) {
    if (Object.keys(object).length != 0) {
      return false;
    }
    return true;
  }

  public clearSelectedProject() {
    if (this._router.url == '/') {
      localStorage.setItem('selectedProject', '');
      this.showSideBar = false;
    }
  }

  public setSelectedProject(data: any) {
    localStorage.setItem('selectedProject', JSON.stringify(data));
    this.selectedProject = data;
    this.setSidebarValue(true);
    this.showSideBar = true;
  }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string) {
    console.log(message, title);

    if (this._router.url.includes('signin')) {
      this.showServerError = true;
    } else {
      this.toastr.error(message, title);
    }
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }

  setSekeletonValue(value: boolean) {
    this.showskeleton.next(value);
  }

  loader = false;
  setLoader(value: boolean) {
    this.loader = value;
  }

  getLoader() {
    return this.loader;
  }
  appVersion = '';
  setVersionForFilterList(appVersion: string) {
    this.appVersion = appVersion;
  }

  getVersionForFilterList() {
    return this.appVersion;
  }

  convertBytesToGb(bytes: any) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let i = 0;
    for (i; bytes > 1024; i++) {
      bytes /= 1024;
    }
    return bytes.toFixed(1) + ' ' + units[i];
  }
}
