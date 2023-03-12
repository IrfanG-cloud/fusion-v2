import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-force-update',
  templateUrl: './force-update.component.html',
  styleUrls: ['./force-update.component.scss'],
})
export class ForceUpdateComponent implements OnInit {
  releaseList: any = [
    {
      id: '1',
      version: 'V3.0.0',
      modified_on: '12 Jan 2023',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra..',
      update_type: 'optional',
      force_update: false,
    },
    {
      id: '2',
      version: 'V3.0.0',
      modified_on: '12 Jan 2023',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra..',
      update_type: 'mandatory',
      force_update: true,
    },
    {
      id: '3',
      version: 'V3.0.0',
      modified_on: '12 Jan 2023',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra..',
      update_type: 'optional',
      force_update: false,
    },
  ];
  showDialog: boolean = false;
  type: string = '';

  constructor(private _router: Router, public commonService: CommonService) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
  }

  onSelectType(t: string) {
    this.type = t;
  }

  openSetup() {
    this._router.navigate(['/project/force-update/setup-force-update']);
  }
}
