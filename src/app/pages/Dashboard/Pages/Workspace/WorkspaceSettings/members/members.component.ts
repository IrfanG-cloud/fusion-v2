import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace/workspace.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  membersList: any = [];
  pendingMembersList: any = [];
  workspace_kuid: string = '';
  email: string = '';
  isShowInviteDialog: boolean = false;
  workspaceRole: any = [];
  activeTab: number = 1;
  selectedRoleId: string = '';

  filtersOptions: any = [
    {
      id: 1,
      name: 'Members',
    },
    {
      id: 2,
      name: 'Invited',
    },
  ];

  constructor(
    private _workspaceService: WorkspaceService,
    public commonService: CommonService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      let { id } = params;
      console.log(id);
      this.workspace_kuid = id;
    });

    this.fetchMembers();
    this.fetchRoles();
  }

  fetchMembers() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: '',
      }),
    };
    this.commonService.isLoading = true;
    this._workspaceService.fetchWorkspaceMembers(body).subscribe((res) => {
        this.membersList = res.fetchMemberInfo;
        console.log ("member",res)
      //   this.commonService.isLoading = false;
    });
    this._workspaceService
      .fetchWorkspacePendingInvitedMembers(body)
        .subscribe((res) => {
          console.log (res)
        this.pendingMembersList = res.pendingMembers;
        this.commonService.isLoading = false;
      });
  }
  fetchRoles() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
      }),
    };
    this.commonService.isLoading = true;
    this._workspaceService.fetchWorkspaceRole(body).subscribe((res) => {
      this.workspaceRole = res.PriviligedInvitationRoles;
      this.commonService.isLoading = false;
    });
  }

  selectedValue(event: any) {
    console.log('EVENT=>', event.value);
    this.selectedRoleId = event.value;
  }

  showInviteDialog() {
    this.isShowInviteDialog = true;
  }

  hideInviteDialog() {
    this.isShowInviteDialog = false;
  }

  onSelectTab(tab: number) {
    this.activeTab = tab;
  }

  onSendInvite() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        email: this.email,
        role_kuid: this.selectedRoleId,
      }),
    };
    this.commonService.isLoading = true;
    this._workspaceService.inviteMemberToWorkspace(body).subscribe((res) => {
      console.log('After Invite Response=>', res);
      this.commonService.isLoading = false;
      this.isShowInviteDialog = false;
      this.fetchMembers();
    });
  }
  onRemoveInvite(email: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        email: email,
        project_kuid: '',
      }),
    };
    this.commonService.isLoading = true;
    this._workspaceService.removeInvite(body).subscribe((res) => {
      console.log('After Invite Response=>', res);
      this.commonService.isLoading = false;
      this.isShowInviteDialog = false;
      this.fetchMembers();
    });
  }
  onRemoveMemberShip( kuid: string) {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: '',
        member_kuid: kuid,
      }),
    };
    this.commonService.isLoading = true;
    this._workspaceService.removeMemberShip(body).subscribe((res) => {
      console.log('After Remove Member Response=>', res);
      this.commonService.isLoading = false;
      this.fetchMembers();
    });
  }
}
