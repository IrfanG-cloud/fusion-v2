import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-test-case',
  templateUrl: './screen-test-case.component.html',
  styleUrls: ['./screen-test-case.component.scss']
})
export class ScreenTestCaseComponent implements OnInit {
    isShowDialog: boolean = false;
    selectedRow: any = ''; 
     sidePanelOpen: boolean = false;



  constructor() { }

  ngOnInit(): void {
  }

  showDialog() {
   
  }
  showDetails() {
    // this.selectedRow = row;
    this.sidePanelOpen = true;
  }

}
