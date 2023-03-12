import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

// components
import { SigninComponent } from './pages/Account/signin/signin.component';
import { SignupComponent } from './pages/Account/signup/signup.component';
import { ConfirmemailComponent } from './pages/Account/confirmemail/confirmemail.component';
import { CreateWorkspaceComponent } from './pages/Dashboard/Pages/Workspace/create-workspace/create-workspace.component';
import { SelectWorkspaceComponent } from './pages/Dashboard/Pages/Workspace/select-workspace/select-workspace.component';

// services
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './utilities/interceptors/eror-interceptor.service';
import { TokenInterceptor } from './utilities/interceptors/token-interreceptor.service';
import { AuthenticationService } from './services/auth/authentication.service';
import { TokenService } from './utilities/authentication/token.service';
import { EncryptionService } from './utilities/authentication/encryption-service';
import { CommonService } from './services/common/common.service';
import { DashboardService } from './services/workspace/dashboard.service';
import { WorkspaceService } from './services/workspace/workspace.service';
import { ProjectService } from './services/project/project.service';
import { BugService } from './services/bug/bug.service';
import { ProfileService } from './services/profile/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ConfirmemailComponent,
    CreateWorkspaceComponent,
    SelectWorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],

  providers: [
    AuthenticationService,
    TokenService,
    EncryptionService,
    CommonService,
    DashboardService,
    WorkspaceService,
    ProjectService,
      BugService,
    ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
