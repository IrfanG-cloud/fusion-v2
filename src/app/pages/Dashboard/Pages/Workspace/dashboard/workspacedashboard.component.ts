import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { DashboardService } from 'src/app/services/workspace/dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: string | number;
  weight: string | number;
  symbol: string;
  edit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 'NIKE Digital - iOS - Beta',
    name: 'iOS',
    weight: 'iOS - app.com.nike',
    symbol: 'Live',
    edit: '',
  },
  {
    position: 'NIKE Digital - iOS - Beta',
    name: 'iOS',
    weight: 'iOS - app.com.nike',
    symbol: 'Live',
    edit: '',
  },
  {
    position: 'NIKE Digital - iOS - Beta',
    name: 'iOS',
    weight: 'iOS - app.com.nike',
    symbol: 'Live',
    edit: '',
  },
  {
    position: 'NIKE Digital - iOS - Beta',
    name: 'iOS',
    weight: 'iOS - app.com.nike',
    symbol: 'Live',
    edit: '',
  },
  {
    position: 'NIKE Digital - iOS - Beta',
    name: 'iOS',
    weight: 'iOS - app.com.nike',
    symbol: 'Live',
    edit: '',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './workspacedashboard.component.html',
  styleUrls: ['./workspacedashboard.component.scss'],
})
export class WorkspaceDashboardComponent implements OnInit {
  isShown: boolean = true;

  tab: number = 1;
  filtersOptions: any = [
    {
      id: 1,
      name: 'All',
      active: '',
    },
    {
      id: 2,
      name: 'Android',
      active: '',
    },
    {
      id: 3,
      name: 'IOS',
      active: '',
    },
  ];
  projects: any;
  selectedProjectPlatform = 'all';
  selectedProjectData: any;
  selectedTab: number = 0;
  workspaceName: string = '';
  activeWorkspace: any = {};
  sharedWorkspaces: any = [];
  ownedWorkspaces: any = [];
  displayType: string = 'grid'; // 'list' or 'grid'

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  dataSource = ELEMENT_DATA;

  constructor(
    public _commonService: CommonService,
    private _dashBoardService: DashboardService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.workspaceMapping();
    this.cd.detectChanges();
  }

  getProjectsOfWorkspace() {
    const body = {
      payload: JSON.stringify({
        workspace_kuid: this.activeWorkspace[0].ws_kuid,
      }), 
    };

    this._commonService.showSideBar = false;
      this._commonService.isLoading = true;
      console.log(
        'this.activeWorkspace.member_role_type',
        this.activeWorkspace[0]
      );
    this._dashBoardService
      .getProjectsObservable(
        body,
        this.activeWorkspace[0].member_role_type == 'owner' ? 'owned' : 'shared'
      )
      .subscribe((res) => {
        console.log('All Projects', res);
        this._commonService.isLoading = false;
        this._commonService.showSideBar = false;

        if (Array.isArray(res)) {
          console.log('inside if');
          this.projects = res;
          localStorage.setItem('projects', JSON.stringify(this.projects));
        } else {
          console.log('Else');
          const { token, workspace_projects } = res;
          this.projects = workspace_projects;
          localStorage.setItem('projects', JSON.stringify(this.projects));
          localStorage.setItem('token', token);
        }
        this._commonService.showSideBar = false;
      });
  }

  workspaceMapping() {
    let lastVisited_workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || ''
    );
    console.log('My Workspace =>', lastVisited_workspace.ws_kuid);
    if (lastVisited_workspace.ws_kuid == '') {
      this._router.navigate(['/workspace/select-workspace']);
    } else {
      console.log('ELSEEEEE');
      let owned_workspaces = JSON.parse(
        localStorage.getItem('owned_workspaces') || '{}'
      );
      let shared_workspaces = JSON.parse(
        localStorage.getItem('shared_workspaces') || '{}'
      );

      console.log('Owned =>', owned_workspaces);
      console.log('Shared =>', shared_workspaces);

      this.ownedWorkspaces = owned_workspaces;
      this.sharedWorkspaces = shared_workspaces;

      console.log('Owned Workspaces=>', this.ownedWorkspaces);
      console.log('Shared Workspaces=>', this.sharedWorkspaces);

      this.activeWorkspace = owned_workspaces.filter((space: any) => {
        return space.ws_kuid === lastVisited_workspace.ws_kuid;
      });
      if (!(this.activeWorkspace.length > 0)) {
        this.activeWorkspace = shared_workspaces.filter((space: any) => {
          return space.ws_kuid === lastVisited_workspace.ws_kuid;
        });
      }
      this.workspaceName =
        this.activeWorkspace[0].ws_title.charAt(0) +
        this.activeWorkspace[0].ws_title.charAt(1);
    }
    this.getProjectsOfWorkspace();
  }

  onSelectTab(num: any, name: string) {
    this.tab = num;
    this.changeSelectedProject(name);
  }

  // async dataMapping() {
  //   this._commonService.isLoading = true;
  //   //First we check the is data already available in the service?
  //   if (this._commonService.isObjectEmpty(this._dashBoardService.projects)) {
  //     this._dashBoardService.sharedSelectedProject.next(null);
  //     let projects = await this._dashBoardService
  //       .getProjectsObservable()
  //       .toPromise();
  //     this._commonService.isLoading = false;
  //     if (!projects) return;
  //     this.projects = projects;
  //     this.selectedProjectPlatform =
  //       this._dashBoardService.selectedProjectPlatform;
  //     this.selectedProjectData =
  //       this._dashBoardService.getSearchedProjectData();
  //   } else {
  //     this.projects = this._dashBoardService.projects;
  //     this.selectedProjectPlatform =
  //       this._dashBoardService.selectedProjectPlatform;
  //     this.selectedProjectData =
  //       this._dashBoardService.getSearchedProjectData();
  //     this._commonService.isLoading = false;
  //   }
  // }

  // When user click on to section project list this function will be called
  changeSelectedProject(plateform: string) {
    if (plateform == undefined || plateform == null) {
      return;
    }
    this.selectedProjectPlatform = plateform;

    if (plateform !== 'All') {
      this.projects = this._dashBoardService.getSearchedProjectData(
        plateform,
        JSON.parse(localStorage.getItem('projects') || '')
      );
    } else {
      this.projects = JSON.parse(localStorage.getItem('projects') || '');
    }
    // this.consoleInfoForTesting()
  }

  // When user search any project through search input
  // searchProjectByName(name: any) {
  //   this._dashBoardService.setSearchedProject('all');
  //   this.selectedProjectPlatform = 'all';
  //   this.selectedProjectData =
  //     this._dashBoardService.setSearchedProjectByName(name);
  // }

  // when user click on project card box tabs
  changeTab(tab: number, index: number) {
    this.selectedProjectData[index]['selectedTab'] = tab;
  }

  openDetails(row: any) {
    console.log('open details =>', row);
    this._commonService.setSelectedProject(row);
    this._router.navigate(['project/home']);
  }

  moveToNextPage(type: string) {
    this._router.navigateByUrl(`dashboard/${type}`);
  }
  onClickListShow(type: string) {
    this.displayType = type;
  }
}
