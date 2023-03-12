import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration-setting',
  templateUrl: './configuration-setting.component.html',
  styleUrls: ['./configuration-setting.component.scss']
})
export class ConfigurationSettingComponent implements OnInit {
    selectedTab: string = 'android';
    selectedtype: string = 'objective';



  constructor() { }

  ngOnInit(): void {
  }

}
