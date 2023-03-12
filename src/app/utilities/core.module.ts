import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenService } from './authentication/token.service';
import { ProjectsHttpService } from './http/projects-http.service';
import { UserHttpService } from './http/user-http.service';
import { EncryptionService } from './authentication/encryption-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProjectsHttpService,
    TokenService,
    UserHttpService,
    EncryptionService
  ]
})
export class CoreModule { }
