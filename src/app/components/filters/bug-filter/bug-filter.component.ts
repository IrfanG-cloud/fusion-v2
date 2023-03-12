import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  platformCore,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { ProjectService } from 'src/app/services/project/project.service';
@Component({
  selector: 'app-bug-filter',
  templateUrl: './bug-filter.component.html',
  styleUrls: ['./bug-filter.component.scss'],
})
export class BugFilterComponent implements OnInit {
  @Input() showFilterContainer: boolean = false;
  @Input() filters: any = [];
  @ViewChild('inputcont') inputcont!: ElementRef;
  @Output() onApplyFilters = new EventEmitter();

  inputCount = 1;
  selected: any = [];
  filteredSelected: any = [];

  //   filters = [
  //     {
  //       name: 'Status',
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-status-in-progress.svg',
  //       values: [
  //         { status_kuid: '100', status_label: 'Todo', dot:'../../../../assets/images/filters/dot-blue.svg'},
  //         { status_kuid: '101', status_label: 'In Progress', dot:'../../../../assets/images/filters/dot-yellow.svg'},
  //         { status_kuid: '102', status_label: 'Done',  dot:'../../../../assets/images/filters/dot-green.svg'},
  //       ],
  //       isApplied: false,
  //       usedByField_index: '',
  //     },
  //     {
  //       name: 'Priority',
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-status-in-progress.svg',
  //       values: [
  //         { status_kuid: '200', status_label: 'Low', dot:'../../../../assets/images/filters/dot-blue.svg'},
  //         { status_kuid: '201', status_label: 'Medium', dot:'../../../../assets/images/filters/dot-yellow.svg' },
  //         { status_kuid: '202', status_label: 'High', dot:'../../../../assets/images/filters/dot-purple.svg' },
  //       ],
  //       isApplied: false,
  //       usedByField_index: '',
  //     },
  //     {
  //       name: 'Assignee',
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-person-add.svg',
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
  //           avatar: 'https://robohash.org/2407:d0:f:75bb:ed38:dbfc:66dd:eee3.png',
  //         },
  //         {
  //           assignee_kuid: '302',
  //           assignee_name: 'Afaq 31',
  //           assignee_description: 'os Engineer',
  //           avatar: 'https://robohash.org/2407:d000:f:75bb:ed38:dbfc:66dd:e3.png',
  //         },
  //       ],
  //       isApplied: false,
  //       usedByField_index: '',
  //     },
  //     {
  //       name: 'Version',
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-release.svg',
  //       values: ['2.3.0', '2.3.1', '2.4.0'],
  //       isApplied: false,
  //       usedByField_index: '',
  //     },
  //     {
  //       name: 'Tags',
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-label.svg',
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
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-shape.svg',
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
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-distribution.svg',
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
  //       icon: '../../../../assets/images/filters/i-os-icon-medium-without-padding-issues.svg',
  //       values: ['2022'],
  //       isApplied: false,
  //       usedByField_index: '',
  //     },
  //   ];

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private _projectService: ProjectService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    console.log('My Filters ', this.filters);
  }

  filterValue(state: any) {
    console.log('----------->sate', state);
    let temp = state.value;
    //   let temp = this.filters[state.target.value];
    this.selected.push(temp);
    console.log('----------->temp', temp);
    //   console.log('----------->temp.selected', this.selected.push(temp());
  }

  filteredChangess(state2: any, index: number) {
    this.filteredSelected.push({
      label: this.selected[index].name,
      value: state2.value,
    });
    console.log('Selected Filter Value =>', this.filteredSelected);
  }

  addInput() {
    if (this.inputCount > 8) {
      alert('you can add maximum 8 filters ');
    } else {
      this.inputCount++;
    }
    return this.inputCount;
  }

  removeInput(ind: number) {
    if (ind != 0) {
      let removedObject = this.filteredSelected.splice(ind, 1);
      console.log('remove=>', this.filteredSelected);
      this.inputCount--;
    }
  }

  onApply() {
    console.log('onApply');
    this.onApplyFilters.emit(this.filteredSelected);
  }
}
