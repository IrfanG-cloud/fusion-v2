import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CommonService } from 'src/app/services/common/common.service';
import { TokenService } from 'src/app/utilities/authentication/token.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/utilities/models/user';
import { _MAT_HINT } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  name: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  error: boolean = false;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {}

  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    public _commonService: CommonService,
    private _tokenService: TokenService
  ) {
    
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

  async signup() {
    this.emailError = false;
    this.passwordError = false;
    this.error = false;

    if (this.validateFields()) {
      this._commonService.isLoading = true;
      this._tokenService.requestHandShakeToken().subscribe(async (res) => {
        console.log(res);
        let { token } = res;
        localStorage.setItem('token', token);
        let user: User = {
          email: this.email,
          password: this.password,
          name: this.name,
        };

        (await this._auth.signUpUserObservable(user)).subscribe(
          (userResponse) => {
            console.log(userResponse);
            if (userResponse.status == 'success') {
              this._commonService.isLoading = false;
              this._router.navigate(['account/confirmemail'], {
                queryParams: { email: this.email },
              });
            }
          }
        );
      });
    }
  }
}
