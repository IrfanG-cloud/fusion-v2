import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { CommonService } from 'src/app/services/common/common.service';
import { Location } from '@angular/common';
import { CrashService } from 'src/app/services/crash/crash.service';

@Component({
  selector: 'app-crash-detail-view',
  templateUrl: './crash-detail-view.component.html',
  styleUrls: ['./crash-detail-view.component.scss'],
})
export class CrashDetailViewComponent implements OnInit {
  selectedTab: number = 1;
  activeTabs: any = [];
  crashDetails: any = {};
  detailList: any = [];
  activityLogs: any = [];

Activity =[
    {
        value:'MainActivity.kt:37'
    },
]
  compagTestBug = [
    {   id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    }, {
        id:'MainActivity.kt:37',
        value: '0	com.app.testbug.MainActivity.onCreate$lambda-4'
    },
  ]

  tabs: any = [
    {
      id: 1,
      name: 'Info',
      icon: '../../../../assets/icons/group-20-inactive.svg',
      activeicon:'.../../../../assets/icons/icons-bugs-details-active.svg'
    },
    {
      id: 2,
      name: 'Stacktrace',
      icon: '../../../../assets/icons/regular-1-36.svg',
      activeicon:'../../../../assets/icons/regular-1-36-active.svg'

    },
    {
      id: 3,
      name: 'Repro Steps',
      icon: '../../../../assets/icons/repo.svg',
      activeicon:'../../../../assets/icons/icons-bugs-repro-steps-active.svg'

    },
    {
      id: 4,
      name: 'Logs',
      icon: '../../../../assets/icons/logs.svg',
      activeicon:'../../../../assets/icons/icons-bugs-logs-active.svg'

    },
  ];
  tabfilters: any = [
    {
      id: 1,
      label: 'User Action',
    },
    {
      id: 2,
      label: 'Network',
    },
    {
      id: 3,
      label: 'System Events',
    },
  ];

  workspace_kuid: string = '';
  project_kuid: string = '';
  Assignees: any = [];
  statuses: any = [];

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _projectService: ProjectService,
    public commonService: CommonService,
    private _location: Location,
    private _crashService: CrashService
  ) {}
  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
    this._activatedRouter.queryParams.subscribe((params) => {
      let { project, workspace, crash } = params;
      console.log(project, workspace, crash);

      this.getCrashDetails(project, workspace, crash);
      this.fetchAssignee(project, workspace);
      this.fetchResolutionStatuses(project, workspace);
    });
  }

  selectTab(id: number) {
    this.selectedTab = id;
  }

  getCrashDetails(project: string, workspace: string, crash: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: workspace,
        project_kuid: project,
        crash_kuid: crash,
        notification_kuid: '',
      }),
    };


    this.commonService.isLoading = true;
    this._projectService.getProjectCrashDetails(body).subscribe((res) => {
      console.log('Crash Details=>', res);
      let { crash_details, token, workspace_kuid, project_kuid } = res;
      localStorage.setItem('token', token);
      this.workspace_kuid = workspace_kuid;
      this.project_kuid = project_kuid;
      this.commonService.isLoading = false;
      if (crash_details.length != 0) {
        this.crashDetails = crash_details;
        this.activityLogs = JSON.parse(crash_details?.userActivityLogs).events;
        // const st = this.activityLogs;
        // st.replace("/n","<br>")
        console.log('---------------okrrrrrrrrrrrrrrrr',this.activityLogs);
        this.detailList = [
          {
            tag: 'Reporting Sourcce',
            value: crash_details.deviceModel,
          },
          {
            tag: 'App Version',
            value: crash_details.hostAppVersion,
          },
          {
            tag: 'Free Disk',
            value: crash_details.freeDisk,
          },
          {
            tag: 'Platfrom',
            value: crash_details.deviceOS,
          },
          {
            tag: 'ScreenSize',
            value: crash_details.sdkVersionId,
          },
          {
            tag: 'Free Memory',
            value: crash_details.freeMemory,
          },
          {
            tag: 'SDK Version',
            value: crash_details.sdkVersionId,
          },
          {
            tag: 'Batttery Level',
            value: crash_details.batteryLevel,
          },
        ];
      }
    });
  }

  goBack(): void {
    this._location.back();
  }

  onSelectTab(id: number): void {
    this.activeTabs = id;
  }

  searchAssignee($event: any): void {
    $event.stopPropagation();
  }

  fetchAssignee(project: any, workspace: any) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: workspace,
        project_kuid: project,
      }),
    };

    this._crashService.getAssignee(body).subscribe((res) => {
      console.log('Assigness===================>', res);
      let { Assignees, token } = res;
      localStorage.setItem('toke', token);
      this.Assignees = Assignees;
    });
  }
  fetchResolutionStatuses(project: any, workspace: any) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: workspace,
        project_kuid: project,
      }),
    };

    this._crashService.fetchResolationStatus(body).subscribe((res) => {
      console.log('STATUSES===================>', res);
      let { tags, token } = res;
      localStorage.setItem('token', token);
      this.statuses = tags;
    });
  }

  updateAssignee(id: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        bug_kuid: this.crashDetails.kuid,
        project_kuid: this.project_kuid,
        assignee_kuid: id,
      }),
    };
    this.commonService.isLoading = true;
    this._crashService.updateCrashAssignee(body).subscribe((res) => {
      console.log('After Update Assignee =>', res);
      this.commonService.isLoading = false;
      window.location.reload();
    });
  }

  updateStatus(id: number) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        crash_kuid: this.crashDetails.kuid,
        project_kuid: this.project_kuid,
        status_kuid: id.toString(),
      }),
    };
    this.commonService.isLoading = true;

    this._crashService.updateResolationStatus(body).subscribe((res) => {
      console.log('After upadet response =>', res);
      this.commonService.isLoading = false;
      window.location.reload();
    });
  }
  deleteCrash() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        bug_kuid: this.crashDetails.kuid,
        project_kuid: this.project_kuid,
      }),
    };
    this.commonService.isLoading = true;

    this._crashService.deleteBug(body).subscribe((res) => {
      console.log('After upadet response =>', res);

      this.commonService.isLoading = false;
      this._location.back();
    });
    }
    
    
}
