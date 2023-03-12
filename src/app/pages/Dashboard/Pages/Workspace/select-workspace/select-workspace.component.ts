import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { WorkspaceService } from './../../../../../services/workspace/workspace.service';

@Component({
  selector: 'app-select-workspace',
  templateUrl: './select-workspace.component.html',
  styleUrls: ['./select-workspace.component.scss'],
})
export class SelectWorkspaceComponent implements OnInit {
  userWorkSpaces: any = [];
  user: any = {};
  selectedWorkspace: any = {};
  error: boolean = false;
  disabled: boolean = false;
  isShowBlur: boolean = false;

  workspaces: any = [
    {
      id: 1,
      name: 'O3 Interfaces',
      members: 23,
    },
    {
      id: 2,
      name: 'O4 Interfaces',
      members: 22,
    },
    {
      id: 3,
      name: 'UBL',
      members: 1000,
    },
  ];

  constructor(
    private _router: Router,
    public _commonService: CommonService,
    private _workspaceService: WorkspaceService
  ) {}

  ngOnInit(): void {
    let data = localStorage.getItem('currentUser');
    if (data) {
      this.user = JSON.parse(data);
    }

    this._commonService.isLoading = true;

    this._workspaceService.getUserWorkspaces().subscribe((res) => {
      let { owned_workspaces, shared_workspaces, lastVisited_workspace } = res;
      console.log('res=>', res);
      localStorage.setItem(
        'owned_workspaces',
        JSON.stringify(owned_workspaces)
      );
      if (shared_workspaces == undefined) {
        localStorage.setItem('shared_workspaces', '[{}]');
      } else {
        localStorage.setItem(
          'shared_workspaces',
          JSON.stringify(shared_workspaces)
        );
      }

      let spaces = res;
      this._commonService.isLoading = false;
      this.userWorkSpaces = spaces;
      if (
        this.userWorkSpaces.owned_workspaces.length > 5 ||
        this.userWorkSpaces.shared_workspaces > 5
      ) {
        this.isShowBlur = true;
      }
      if (lastVisited_workspace.ws_kuid !== '') {
        console.log('User Last Visited Workspace =>', lastVisited_workspace);
        let last = {};
        owned_workspaces.forEach((ele: any) => {
          if (ele.ws_kuid === lastVisited_workspace.ws_kuid) {
            last = ele;
          }
        });
        shared_workspaces.forEach((ele: any) => {
          if (ele.ws_kuid === lastVisited_workspace.ws_kuid) {
            last = ele;
          }
        });

        console.log('Last =>', last);

        if (Object.keys(last).length !== 0) {
          console.log('------------- True --------');
          localStorage.setItem('lastVisited_workspace', JSON.stringify(last));
          this._router.navigate(['/']);
        }
      }
      if (
        !(spaces.owned_workspaces.length > 0) &&
        !(spaces.shared_workspaces.length > 0)
      ) {
        this._router.navigate(['workspace/create-workspace']);
      }
    });
  }

  onContinue(): void {
    if (Object.keys(this.selectedWorkspace).length === 0) {
      this.error = true;
    } else {
      this.error = false;
      localStorage.setItem(
        'lastVisited_workspace',
        JSON.stringify(this.selectedWorkspace)
      );
      this._router.navigate(['/']);
    }
  }

  selectWorkspace($workspace: any): void {
    this.disabled = true;
    this.selectedWorkspace = $workspace;
    // this._router.navigate([''], {
    //   queryParams: { workspace: $workspace.name },
    // });
  }
}
