import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    usersFeedBack: any = [
        {
            id: 1,
            feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            rating: 2,
            version:'4.0.0'
        },
        {
            id: 2,
            feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            rating: 4,
            version:'4.2.0'
        },
        {
            id: 3,
            feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            rating: 5,
            version:'4.0.1'
        },
        {
            id: 4,
            feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            rating: 3,
            version:'4.2.1'
        },
    ]
  
  selectedProject: any = {};
  constructor(private commonService: CommonService, private _router: Router) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.selectedProject = data;
    this.commonService.selectedProject = data;
  }


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: false,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: '#4684f8',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;
}
