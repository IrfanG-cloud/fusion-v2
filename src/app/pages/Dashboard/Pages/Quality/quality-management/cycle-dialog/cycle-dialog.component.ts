import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cycle-dialog',
  templateUrl: './cycle-dialog.component.html',
  styleUrls: ['./cycle-dialog.component.scss']
})
export class CycleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CycleDialogComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
}

}
