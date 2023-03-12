import { WorkspaceSettingComponent } from './workspace-setting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

// importing components
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { MembersComponent } from './members/members.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TrashComponent } from './trash/trash.component';

const workspaceSettingRoutes: Routes = [
  {
    path: '',
    component: WorkspaceSettingComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'general-settings',
        pathMatch: 'full',
      },
      {
        path: 'general-settings',
        component: GeneralSettingComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: 'billings',
        component: NotificationsComponent,
      },
      {
        path: 'trash',
        component: TrashComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workspaceSettingRoutes)],
  exports: [RouterModule],
})
export class WorkspaceSettingRoutingModule {}
