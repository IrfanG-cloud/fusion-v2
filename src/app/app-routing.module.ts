import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { SigninComponent } from './pages/Account/signin/signin.component';
import { SignupComponent } from './pages/Account/signup/signup.component';
import { ConfirmemailComponent } from './pages/Account/confirmemail/confirmemail.component';
import { CreateWorkspaceComponent } from './pages/Dashboard/Pages/Workspace/create-workspace/create-workspace.component';
import { SelectWorkspaceComponent } from './pages/Dashboard/Pages/Workspace/select-workspace/select-workspace.component';

//Services
import { AuthGuardService } from './services/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'account/signin',
    component: SigninComponent,
  },
  {
    path: 'account/signup',
    component: SignupComponent,
  },
  {
    path: 'account/confirmemail',
    component: ConfirmemailComponent,
  },
  {
    path: 'workspace/create-workspace',
    component: CreateWorkspaceComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'workspace/select-workspace',
    canActivate: [AuthGuardService],
    component: SelectWorkspaceComponent,
  },

  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/Dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
