import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewproject',
  templateUrl: './addnewproject.component.html',
  styleUrls: ['./addnewproject.component.scss'],
})
export class AddnewprojectComponent implements OnInit {
  selectedTab: string = '';
  selectedType: string = ''
  currentIndex: number = 1;
  selectedtype: string = 'objective';
  projectName: string = '';
  projectID: string = '';
  workspaceid: string = '';
  type: string = '';


  constructor(
    public _commonService: CommonService,
    private _projectService: ProjectService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.workspaceMapping();
    this._commonService.showSideBar = false;
  }

  selecttab(tab: string) {
    this.selectedType = tab;
  }
  onSelectType(tab: string) {
    this.selectedTab = tab;
  }

  selectSandbox(sandbox:any) {
    this.type = sandbox
    
  }

  workspaceMapping() {
    let lastVisited_workspace = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || ''
    );
    if (lastVisited_workspace != '') {
      this.workspaceid = lastVisited_workspace.ws_kuid;
    } else {
      this._router.navigate(['/workspace/select-workspace']);
    }
  }

  continueToNext(ind: number) {
    if (ind==2){
        if (this.selectedType!==''){
            this.currentIndex=ind;
        }
    }else if (ind==3){
        if (this.selectedTab!==''){
            this.currentIndex=ind;
        }
    }else if (ind==4 ){
        if (this.projectName!=='' && this.projectID!=='' && this.type!=''){
            this.currentIndex=ind;
        }
    }else{
        this.currentIndex=ind;
    }


    // if (ind ) {
    //     if(this.selectedType!= '' ) {
    //         this.currentIndex = ind;
    //     }
    // }
    // else if (this.selectedTab!='') {
    //     this.currentIndex = ind;
    // }
    // else if (this.projectName != '' && this.projectID != '') {
    //     this.currentIndex = ind;
    // }
    // else if (this.selectedtype!='') {
    //     this.currentIndex = ind;
    // }
    // else {
    //     this.currentIndex = ind;
    // }

}

  onFinish() {
    const body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspaceid,
        project_title: this.projectName,
        app_id_identifier: this.projectID,
        platformType: this.selectedTab,
        environment: 'sandbox',
      }),
    };

    this._commonService.isLoading = true;
    this._projectService.createProject(body).subscribe((res) => {
      console.log('After Response =>', res);
      this._commonService.isLoading = false;
      this._router.navigate(['']);
    });
  }
}
