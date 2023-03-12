import { ProjectSettingComponent } from './project-setting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

// importing components
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { ConfigurationSettingComponent } from './configuration-setting/configuration-setting.component';

const projectSettingRoutes: Routes = [
  {
    path: '',
    component: ProjectSettingComponent,
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
        path: 'integrations',
        component: IntegrationsComponent,
      },
    
      {
        path:'configuration',
        component: ConfigurationSettingComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(projectSettingRoutes)],
  exports: [RouterModule],
})
export class ProjectSettingRoutingModule {}
