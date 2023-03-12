import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonService } from 'src/app/services/common/common.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { Router } from '@angular/router';
import { CrashService } from 'src/app/services/crash/crash.service';

@Component({
  selector: 'app-crashes',
  templateUrl: './crashes.component.html',
  styleUrls: ['./crashes.component.scss'],
})
export class CrashesComponent implements OnInit {
  isChecked: boolean = true;
  crashList: any = [];
  crashSearch: string = '';
  workspace_kuid: string = '';
  project_kuid: string = '';
  page: number = 0;
  crashFilters: any = [];

  totalPages: number = 0;

  constructor(
    public commonService: CommonService,
    private _projectService: ProjectService,
    private _router: Router,
    private _crashService: CrashService
  ) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
    this.getCrashListing();
  }

  openDetails(row: any) {
    // console.log('selected Row=>', row);
    console.log(this.commonService.selectedProject.p_kuid);
    this._router.navigate(['/project/crashes/detail'], {
      queryParams: {
        project: this.commonService.selectedProject.p_kuid,
        workspace: JSON.parse(
          localStorage.getItem('lastVisited_workspace') || '{}'
        ).ws_kuid,
        crash: row.kuid,
      },
    });
  }
  onKeyUp() {
    if (this.crashSearch.length == 5) {
      this.searchCrashData();
    } else if (this.crashSearch.length == 0) {
      this.getCrashListing();
    } else if (this.crashSearch.length > 8) {
      this.searchCrashData();
    }
  }
  showFilterContainer: boolean = false;

  isShowFiltercontainer() {
    console.log('clicked ', this.showFilterContainer);
    this.showFilterContainer = !this.showFilterContainer;
  }

  fetchFilters() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
      }),
    };
    this._crashService.fetchCrashFilters(body).subscribe((res) => {
      console.log('Crash FILTERS=>', res);

      let temp: any = [];
      temp.push({
        name: 'Status',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-status-in-progress.svg',
        values: res.filter[0].values.map((item: any) => {
          if (item.status == 'in_progress') {
            return {
              ...item,
              status: 'In Progress',
              dot: '../../../../../../assets/images/filters/dot-yellow.svg',
              isIcon: true,
            };
          } else if (item.status == 'todo') {
            return {
              ...item,
              status: 'To Do',
              dot: '../../../../../../assets/images/filters/dot-blue.svg',
              isIcon: true,
            };
          } else {
            return {
              ...item,
              status: 'Done',

              dot: '../../../../../../assets/images/filters/dot-green.svg',
              isIcon: true,
            };
          }
        }),
        isApplied: false,
        usedByField_index: '',
      });
      temp.push({
        name: 'Assignee',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-person-add.svg',
        values: res.filter[1].values.map((item: any) => {
          return {
            assignee_kuid: item.kuid,
            assignee_name: item.fullName,
            assignee_description: item.email,
            avatar: '../../../../../../assets/images/avatar.png',
            isIcon: true,
          };
        }),
        isApplied: false,
        usedByField_index: '',
      });
      temp.push({
        name: 'Version',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-release.svg',
        values: res.filter[2].values.map((item: any) => {
          return {
            label: item.env_hostAppVersion,
            isIcon: false,
          };
        }),
        isApplied: false,
        usedByField_index: '',
      });
      temp.push({
        name: 'Operating System',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-shape.svg',
        values: res.filter[4].values.map((item: any) => {
          return {
            label: item.env_deviceOS,
            isIcon: false,
          };
        }),
        isApplied: false,
        usedByField_index: '',
      });

      temp.push({
        name: 'Reportee',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-distribution.svg',
        values: res.filter[4].values.map((item: any) => {
          return {
            assignee_kuid: item.kuid,
            assignee_name: item.fullName,
            assignee_description: item.email,
            avatar: '../../../../../../assets/images/avatar.png',
            isIcon: true,
          };
        }),
        isApplied: false,
        usedByField_index: '',
      });
      temp.push({
        name: 'Date',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-issues.svg',
        values: res.filter[5].values.map((item: any) => {
          return {
            label: new Date(item.createdAt).toLocaleDateString(),
            isIcon: false,
          };
        }),
        isApplied: false,
        usedByField_index: '',
      });

      console.log('After  filters =>', temp);

      this.crashFilters = temp;
    });
  }

  searchCrashData() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
        search_query: this.crashSearch,
        version: [],
        assignees: '',
        pg: 0,
      }),
    };

    this._crashService.crashSearch(body).subscribe((res) => {
      console.log(res);
      let { crashes_list, token } = res;
      localStorage.setItem('token', token);
      this.crashList = crashes_list;
    });
  }

  getCrashListing(): void {
    this.commonService.isLoading = true;
    this._projectService.getProjectCrashListing().subscribe((res) => {
      let { workspace_kuid, project_kuid, token, crashes_list, total } = res;
      localStorage.setItem('token', token);
      console.log('Project Crash List=>', crashes_list);
      this.crashList = crashes_list;
      this.workspace_kuid = workspace_kuid;
      this.project_kuid = project_kuid;
      this.crashList = this.crashList;
      console.log(typeof total);
      if (this.totalPages == 0) {
        this.totalPages = parseInt(total) / crashes_list.length;
      }
      this.commonService.isLoading = false;
      this.fetchFilters();
    });
  }

  onNextPage() {
    if (this.page <= this.totalPages) {
      this.getCrashListing();
      this.page += 1;
    }
  }

  onPreviousPage() {
    console.log(this.page);
    console.log(this.totalPages);
    if (this.page > 0 && this.page <= this.totalPages) {
      this.getCrashListing();
      this.page -= 1;
    } else if (this.page == 0) {
      this.page = 0;
      this.getCrashListing();
    } else {
      this.page -= 1;
    }
  }

  onApplyFilters(event: any) {
    console.log('Event =>', event);
    let filterObject = {
      workspace_kuid: this.workspace_kuid,
      project_kuid: this.project_kuid,
      status: [''],
      assignees: [''],
      version: [''],
      operating_system: '',
      label: '',
      reporter: '',
      pg: this.page,
      date: '',
    };

    event.map((item: any) => {
      if (item.label == 'Status') {
        filterObject = {
          ...filterObject,
          status: [item.value.kuid],
        };
      } else if (item.label == 'Assignee') {
        filterObject = {
          ...filterObject,
          assignees: [item.value.assignee_kuid],
        };
      } else if (item.label == 'Version') {
        filterObject = {
          ...filterObject,
          version: [item.value.label],
        };
      } else if (item.label == 'Operating System') {
        filterObject = {
          ...filterObject,
          operating_system: item.value.label,
        };
      } else if (item.label == 'Bug Titles') {
        filterObject = {
          ...filterObject,
          label: item.value.bugTitle,
        };
      } else if (item.label == 'Reportee') {
        filterObject = {
          ...filterObject,
          reporter: item.value.assignee_description,
        };
      } else if (item.label == 'Date') {
        filterObject = {
          ...filterObject,
          date: item.value.label,
        };
      }
    });

    console.log('Final Object =>', filterObject);
    let body = {
      payload: JSON.stringify(filterObject),
    };
    console.log(body);
    this.commonService.isLoading = true;
    this._crashService.applyCrashFilters(body).subscribe((res) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.crashList = res.crashed_list;
      this.commonService.isLoading = false;
      this.showFilterContainer = false;
    });
  }
}
