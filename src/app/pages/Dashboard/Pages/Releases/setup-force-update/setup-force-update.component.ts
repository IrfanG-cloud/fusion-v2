import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-setup-force-update',
  templateUrl: './setup-force-update.component.html',
  styleUrls: ['./setup-force-update.component.scss'],
})
export class SetupForceUpdateComponent implements OnInit {
  tab: number = 21;
  selectedSetup: any = '';
  currentIndex: number = 1;
  selectedType: string = '';
  projectName: string = '';
  selectedTab: string = '';
  projectID: string = '';
  type: string = '';

  selectedVersions: any = [];

  versions = [
    { id: 1, name: 'V2' },
    { id: 2, name: 'V2.3' },
    { id: 3, name: 'V33' },
    { id: 4, name: 'V2.5' },
    { id: 5, name: 'V6' },
  ];
 
  templates: any = [
    {
      id: 1,
      title: 'Update Your App',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
      icon: '',
      isSelected: false,
    },
    {
      id: 2,
      title: 'New Update Found',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
      icon: '',
      isSelected: false,
    },
    {
      id: 3,
      title: 'Update Required',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
      icon: '',
      isSelected: false,
    },
    {
      id: 4,
      title: 'New Version Available',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
      icon: '',
      isSelected: false,
    },
    {
      id: 5,
      title: 'V 5.2 Just Launched',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
      icon: '',
      isSelected: false,
    },
    {
      id: 6,
      title: 'Install Update',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
      icon: '',
      isSelected: false,
    },
  ];

  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
  }

  submit(event: any) {
    console.log('Form Submitted');
    console.log(event);
    this.selectedVersions.push(event.value);
  }

  filtersOptions: any = [
    {
      id: 21,
      name: 'Custom',
      active: '',
    },
    {
      id: 22,
      name: 'Templates',
      active: '',
    },
  ];

  onSelectTab(num: any, name: string) {
    this.tab = num;
  }

  selecttab(tab: any) {
    tab.isSelected = true;
    this.selectedSetup = tab;
  }

  continueToNext(ind: number) {
    if (ind == 2) {
      this.currentIndex = ind;
    } else if (ind == 3) {
      this.currentIndex = ind;
    } else {
      this.currentIndex = ind;
    }
  }

  onSelectType(t: string) {
    this.type = t;
  }
}
