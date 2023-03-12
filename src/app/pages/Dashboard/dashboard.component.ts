import { ChangeDetectorRef, Component, OnInit, DoCheck } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Project } from 'src/app/utilities/models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    '(window:click)': 'functionToCloseDropDowns()',
  },
})
export class DashboardComponent implements OnInit {
  $showHeaderValue: any;
  $showSideBarValue: any;
  showHeader = false;
  showProjectSiderBar: boolean = false;
  allProjects: any = [];
  workspaceName: string = '';
  picon: string = '';
  selectedProject: any = {};
  tab: number = 1;
  showDropDown: boolean = false;

  sidebarLiElements: any = [
    {
      id: 1,
      title: 'PRODUCT',
      items: [
        {
          id: 11,
          title: 'Issues',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-issues-idle-purewhite.svg',
          active_icon: '../../../assets/icons/issues-active.png',
        },
        {
          id: 12,
          title: 'Crashes',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-crashes-idle-purewhite.svg',
          active_icon: '../../../assets/icons/crashes-active.png',
        },
        {
          id: 13,
          title: 'Feedback Hub',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-rating-engine-idle-purewhite.svg',
          active_icon:
            '../../../assets/icons/icon-s-idebar-rating-engine-active.svg',
        },
      ],
    },
    {
      id: 2,
      title: 'VERSIONS',
      items: [
        {
          id: 21,
          title: 'Force Update',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-distribution-idle-purewhite.svg',
          active_icon:
            '../../../assets/icons/icon-s-idebar-distribution-active.svg',
        },
        {
          id: 22,
          title: 'Version History',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-release-idle-purewhite.svg',
          active_icon: '../../../assets/icons/icon-s-idebar-release-active.svg',
        },
      ],
    },
    {
      id: 3,
      title: 'QUALITY',
      items: [
        {
          id: 31,
          title: 'Test Cycles',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-quality-management-idle-purewhite.svg',
          active_icon:
            '../../../assets/icons/icon-s-idebar-quality-management-active.svg',
        },
        {
          id: 32,
          title: 'Test Cases',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-quality-test-cases-idle-purewhite.svg',
          active_icon:
            '../../../assets/icons/icon-s-idebar-quality-test-cases-active.svg',
        },
        {
          id: 33,
          title: 'Reports',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-issues-idle-purewhite.svg',
          active_icon: '../../../assets/icons/icon-s-idebar-issues-active.svg',
        },
      ],
    },
    {
      id: 4,
      title: 'DISTRIBUTION',
      items: [
        {
          id: 41,
          title: 'Releases',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-releases-active-pure.svg',
          active_icon: '../../../assets/icons/icon-s-idebar-rel-active.svg',
        },
        {
          id: 42,
          title: 'Testers',
          active: '',
          icon: '../../../assets/icons/icon-s-idebar-distribution-idle-purewhite.svg',
          active_icon:
            '../../../assets/icons/icon-s-idebar-distribution-active.svg',
        },
      ],
    },
  ];

  onSelectTab(num: any) {
    this.tab = num;
    if (num == 200) {
      this._router.navigate(['project/home']);
    } else if (num == 11) {
      this._router.navigate(['project/issues']);
    } else if (num == 12) {
      this._router.navigate(['/project/crashes']);
    } else if (num == 21) {
      this._router.navigate(['/project/force-update']);
    } else if (num == 13) {
      this._router.navigate(['/project/rating-engine']);
    } else if (num == 31) {
      this._router.navigate(['/project/quality-management']);
    } else if (num == 32) {
      this._router.navigate(['/project/quality-management/screen-test-case']);
    } else if (num == 22) {
      this._router.navigate(['/project/releases']);
    } else if (num == 41) {
      this._router.navigate(['/project/distribution']);
    } else if (num == 100) {
      this._router.navigate(['/project/project-settings']);
    }
  }

  // * this is for setting selected tab when page runs
  setTab() {
    console.log('active URL=>', this._router.url);
    if (this._router.url.includes('home')) {
      this.tab = 200;
    } else if (this._router.url.includes('issues')) {
      this.tab = 11;
    } else if (this._router.url.includes('crashes')) {
      this.tab = 12;
    } else if (this._router.url.includes('/project/rating-engine')) {
      this.tab = 23;
    } else if (this._router.url.includes('/quality-screen-detail')) {
      this.tab = 31;
    } else if (this._router.url.includes('/project/releases')) {
      this.tab = 22;
    } else if (this._router.url.includes('/project/distribution')) {
      this.tab = 41;
    } else if (this._router.url.includes('/screen-test-case')) {
      this.tab = 32;
    } else if (this._router.url.includes('/project/force-update')) {
      this.tab = 21;
    } else if (this._router.url.includes('/project/project-settings')) {
      this.tab = 100;
    }
  }

  constructor(
    public commonService: CommonService,
    private cd: ChangeDetectorRef,
    private _router: Router
  ) {}

  showDropDownContainer(event: any) {
    this.showDropDown = !this.showDropDown;
    event.stopPropagation();
  }

  onSelectProject(project: any) {
    this.commonService.setSelectedProject(project);
    this.showDropDown = !this.showDropDown;

    window.location.reload();
  }

  functionToCloseDropDowns() {
    this.showDropDown = false;
  }

  ngOnInit() {
    // this.tab = 1;
    this.tab = 200;
    this.setTab();
    this.allProjects = JSON.parse(localStorage.getItem('projects') || '[]');

    console.log('all project =>', this.allProjects);

    this.selectedProject = JSON.parse(
      localStorage.getItem('selectedProject') || '{}'
    );

    // this._router.navigate([
    //   'project-dashboard/project/home/' + this.selectedProject.project_id,
    // ]);
  }
}
