import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss'],
})
export class GeneralSettingComponent implements OnInit {
  title: string = '';
  avatar: string = '';
  workspace_kuid: string = '';
  project_kuid: string = '';
  env: string = '';
  url: any = '';

  constructor(
    private _projectService: ProjectService,
    public commonService: CommonService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.project_kuid = this.commonService.selectedProject.p_kuid;
    this.title = this.commonService.selectedProject.p_title;
    this.env = this.commonService.selectedProject.p_environment;
    this.workspace_kuid = JSON.parse(
      localStorage.getItem('lastVisited_workspace') || '{}'
    ).ws_kuid;
  }

  onUpdateProjectDetails() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
        title: this.title,
        avatar: this.avatar,
      }),
    };
    console.log('Project Details Updated Body:', body);
    this.commonService.isLoading = true;
    this._projectService.updateProjectDetails(body).subscribe((res) => {
      console.log('Api Response=>', res);
      this.commonService.isLoading = false;
    });
  }

  onDeleteProject() {
    let body = {
      payload: JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
      }),
    };
    console.log('Project Details Updated Body:', body);
    this.commonService.isLoading = true;
    this._projectService.deleteProject(body).subscribe((res) => {
      console.log('Api Response=>', res);
      this.commonService.isLoading = false;
    });
  }
  upload(event: any) {
    let selectedFile: File = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', selectedFile, selectedFile.name);
    formData.append(
      'payload',
      JSON.stringify({
        workspace_kuid: this.workspace_kuid,
        project_kuid: this.project_kuid,
      })
    );
    this._projectService.uploadAvatar(formData).subscribe((res) => {
      console.log(res);
      this.url = res.avatar;
    });
  }
}
