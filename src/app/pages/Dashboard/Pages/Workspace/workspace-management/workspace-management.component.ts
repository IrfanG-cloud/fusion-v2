import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';

@Component({
  selector: 'app-workspace-management',
  templateUrl: './workspace-management.component.html',
  styleUrls: ['./workspace-management.component.scss'],
})
export class WorkspaceManagementComponent implements OnInit {
  workspaces: any = [];
  tab: number = 1;
  filtersOptions: any = [
    {
      id: 1,
      name: 'All',
      active: '',
    },
    {
      id: 2,
      name: 'My Workspaces',
      active: '',
    },
    {
      id: 3,
      name: 'Shared',
      active: '',
    },
  ];

  constructor(
    public commonService: CommonService,
    private _workspaceService: WorkspaceService
  ) {}

  ngOnInit(): void {
    this.commonService.showSideBar = false;
    this.getUserWorkspaces();
  }

  onSelectTab(num: any, name: string) {
    this.tab = num;
    // this.changeSelectedProject(name);
  }

  getUserWorkspaces() {
    this.commonService.isLoading = true;
    this._workspaceService.getUserWorkspaces().subscribe((res) => {
      console.log('User workspaces =>', res);
        this.workspaces = res.owned_workspaces;
        res.shared_workspaces.map((item: any )=> {
            this.workspaces.push(item)
        })
      this.commonService.isLoading = false;
    });
  }
}
