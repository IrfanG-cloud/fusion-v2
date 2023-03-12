import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { CommonService } from 'src/app/services/common/common.service';
@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss'],
})
export class CreateWorkspaceComponent implements OnInit {
  title: string = '';
  constructor(
    private _router: Router,
    private _workspaceService: WorkspaceService,
    public _commonService: CommonService
  ) {}

  ngOnInit(): void {}

  createWorkspace() {
    this.title.replace(/\s/g, '');
    console.log(this.title);
    const payload = {
      payload: JSON.stringify({
        workspace_title: this.title,
      }),
    };
    this._commonService.isLoading = true;
    this._workspaceService.createUserWorkspace(payload).subscribe((res) => {
      console.log('after res', res);
      let {
        token,
        owned_workspaces,
        shared_workspaces,
        lastVisited_workspace,
      } = res;
      localStorage.setItem('token', token);
      localStorage.setItem(
        'owned_workspaces',
        JSON.stringify(owned_workspaces)
      );
      localStorage.setItem(
        'shared_workspaces',
        JSON.stringify(shared_workspaces)
      );
      localStorage.setItem(
        'lastVisited_workspace',
        JSON.stringify(lastVisited_workspace)
      );
      this._router.navigate(['/']);
      this._commonService.isLoading = false;
    });
  }
}
