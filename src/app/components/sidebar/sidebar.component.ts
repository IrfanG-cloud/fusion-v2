import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    '(window:click)': 'closeMenusOnClick()',
  },
})
export class SidebarComponent implements OnInit {
  @Input() workspaceName = '';
  ownedWorkspaces: any = [];
  sharedWorkspaces: any = [];
  lastVisited_workspace: any = {};
  showWorkspaceDialog: boolean = false;
  isShowUserDialog: boolean = false;

  userWorkspaces: any = [];

  userData: any = {};

  constructor(private _router: Router, private _commonService: CommonService) {}

  ngOnInit(): void {
    this.workspaceMapping();
  }
  closeMenusOnClick() {
    this.showWorkspaceDialog = false;
    this.isShowUserDialog = false;
  }
  workspaceMapping() {
    this.lastVisited_workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || ''
      );
      
      console.log ("Last Visited Workspace =>",this.lastVisited_workspace)

    this.userData = JSON.parse(localStorage.getItem('currentUser') || '');

    this.ownedWorkspaces = JSON.parse(
      localStorage.getItem('owned_workspaces') || '{}'
    );
    this.sharedWorkspaces = JSON.parse(
      localStorage.getItem('shared_workspaces') || '{}'
    );

    console.log('User Workspaces =>', this.ownedWorkspaces);
    console.log('User Workspaces =>', this.sharedWorkspaces);
    this.ownedWorkspaces.map((item: any) => {
      this.userWorkspaces.push(item);
    });
    this.sharedWorkspaces.map((item: any) => {
      this.userWorkspaces.push(item);
    });

    console.log('User Workspaces =>', this.userWorkspaces);
  }

  selectWorkspace(workspace: any) {
    localStorage.setItem('lastVisited_workspace', JSON.stringify(workspace));
    window.location.replace('/');
    this._commonService.showSideBar = false;
  }

  manageWorkspace() {
    //   this._router.navigate(['/workspace/workspace-management']);
    this._router.navigate(
      ['workspace/workspace-management/workspace-settings'],
      {
        queryParams: {
          id: this.lastVisited_workspace.ws_kuid,
        },
      }
    );
  }
  viewAllWorkspaces() {
    this._router.navigate(['/workspace/workspace-management']);
  }
  onCreateNewWorkspace() {
    this._router.navigate(['/workspace/create-workspace']);
  }

  manageProfile() {
    this._router.navigate(['manage-profiile']);
  }
  backToHome() {
    console.log('Back To Home');
    this._router.navigate(['/'], { replaceUrl: true });
  }

  signout(): void {
    localStorage.clear();
    window.location.reload();
  }

  toggleShowWorkspaceDialog(event: any) {
    this.showWorkspaceDialog = !this.showWorkspaceDialog;
    this.isShowUserDialog = false;
    event.stopPropagation();
  }

  counter(i: number) {
    return new Array(i);
  }

  onShowUserDialog(event: any) {
    this.isShowUserDialog = !this.isShowUserDialog;
    this.showWorkspaceDialog = false;
    event.stopPropagation();
  }
}
