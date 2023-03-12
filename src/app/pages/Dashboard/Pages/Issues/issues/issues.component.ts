import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Bug } from 'src/app/utilities/models/bug';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ProjectService } from 'src/app/services/project/project.service';
import { BugService } from 'src/app/services/bug/bug.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  todo: any = [];

  done: any = [];

  InProgess: any = [];

  InValid: any = [];

  selectedListData: any = [];
  bugFilters: any = [];

  drop(event: CdkDragDrop<string[]>) {
    console.log(
      'Move item in array =>',
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  tab: number = 1;
  filtersOptions: any = [
    {
      id: 1,
      name: 'All',
      active: '',
    },
    {
      id: 2,
      name: 'To Do',
      active: '',
    },
    {
      id: 3,
      name: 'In Progress',
      active: '',
    },
    {
      id: 4,
      name: 'Resolved',
      active: '',
    },
  ];
  isChecked: boolean = true;
  displayType: string = 'list'; // types: list || canvas
  buglistData: any = [];
  bugSearch: string = '';
  totalPages: number = 0;
  showFilterContainer: boolean = false;

  // Temp data for bug list
  bugsList: any = [
    {
      Description: 'Testing bug reporting feature',
      appPackageId: 'com.o3Interfaces.HostFIApp',
      assigneeKuid: null,
      assigneeName: 'null',
      audioAttachments: null,
      bugTitle: 'Testing Bug features ',
      email: null,
      images: '1669964452363.jpg',
      kuid: 'B365ZAjwdkyNJA5ZKPea33UnSIQfIsxI',
      sr: 2,
      statusName: 'To Do',
      tags: 'null',
      videoAttachments: null,
    },
  ];
  options: any = [
    {
      id: 'xyz1',
      name: 'To Do',
    },
    {
      id: 'xyz2',
      name: 'In Progress',
    },
    {
      id: 'xyz3',
      name: 'Resolved',
    },
  ];

  workspace_kuid: string = '';
  project_kuid: string = '';
  page: number = 0;

  constructor(
    public commonService: CommonService,
    private _projectService: ProjectService,
    private _router: Router,
    private _bugService: BugService
  ) {}

  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('selectedProject') || '{}');
    this.commonService.selectedProject = data;
    this.getBugsListing();
    this.filteredData();
  }

  fetchFilters() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
      }),
    };
    this._bugService.fetchBugFilters(body).subscribe((res) => {
      console.log('BUGS FILTERS=>', res);
      //   let filters = [
      //     {
      //       name: 'Status',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-status-in-progress.svg',
      //       values: [
      //         {
      //           status_kuid: '100',
      //           status_label: 'Todo',
      //           dot: '../../../../../../assets/images/filters/dot-blue.svg',
      //         },
      //         {
      //           status_kuid: '101',
      //           status_label: 'In Progress',
      //           dot: '../../../../../../assets/images/filters/dot-yellow.svg',
      //         },
      //         {
      //           status_kuid: '102',
      //           status_label: 'Done',
      //           dot: '../../../../../../assets/images/filters/dot-green.svg',
      //         },
      //       ],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //     {
      //       name: 'Priority',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-status-in-progress.svg',
      //       values: [
      //         {
      //           status_kuid: '200',
      //           status_label: 'Low',
      //           dot: '../../../../../../assets/images/filters/dot-blue.svg',
      //         },
      //         {
      //           status_kuid: '201',
      //           status_label: 'Medium',
      //           dot: '../../../../../../assets/images/filters/dot-yellow.svg',
      //         },
      //         {
      //           status_kuid: '202',
      //           status_label: 'High',
      //           dot: '../../../../../../assets/images/filters/dot-purple.svg',
      //         },
      //       ],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //     {
      //       name: 'Assignee',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-person-add.svg',
      //       values: [
      //         {
      //           assignee_kuid: '300',
      //           assignee_name: 'Afaq 1',
      //           assignee_description: 'os Engineer',
      //           avatar:
      //             'https://robohash.org/2407:d000:f:75bb:ed38:dbfc:66dd:eee3.png',
      //         },
      //         {
      //           assignee_kuid: '301',
      //           assignee_name: 'Afaq 21',
      //           assignee_description: 'os Engineer',
      //           avatar:
      //             'https://robohash.org/2407:d0:f:75bb:ed38:dbfc:66dd:eee3.png',
      //         },
      //         {
      //           assignee_kuid: '302',
      //           assignee_name: 'Afaq 31',
      //           assignee_description: 'os Engineer',
      //           avatar:
      //             'https://robohash.org/2407:d000:f:75bb:ed38:dbfc:66dd:e3.png',
      //         },
      //       ],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //     {
      //       name: 'Version',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-release.svg',
      //       values: ['2.3.0', '2.3.1', '2.4.0'],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //     {
      //       name: 'Tags',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-label.svg',
      //       values: [
      //         { tag_kuid: '400', tag_name: 'UI Issue' },
      //         { tag_kuid: '401', tag_name: 'Typo error' },
      //         { tag_kuid: '402', tag_name: 'Error' },
      //       ],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //     {
      //       name: 'Operating System',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-shape.svg',
      //       values: [
      //         'Android 6',
      //         'Android 7',
      //         'Android 8',
      //         'Android 9',
      //         'Android 10',
      //       ],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //     {
      //       name: 'Reporter',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-distribution.svg',
      //       values: [
      //         { tag_kuid: '500', tag_name: 'UI Issue' },
      //         { tag_kuid: '501', tag_name: 'Typo error' },
      //         { tag_kuid: '502', tag_name: 'Error' },
      //       ],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //     {
      //       name: 'Date',
      //       icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-issues.svg',
      //       values: ['2022'],
      //       isApplied: false,
      //       usedByField_index: '',
      //     },
      //   ];

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
        name: 'Bug Titles',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-label.svg',
        values: res.filter[3].values.map((item: any) => {
          return {
            ...item,
            isIcon: false,
          };
        }),
        isApplied: false,
        usedByField_index: '',
      });
      temp.push({
        name: 'Reportee',
        icon: '../../../../../../assets/images/filters/i-os-icon-medium-without-padding-distribution.svg',
        values: res.filter[5].values.map((item: any) => {
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
        values: res.filter[6].values.map((item: any) => {
          return {
            label: new Date(item.createdAt).toLocaleDateString(),
            isIcon: false,
          };
        }),
        isApplied: false,
        usedByField_index: '',
      });

      this.bugFilters = temp;
    });
  }

  isShowFiltercontainer() {
    console.log('clicked ', this.showFilterContainer);
    this.showFilterContainer = !this.showFilterContainer;
  }

  filteredData() {
    if (this.tab == 1) {
      this.bugsList = this.buglistData;
    } else if (this.tab == 2) {
      let temp: any = [];
      this.buglistData.forEach((element: any) => {
        if (element.statusName == 'To Do') {
          temp.push(element);
        }
      });
      this.bugsList = temp;
    } else if (this.tab == 3) {
      let temp: any = [];
      this.buglistData.forEach((element: any) => {
        if (element.statusName == 'In Progress') {
          temp.push(element);
        }
      });
      this.bugsList = temp;
    } else if (this.tab == 4) {
      let temp: any = [];
      this.buglistData.forEach((element: any) => {
        if (element.statusName == 'Resolved') {
          temp.push(element);
        }
      });
      this.bugsList = temp;
    }
  }

  onSelectTab(num: any) {
    this.tab = num;
    this.filteredData();
  }

  openDetails(row: any) {
    // console.log('selected Row=>', row);
    this._router.navigate(['/project/issues/detail'], {
      queryParams: {
        project: this.commonService.selectedProject.p_kuid,
        workspace: JSON.parse(
          localStorage.getItem('lastVisited_workspace') || '{}'
        ).ws_kuid,
        bug: row.kuid,
      },
    });
  }

  getBugsListing(): void {
    this.commonService.isLoading = true;
    this._projectService.getProjectBugListing(this.page).subscribe((res) => {
      let { workspace_kuid, project_kuid, token, bug_list, bugs_list, total } =
        res;
      localStorage.setItem('token', token);
      console.log('Project Bug List=>', bug_list || bugs_list);
      this.bugsList = bug_list || bugs_list;
      let temp: any = [];
      this.bugsList.map((item: any) => {
        temp.push({
          ...item,
          isChecked: false,
        });
      });

      this.bugsList = temp;

      this.workspace_kuid = workspace_kuid;
      this.project_kuid = project_kuid;
      this.fetchFilters();
      console.log(typeof total);
      if (this.totalPages == 0) {
        this.totalPages = parseInt(total) / bugs_list.length;
      }
      console.log('Bug List total Pages =>', this.totalPages);

      console.log('My Bug List =>', this.bugsList);
      this.commonService.isLoading = false;

      this.bugsList.forEach((element: any) => {
        if (element.resolutionStatusKuid == 'xyz1') {
          this.todo.push(element);
        } else if (element.resolutionStatusKuid == 'xyz2') {
          this.done.push(element);
        } else {
        }
      });
    });
  }

  changeDisplayTime(type: string) {
    this.displayType = type;
  }

  //   public drop(event: CdkDragDrop<string[]>) {
  // if (this.selectedRatingEnginScreens.inputs) {
  //   moveItemInArray(
  //     this.selectedRatingEnginScreens.inputs,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }
  //   }

  deleteBug(bug: any) {
    console.log(bug);
  }

  onKeyUp() {
    if (this.bugSearch.length == 1) {
      this.searchBugData();
    } else if (this.bugSearch.length == 3) {
      this.searchBugData();
    } else if (this.bugSearch.length == 5) {
      this.getBugsListing();
    } else if (this.bugSearch.length > 8) {
      this.searchBugData();
    }
  }

  searchBugData() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
        search_query: this.bugSearch,
        tags: [],
        assignees: '',
        version: '',
        status: [this.tab],
        pg: 0,
      }),
    };

    this._bugService.bugSearch(body).subscribe((res) => {
      console.log(res);
      let { bugs_list, token } = res;
      localStorage.setItem('token', token);
      this.bugsList = bugs_list;
    });
  }

  onNextPage() {
    if (this.page <= this.totalPages) {
      this.getBugsListing();
      this.page += 1;
    }
  }

  onPreviousPage() {
    console.log(this.page);
    console.log(this.totalPages);
    if (this.page > 0 && this.page <= this.totalPages) {
      this.getBugsListing();
      this.page -= 1;
    } else if (this.page == 0) {
      this.page = 0;
      this.getBugsListing();
    } else {
      this.page -= 1;
    }
  }
  optionValue(event: any) {
    event.stopPropagation();
  }

  onSelectItem(event: any, row: any) {
    let index = this.bugsList.indexOf(row);
    let isExistOrNot = false;

    this.selectedListData.map((item: any) => {
      if (item.kuid == row.kuid) {
        isExistOrNot = true;
        return;
      }
    });

    if (isExistOrNot) {
      this.selectedListData.splice(this.selectedListData.indexOf(row), 1); // remove the object
      this.bugsList[index] = {
        ...this.bugsList[index],
        isChecked: false,
      };
    } else {
      this.selectedListData.push(row); // add the object
      this.bugsList[index] = {
        ...this.bugsList[index],
        isChecked: true,
      };
    }

    event.stopPropagation();
  }
  onSelectAll(event: any) {
    if (this.selectedListData.length == this.bugsList.length) {
      this.selectedListData = [];
    } else {
      this.selectedListData = this.bugsList;
    }
    let temp: any = [];
    this.bugsList.map((item: any) => {
      temp.push({
        ...item,
        isChecked: !item.isChecked,
      });
    });
    this.bugsList = temp;
    event.stopPropagation();
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
    this._bugService.applyBugFilters(body).subscribe((res) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.bugsList = res.bugs_list;
      this.commonService.isLoading = false;
      this.showFilterContainer = false;
    });
  }
}
