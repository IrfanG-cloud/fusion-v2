import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss'],
  host: {
    '(window:click)': 'closeMenusOnClick()',
  },
})
export class HeaderbarComponent implements OnInit {
  userData: any = {};
  name: string = '';
  showOptions: boolean = false;
  headerWidth: string = '95vw';
  selectedProject: any = '';
  storageSub = new Subject<any>();
  userNotifications: any = [];
  email: string = '';
  showNotificationContainer: boolean = false;
  showShareContainer: boolean = false;
  projectMembers: any = [];
  newMember: any = {
    email: '',
    role: 'select role',
  };

  options: any = [];
  selectedOption: any = '';

  constructor(
    private _router: Router,
    public commonService: CommonService,
    private cd: ChangeDetectorRef,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    let data = localStorage.getItem('currentUser');
    if (localStorage.getItem('selectedProject') != null) {
      this.fetchData();
    }
    if (data) {
      this.name = JSON.parse(data).fullName;
      this.userData = JSON.parse(data);
    }
    this.cd.detectChanges();
    console.log(localStorage.getItem('selectedProjecct'));
    if (localStorage.getItem('selectedProject') != null) {
      console.log('not NULLL -------------------------------');
      this._projectService.fetchProjectNotifications().subscribe((res) => {
        console.log(res);
        this.userNotifications = res.notifications;
      });
    }
  }

  fetchData() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: JSON.parse(
          localStorage.getItem('lastVisited_workspace') || '{}'
        ).ws_kuid,
        project_kuid: JSON.parse(
          localStorage.getItem('selectedProject') || '{}'
        ).p_kuid,
      }),
    };

    this._projectService.fetchMembers(body).subscribe((res) => {
      console.log('members=>', res);
      this.projectMembers = res.fetchMemberInfo;
    });
    this._projectService.fetchProjectRoles(body).subscribe((res) => {
      console.log('ROLES=>', res);
      this.options = res.PriviligedInvitationRoles;
      this.selectedOption = this.options[0];
    });
  }

  onClick($event: any) {
    this.showOptions = !this.showOptions;

    event?.stopPropagation();
  }

  closeMenusOnClick() {
    this.showOptions = false;
    this.showNotificationContainer = false;
    this.showShareContainer = false;
  }

  toggleShowNotificationContainer(event: any) {
    this.showNotificationContainer = true;
    this.showShareContainer = false;
    event.stopPropagation();
  }
  toggleShareContainer(event: any) {
    this.showShareContainer = true;
    this.showNotificationContainer = false;
    event.stopPropagation();
  }

  onSendInvite() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: JSON.parse(
          localStorage.getItem('lastVisited_workspace') || '{}'
        ).ws_kuid,
        project_kuid: JSON.parse(
          localStorage.getItem('selectedProject') || '{}'
        ).p_kuid,
        email: this.email,
        role_kuid: this.selectedOption.kuid,
      }),
    };
    this._projectService.inviteMember(body).subscribe((res) => {
        console.log(res);
        this.email=''
    });
  }

  onSelectRole(role: any, event: any) {
    this.selectedOption = role;
    event.stopPropagation();
  }

  dropdownValueChanged(event: any) {
    console.log(this.email, event);
    this.newMember = {
      email: this.email,
      role: event.Role,
    };
    this.selectedOption = event;
  }
  dropdownValueChangedUpdate(event: any, row: any) {
    let index = this.projectMembers.indexOf(row);
    this.projectMembers[index].role = event.Role;
    console.log(this.projectMembers[index]);
    console.log(event);

    const body = {
      payload: JSON.stringify({
        member_kuid: this.projectMembers[index].memberKuid,
        access_role_kuid: event.kuid,
        workspace_kuid: JSON.parse(
          localStorage.getItem('lastVisited_workspace') || '{}'
        ).ws_kuid,
        project_kuid: JSON.parse(
          localStorage.getItem('selectedProject') || '{}'
        ).p_kuid,
      }),
    };

    console.log(body);
    this._projectService.updateMemberRole(body).subscribe((res) => {
      console.log('Update member Role =>', res);
    });
  }
}
