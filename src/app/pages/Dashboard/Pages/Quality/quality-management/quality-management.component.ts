import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CycleDialogComponent } from './cycle-dialog/cycle-dialog.component';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quality-management',
  templateUrl: './quality-management.component.html',
  styleUrls: ['./quality-management.component.scss'],
})
export class QualityManagementComponent implements OnInit {
  public startIntegration: boolean = true;
  public showRatingSetting: boolean = false;
  currentIndex: number = 1;
  //   selectedTab: string = 'android';
//   isShown: boolean = false;



  constructor(public dialog: MatDialog, public commonService: CommonService, public _router:Router) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
  }

  continueToNext(ind: number) {
    this.currentIndex = ind;
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CycleDialogComponent, {
      width: '402px',
      height: '358px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  screenDetail() {
    this._router.navigate(['project/quality-management/quality-screen-detail'])
  }

  openDetails() {
    this._router.navigate(['project/quality-management/quality-screen-detail/screen-test-case'])
  }

   
}
