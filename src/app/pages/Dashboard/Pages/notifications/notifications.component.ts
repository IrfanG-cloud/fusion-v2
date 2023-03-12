import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { ProjectService } from 'src/app/services/project/project.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  filters: any = [
    {
      id: 1,
      title: 'All',
    },
    {
      id: 2,
      title: 'Comments',
    },
    {
      id: 3,
      title: 'Mentions',
    },
  ];
  selectedFilter: number = 1;
  userNotifications: any = [];

  constructor(
    public commonService: CommonService,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
    this.fetchNotifications();
  }

  onApplyFilter(id: number) {
    this.selectedFilter = id;
  }

  fetchNotifications() {
    this.commonService.isLoading = true;
    this._projectService.fetchProjectNotifications().subscribe((res) => {
      let temp = res.notifications.sort(function (a: any, b: any) {
        return b - a;
      });

      let groupedData = temp.reduce(function (acc: any, curr: any) {
        let key: any = new Date(curr.activityTime).toLocaleDateString();
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(curr);
        return acc;
      }, {});

      console.log('group data=>', groupedData);

      let arr = Object.entries(groupedData);

      console.log('My Array=>', arr);
      this.userNotifications = arr;
      this.commonService.isLoading = false;
    });
  }
}
