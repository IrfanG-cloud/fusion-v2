import { ChangeDetectorRef, Component, OnInit, DoCheck } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss'],
})
export class ProjectSettingComponent implements OnInit {
  tab: number = 1;
  sidebarLiElements = [
    {
      id: 1,
      title: 'General Settings',
      icon: '../../../../../../assets/icons/home.png',
      active_icon: '../../../../../../assets/icons/home_active.png',
    },
    {
      id: 2,
      title: 'Integrations',
      icon: '../../../../../../assets/icons/home.png',
      active_icon: '../../../../../../assets/icons/home_active.png',
    },
    {
        id:5,
        title: 'Configuration',
        icon: '../../../../../../assets/icons/home.png',
        active_icon: '../../../../../../assets/icons/home_active.png',
    }
  ];
  constructor(
    public commonService: CommonService,
    private cd: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit() {
    this.setTab();
      console.log('URL=>', this._router.url);
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
  }

  // * this is for setting selected tab when page runs
  setTab() {
    console.log('active URL=>', this._router.url);
    if (this._router.url.includes('general-settings')) {
      this.tab = 1;
    } else if (this._router.url.includes('integrations')) {
      this.tab = 2;
    } else if (this._router.url.includes('notifications')) {
      this.tab = 3;
    } else if (this._router.url.includes('trash')) {
      this.tab = 4;
    } else if (this._router.url.includes('configuration')) {
        this.tab = 5;
    }
  }

  selectTab(num: number) {
    console.log('select tab:' + num);
    this.tab = num;
    if (num == 1) {
      this._router.navigate(['/project/project-settings/general-settings']);
    } else if (num == 2) {
      this._router.navigate(['/project/project-settings/integrations']);
    } else if (num == 3) {
      this._router.navigate(['/project/project-settings/notifications']);
    } else if (num == 4) {
      this._router.navigate(['/project/project-settings/trash']);
    } else if (num == 5) {
      this._router.navigate(['/project/project-settings/configuration'])  
    }

  }
}
