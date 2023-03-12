import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';

// services
import { ProjectService } from 'src/app/services/project/project.service';
import { CommonService } from 'src/app/services/common/common.service';
import { BugService } from 'src/app/services/bug/bug.service';

@Component({
  selector: 'app-bug-detail-view',
  templateUrl: './bug-detail-view.component.html',
  styleUrls: ['./bug-detail-view.component.scss'],
  host: {
    '(window:click)': 'functionToCloseDropDowns()',
  },
})
export class BugDetailViewComponent implements OnInit {
  wave: any = '';
  showPause: boolean = false;
  Assignees: any = [];
  workspace_kuid: string = '';
  project_kuid: string = '';
  comment: string = '';
  index: number = 0;
  myJson: any = JSON.stringify(
    {
      data: {
        x: '1',
        y: '1',
        url: 'http://test.com',
      },
      event: 'start',
      show: 1,
      id: 50,
    },
    null,
    2
  );

  url =
    'https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3';

  showSidePanel: boolean = false;
  elementRef: any;
  showStatusDropDown: boolean = false;
  showPriortyDropDown: boolean = false;
  showAssigneDropDown: boolean = false;

  functionToCloseDropDowns() {
    this.showPriortyDropDown = false;
    this.showStatusDropDown = false;
    this.showAssigneDropDown = false;
  }
  generateWaveform(): void {
    Promise.resolve(null).then(() => {
      this.wave = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#4684f8',
        progressColor: 'grey',
        height: 50,
      });
      this.wave.on('ready', () => {
        // alert("I'm ready");
        this.wave.play();
      });
    });
  }

  onPreviewPressed(): void {
    if (!this.wave) {
      this.generateWaveform();
    }
    this.showPause = true;

    this.cdr.detectChanges();

    Promise.resolve().then(() =>
      this.wave.load(this.bugDetails.audioAttachments)
    );
  }

  onStopPressed(): void {
    this.wave.stop();
    this.showPause = false;
  }

  bugDetails: any = {};
  progress: any = [
    { value: 'inprogress', viewValue: 'In Progress' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'completed', viewValue: 'Completed' },
  ];

  tabs: any = [
    {
      id: 1,
      name: 'Details',
      icon: '../../../../assets/icons/group-20-inactive.svg',
      activeicon: '../../../../assets/icons/icons-bugs-details-active.svg',
    },
    {
      id: 2,
      name: 'Repo Steps',
      icon: '../../../../assets/icons/repo.svg',
      activeicon: '../../../../assets/icons/icons-bugs-repro-steps-active.svg',
    },
    {
      id: 3,
      name: 'Activity History',
      icon: '../../../../assets/icons/activity.svg',
      activeicon:
        '../../../../assets/icons/icons-bugs-activity-history-active.svg',
    },
    {
      id: 4,
      name: 'Console Logs',
      icon: '../../../../assets/icons/icons-bugs-logs-idle.svg',
      activeicon: '../../../../assets/icons/icons-bugs-logs-active.svg',
    },
  ];

  activeTabs: any = [];
  allActivitiesLog: any = [];

  tabfilters: any = [];

  detailList: any = [];
  activityLogs: any = [];
  statuses: any = [];
  allComments: any = [];

  selectedTab: number = 1;

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _projectService: ProjectService,
    public commonService: CommonService,
    private _location: Location,
    private cdr: ChangeDetectorRef,
    private _bugService: BugService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
    this._activatedRouter.queryParams.subscribe((params) => {
      let { project, workspace, bug } = params;
      console.log(project, workspace, bug);
      this.getBugDetails(project, workspace, bug);
      this.fetchAssignee(project, workspace);
      this.fetchResolutionStatuses(project, workspace);
    });
  }

  selectTab(id: number) {
    this.selectedTab = id;
  }

  onShowStatusDropDown(event: any) {
    this.showStatusDropDown = !this.showStatusDropDown;
    event.stopPropagation();
    this.showAssigneDropDown = false;
    this.showPriortyDropDown = false;
  }
  onShowPriortyDropDown(event: any) {
    this.showPriortyDropDown = !this.showPriortyDropDown;
    event.stopPropagation();
    this.showStatusDropDown = false;
    this.showAssigneDropDown = false;
  }
  onShowAssigneDropDown(event: any) {
    this.showAssigneDropDown = !this.showAssigneDropDown;
    event.stopPropagation();
    this.showStatusDropDown = false;
    this.showPriortyDropDown = false;
  }

  getBugDetails(project: string, workspace: string, bug: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: workspace,
        project_kuid: project,
        bug_kuid: bug,
        notification_kuid: '',
      }),
    };

    this.commonService.isLoading = true;
    this._projectService.getProjectBugDetails(body).subscribe((res) => {
      let { bug_details, project_kuid, token, workspace_kuid } = res;
      localStorage.setItem('token', token);
      this.commonService.isLoading = false;
      this.workspace_kuid = workspace_kuid;
      this.project_kuid = project_kuid;

      this.bugDetails = bug_details;
      this.onFetchComments(project, workspace);

      console.log('--------------------- HEHEHHEEHHE ', this.bugDetails);

      let tempActivities = JSON.parse(bug_details.userActivityLogs).events;

      console.log('Activities Logs for temp =>', tempActivities);

      tempActivities.forEach((ele: any) => {
        //   ------------------------------------------------
        console.log(
          'item exit or not =>',
          this.tabfilters.some(
            (i: any) => i.label == ele.eventType.replace('_', ' ')
          )
        );

        if (
          !this.tabfilters.some(
            (i: any) => i.label == ele.eventType.replace('_', ' ')
          ) ||
          this.tabfilters.length === 0
        )
          this.tabfilters.push({
            id: this.tabfilters.length + 1,
            label: ele.eventType.replace('_', ' '),
            isActive: true,
          });

        //   -------------------------------------------------
        this.activityLogs.push({
          ...ele,
          payLoad: JSON.parse(ele.payLoad),
        });
      });

      this.allActivitiesLog = this.activityLogs;
      console.log('Actitivies =>', this.activityLogs);

      this.detailList = [
        {
          tag: 'Reporting Sourcce',
          value: bug_details.deviceModel,
        },
        {
          tag: 'App Version',
          value: bug_details.hostAppVersion,
        },
        {
          tag: 'Free Disk',
          value: bug_details.freeDisk,
        },
        {
          tag: 'Platfrom',
          value: bug_details.deviceOS,
        },
        {
          tag: 'ScreenSize',
          value: bug_details.sdkVersionId,
        },
        {
          tag: 'Free Memory',
          value: bug_details.freeMemory,
        },
        {
          tag: 'SDK Version',
          value: bug_details.sdkVersionId,
        },
        {
          tag: 'Batttery Level',
          value: bug_details.batteryLevel,
        },
      ];
    });
  }

  goBack(): void {
    this._location.back();
  }

  onSelectTab(id: number): void {
    let tempArray: any = [];
    this.tabfilters.forEach((tab: any) => {
      let temp = tab;
      if (tab.id === id) {
        temp.isActive = !tab.isActive;
      }

      tempArray.push(temp);
    });
    this.tabfilters = tempArray;
    this.onChangeTabFilterData();
  }

  onChangeTabFilterData(): void {
    let tempActivities = this.allActivitiesLog;
    let temp: any = [];
    this.tabfilters.forEach((tabFilter: any) => {
      tempActivities.forEach((element: any) => {
        if (
          element.eventType.replace('_', ' ') == tabFilter.label &&
          tabFilter.isActive
        ) {
          temp.push(element);
        }
      });
    });

    console.log('Temp=>', temp);
    this.activityLogs = temp;
  }

  searchAssignee($event: any): void {
    $event.stopPropagation();
  }

  /* Set the width of the sidebar to 250px (show it) */
  openNav(ind: number) {
    this.index = ind;
    this.showSidePanel = true;
    // this.document.getElementById('mySidepanel').style.width = '250px';
  }

  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    this.showSidePanel = false;
    // this.document.getElementById('mySidepanel').style.width = '0';
  }

  fetchAssignee(project: any, workspace: any) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: workspace,
        project_kuid: project,
      }),
    };

    this._bugService.getAssignee(body).subscribe((res) => {
      console.log('Assigness===================>', res);
      let { Assignees, token } = res;
      localStorage.setItem('token', token);
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

    this._bugService.fetchResolationStatus(body).subscribe((res) => {
      console.log('STATUSES===================>', res);
      let { tags, token } = res;
      localStorage.setItem('token', token);
      this.statuses = tags;
    });
  }

  updateBugAssignee(id: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        bug_kuid: this.bugDetails.kuid,
        project_kuid: this.project_kuid,
        assignee_kuid: id,
      }),
    };
    this.commonService.isLoading = true;
    this._bugService.updateBugAssignee(body).subscribe((res) => {
      console.log('After Update Assignee =>', res);
      this.commonService.isLoading = false;
      window.location.reload();
      this.showAssigneDropDown = false;
    });
  }

  updateBugStatus(id: number, name: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        bug_kuid: this.bugDetails.kuid,
        project_kuid: this.project_kuid,
        bugResolutionStatus_kuid: id.toString(),
      }),
    };
    this.commonService.isLoading = true;

    this._bugService.updateResolationStatus(body).subscribe((res) => {
      console.log('After upadet response =>', res);
      this.commonService.isLoading = false;
      //   window.location.reload();
      this.showStatusDropDown = false;
      this.bugDetails.status = name;
    });
  }
  deleteBug() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        bug_kuid: this.bugDetails.kuid,
        project_kuid: this.project_kuid,
      }),
    };
    this.commonService.isLoading = true;

    this._bugService.deleteBug(body).subscribe((res) => {
      console.log('After upadet response =>', res);

      this.commonService.isLoading = false;
      this._location.back();
    });
  }
  mention: any = 'test';

  onPostComment() {
    if (this.comment == '') {
      return;
    }
    let data = localStorage.getItem('currentUser');

    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
        issueType: 'bug',
        issueKuid: this.bugDetails.kuid,
        userKuids: [JSON.parse(data || '').kuid],
        comment: this.comment,
      }),
    };

    console.log(body);

    this.commonService.isLoading = true;
    this._bugService.submitComment(body).subscribe((res) => {
      console.log(res);

      let { token, message } = res;
      localStorage.setItem('token', token);

      if (message == 'success') {
        this.comment = '';
        this.onFetchComments(this.project_kuid, this.workspace_kuid);
      }
      this.commonService.isLoading = false;
    });
  }
  onFetchComments(project: string, workspace: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: workspace,
        project_kuid: project,
        issueType: 'bug',
        issueKuid: this.bugDetails.kuid,
      }),
    };

    console.log('comments', body);

    this.commonService.isLoading = true;
    this._bugService.fetchComment(body).subscribe((res) => {
      console.log('Fetch Comments=>', res);
      let { token, comments } = res;
      localStorage.setItem('token', token);
      this.allComments = comments;
      this.commonService.isLoading = false;
    });
  }

  detectMention() {
    const regex = /@[a-zA-Z0-9]+/g;
    const match = this.comment.match(regex);
    if (match) {
      this.mention = match[0].slice(1);
      console.log(this.mention);
    } else {
      this.mention = null;
    }
  }
}
