import { async } from '@angular/core/testing';
import { User } from './../../../utilities/models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { TokenService } from 'src/app/utilities/authentication/token.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  title = 'Sign in to Fussion';
  email: string = '';
  password: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  error: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    console.log('*********************************');
    console.log('Host Name=>', window.location.hostname);
  }

  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public commonService: CommonService,
    private _tokenService: TokenService,
    public _afAuth: AngularFireAuth // Inject Firebase auth service
  ) {
    if (this._auth.loggedIn) {
      this._router.navigate(['']);
    }
  }

  validateFields(): boolean {
    if (this.email === '') {
      this.emailError = true;
      return false;
    } else if (this.password === '') {
      this.passwordError = true;
      return false;
    } else {
      return true;
    }
  }

  async login() {
    this.emailError = false;
    this.passwordError = false;
    this.error = false;

    if (this.validateFields()) {
      let data: User = {
        email: this.email,
        password: this.password,
      };
      this.commonService.isLoading = true;
      this._tokenService.requestHandShakeToken().subscribe(async (res) => {
        let { token } = res;
        localStorage.setItem('token', token);
        (await this._auth.loginUserObservable(data)).subscribe((response) => {
          this.commonService.isLoading = false;
          if (response) {
            this._router.navigate(['workspace/select-workspace']);
          } else {
            this.commonService.showError(
              'Please try again with the valid credentials.',
              'Invalid username or password'
            );
          }
        });
      });
    }
  }

  async signWithGithub() {
    // Sign in with Github
    return await this.AuthLogin(new auth.GithubAuthProvider());
  }
  async signInWithGoogle() {
    // Sign in with Github
    return await this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    return this._afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('User logged in Result: ' + JSON.stringify(result));
        alert('logged in Success');
        // let user = result?.additionalUserInfo?.profile;
        // let credential = JSON.parse(JSON.stringify(result?.credential));
        // localStorage.setItem('currentUser', JSON.stringify(user));
        // localStorage.setItem('token', JSON.stringify(credential.accessToken));
        // this._router.navigate(['']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
