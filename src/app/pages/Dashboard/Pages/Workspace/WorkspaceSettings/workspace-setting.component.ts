import { ChangeDetectorRef, Component, OnInit, DoCheck } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace-setting',
  templateUrl: './workspace-setting.component.html',
  styleUrls: ['./workspace-setting.component.scss'],
})
export class WorkspaceSettingComponent implements OnInit {
  tab: number = 1;
  selectedWorkspace: any = '';
  kuid: any = '';
  sidebarLiElements = [
    {
      id: 1,
      title: 'Workspace Settings',
      icon: '../../../../../../assets/icons/home.png',
      active_icon: '../../../../../../assets/icons/home_active.png',
    },
    {
      id: 2,
      title: 'Members',
      icon: '../../../../../../assets/icons/home.png',
      active_icon: '../../../../../../assets/icons/home_active.png',
    },
    {
      id: 3,
      title: 'Billings',
      icon: '../../../../../../assets/icons/home.png',
      active_icon: '../../../../../../assets/icons/home_active.png',
    },
    
  ];
  constructor(
    public commonService: CommonService,
    private cd: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setTab();
    this._activatedRoute.queryParams.subscribe((params) => {
      let { id } = params;
      console.log(id);
      this.kuid = id;

      let workspaces = JSON.parse(
        localStorage.getItem('owned_workspaces') || '[]'
      );

      let item = workspaces.filter(checkWorkspace);
      function checkWorkspace(item: any) {
        return item.ws_kuid == id ? item : null;
      }
      console.log(
        'muy  sanfjnjf njfnaiug iuiuhd iuad iudsa usa husahgusa giuhsa ug',
        item
      );
      this.selectedWorkspace = item[0];
    });
    this.commonService.showSideBar = false;
  }

  // * this is for setting selected tab when page runs
  setTab() {
    console.log('active URL=>', this._router.url);
    if (this._router.url.includes('general-settings')) {
      this.tab = 1;
    } else if (this._router.url.includes('members')) {
      this.tab = 2;
    } else if (this._router.url.includes('billings')) {
      this.tab = 3;
    } 
  }

  selectTab(num: number) {
    console.log('select tab:' + num);
    this.tab = num;
    if (num == 1) {
      this._router.navigate(
        ['/workspace/workspace-management/workspace-settings/general-settings'],
        {
          queryParams: {
            id: this.kuid,
          },
        }
      );
    } else if (num == 2) {
      this._router.navigate(
        ['/workspace/workspace-management/workspace-settings/members'],
        {
          queryParams: {
            id: this.kuid,
          },
        }
      );
    } else if (num == 3) {
      this._router.navigate(
        ['/workspace/workspace-management/workspace-settings/billings'],
        {
          queryParams: {
            id: this.kuid,
          },
        }
      );
    } 
  }
}
