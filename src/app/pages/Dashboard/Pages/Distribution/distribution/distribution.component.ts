import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {
    showFilterContainer: boolean = false;
    sidePanelOpen: boolean = false;


  public showDistribution: boolean = false;
  tab: number = 1;


  constructor() { }

  ngOnInit(): void {
  }

  filtersOptions: any = [
    {
      id: 1,
      name: 'Testers',
      active: '',
    },
    {
      id: 2,
      name: 'Groups',
      active: '',
    },
];

onSelectTab(num: any, name: string) {
    this.tab = num;
    // this.changeSelectedProject(name);
  }

  
  isShowFiltercontainer() {
    console.log('clicked ', this.showFilterContainer);
    this.showFilterContainer = !this.showFilterContainer;
  }

  showDetails() {
    this.sidePanelOpen = true;


  }

  showReleases() {

  }

  showShare() {

  }

}
