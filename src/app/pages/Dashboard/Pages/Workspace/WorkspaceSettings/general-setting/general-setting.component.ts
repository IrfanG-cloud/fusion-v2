import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// services
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss'],
})
export class GeneralSettingComponent implements OnInit {
  showDialog: boolean = false;
  workspace_kuid: string = '';
  workspace: any = '';
  name: string = '';
  icon: string = '';
  url: any = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private cd: ChangeDetectorRef,
    private _workspaceService: WorkspaceService,
    public commonService: CommonService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      let { id } = params;
      console.log(id);
      this.workspace_kuid = id;

      let workspaces = JSON.parse(
        localStorage.getItem('owned_workspaces') || '[]'
      );

      let item = workspaces.filter(checkWorkspace);
      function checkWorkspace(item: any) {
        return item.ws_kuid == id ? item : null;
      }

      this.workspace = item[0];
      this.name = item[0].ws_title;
      this.icon = item[0].ws_avatar;
    });
  }

  showOrHideDialog() {
    this.showDialog = !this.showDialog;
  }

  saveChanges() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        workspace_title: this.name,
        avatar_url: 'temp Url',
      }),
    };
    this.commonService.isLoading = true;
    this._workspaceService.updateWorkspace(body).subscribe((res) => {
      console.log(res);
      this.commonService.isLoading = false;
    });
  }

  upload(event: any) {
    let selectedFile: File = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', selectedFile, selectedFile.name);
    formData.append(
      'payload',
      JSON.stringify({
        workspace_kuid: this.workspace_kuid,
      })
    );
    this._workspaceService.uploadWorkspaceAvatar(formData).subscribe((res) => {
      console.log(res);
      this.url = res.avatar;
    });
  }

  removeImage() {
    this.url = '';
    this.cd.detectChanges();
  }

  deleteWorkspace() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
      }),
    };
    this.commonService.isLoading = true;
    this._workspaceService.deleteWorkspaces(body).subscribe((res) => {
      console.log(res);
      this.commonService.isLoading = false;
      this._location.back();
      //   this.workspace_kuid = '';
      //   window.location.replace('/');
    });
  }
}
