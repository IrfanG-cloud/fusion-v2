import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CycleDialogComponent } from '../cycle-dialog/cycle-dialog.component';

@Component({
  selector: 'app-quality-screen-detail',
  templateUrl: './quality-screen-detail.component.html',
  styleUrls: ['./quality-screen-detail.component.scss']
})
export class QualityScreenDetailComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CycleDialogComponent, {
      width: '402px',
      height: '380px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
