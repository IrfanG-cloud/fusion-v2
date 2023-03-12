import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-manage-profile-setting',
  templateUrl: './manage-profile-setting.component.html',
  styleUrls: ['./manage-profile-setting.component.scss'],
})
export class ManageProfileSettingComponent implements OnInit {
  currentUser: any = {};
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  userImage: string = '';

  constructor(
    private _profileService: ProfileService,
    public commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.showSideBar = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    let name = this.currentUser.fullName.split(' ');
    this.firstName = name[0];
    for (let i = 1; i < name.length; i++) {
      this.lastName += name[i] + ' ';
    }
    this.email = this.currentUser.email;
    this.userImage = this.currentUser.avatar;
    console.log(this.userImage);
  }

  upload(event: any) {
    let selectedFile: File = <File>event.target.files[0];
    console.log('Selected File=>', selectedFile);
    const formData = new FormData();
    formData.set('profilePicture', selectedFile);

    // Check if the file is in the FormData object
    if (formData.has('profilePicture')) {
      console.log('File is present in the FormData object');
      this._profileService.uploadUserImage(formData).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log('File is not present in the FormData object');
    }
  }

  onChangeInformation() {
    let body = {
      payload: JSON.stringify({
        full_name: this.firstName + ' ' + this.lastName,
      }),
    };
    this.commonService.isLoading = true;
    this._profileService.updateUserDetails(body).subscribe((res) => {
      this.currentUser.fullName = this.firstName + ' ' + this.lastName;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.commonService.isLoading = false;
    });
  }

  onChangePassword() {
    if (
      this.newPassword !== '' &&
      this.confirmPassword !== '' &&
      this.currentPassword !== ''
    ) {
      if (this.newPassword == this.confirmPassword) {
        let body = {
          payload: JSON.stringify({
            old_password: this.currentPassword,
            new_password: this.newPassword,
          }),
        };
        this.commonService.isLoading = true;
        this._profileService.updateUserPassword(body).subscribe((res) => {
          this.commonService.isLoading = false;
        });
      }
    }
  }
}
