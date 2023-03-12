import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-release-listing',
  templateUrl: './release-listing.component.html',
  styleUrls: ['./release-listing.component.scss'],
})
export class ReleaseListingComponent implements OnInit {
  showFilterContainer: boolean = false;
  isShowDialog: boolean = false;
  releaseList: any = [
    {
      id: '1',
      version: 'V3.0.0',
      status: 'Unassigned',
      first_activity: '12 Jan 2022',
      last_activity: '12 Jan 2022',
      bug_reporting: true,
      crash_reporting: false,
      crashes: '12000',
      bugs: '130000',
      downloads: '20k',
      release_date: '12 Feb 2021',
    },
    {
      id: '2',
      version: 'V3.0.0',
      status: 'Unassigned',
      first_activity: '12 Jan 2022',
      last_activity: '12 Jan 2022',
      bug_reporting: false,
      crash_reporting: true,
      crashes: '12000',
      bugs: '130000',
      downloads: '20k',
      release_date: '12 Feb 2021',
    },
  ];
  selectedRow: any = '';
  sidePanelOpen: boolean = false;

  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
  }

  isShowFiltercontainer() {
    this.showFilterContainer = !this.showFilterContainer;
  }

  hideDialog() {
    this.isShowDialog = false;
  }

  showDialog(row: any) {
    this.selectedRow = row.id;
    this.isShowDialog = true;
  }
  onChange(row: any) {
    console.log(row);
  }
  showDetails(row: any) {
    this.selectedRow = row;
    this.sidePanelOpen = true;
  }
}
