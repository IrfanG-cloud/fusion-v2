import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componenets
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './Pages/Home/home/home.component';
import { IssuesComponent } from './Pages/Issues/issues/issues.component';
import { WorkspaceDashboardComponent } from './Pages/Workspace/dashboard/workspacedashboard.component';
import { AddnewprojectComponent } from './Pages/Workspace/addnewproject/addnewproject.component';
import { CrashesComponent } from './Pages/Crashes/crashes/crashes.component';
import { ReleaseListingComponent } from './Pages/Releases/release-listing/release-listing.component';
import { QualityManagementComponent } from './Pages/Quality/quality-management/quality-management.component';
import { RatingEngineComponent } from './Pages/feedback-hub/rating-engine.component';
import { BugDetailViewComponent } from './Pages/Issues/detail/bug-detail-view/bug-detail-view.component';
import { CrashDetailViewComponent } from './Pages/Crashes/detail/crash-detail-view/crash-detail-view.component';
import { DistributionComponent } from './Pages/Distribution/distribution/distribution.component';
import { WorkspaceManagementComponent } from './Pages/Workspace/workspace-management/workspace-management.component';
import { NotificationsComponent } from './Pages/notifications/notifications.component';
import { ForceUpdateComponent } from './Pages/Releases/force-update/force-update.component';
// services

import { AuthGuardService } from './../../services/auth/auth-guard.service';
import { QualityScreenDetailComponent } from './Pages/Quality/quality-management/quality-screen-detail/quality-screen-detail.component';
import { ScreenTestCaseComponent } from './Pages/Quality/quality-management/screen-test-case/screen-test-case.component';
import { ManageProfileSettingComponent } from './Pages/Workspace/manage-profile-setting/manage-profile-setting.component';
import { SetupForceUpdateComponent } from './Pages/Releases/setup-force-update/setup-force-update.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full',
      },
      {
        path: 'project',
        pathMatch: 'full',
        component: WorkspaceDashboardComponent,
      },
      {
        path: 'project/list-view',
        pathMatch: 'full',
        component: WorkspaceDashboardComponent,
      },
      {
        path: 'project/home',
        component: HomeComponent,
      },
      {
        path: 'project/notifications',
        component: NotificationsComponent,
      },
      {
        path: 'project/add-new',
        component: AddnewprojectComponent,
      },
      {
        path: 'project/issues',
        component: IssuesComponent,
      },
      {
        path: 'project/issues/detail',
        component: BugDetailViewComponent,
      },
      {
        path: 'project/crashes',
        component: CrashesComponent,
      },
      {
        path: 'project/crashes/detail',
        component: CrashDetailViewComponent,
      },
      {
        path: 'project/releases',
        component: ReleaseListingComponent,
      },
      {
        path: 'project/force-update',
        component: ForceUpdateComponent,
      },
      {
        path: 'project/force-update/setup-force-update',
        component: SetupForceUpdateComponent,
      },
      {
        path: 'project/quality-management',
        component: QualityManagementComponent,
      },
      {
        path: 'project/rating-engine',
        component: RatingEngineComponent,
      },
      {
        path: 'project/distribution',
        component: DistributionComponent,
      },
      {
        path: 'workspace/workspace-management',
        component: WorkspaceManagementComponent,
      },
      {
        path: 'project/project-settings',
        loadChildren: () =>
          import('./Pages/ProjectSettings/project-setting.module').then(
            (m) => m.ProjectSettingModule
          ),
      },
      {
        path: 'workspace/workspace-management/workspace-settings',
        loadChildren: () =>
          import(
            './Pages/Workspace/WorkspaceSettings/workspace-setting.module'
          ).then((m) => m.WorkspaceSettingModule),
      },
      {
        path: 'project/quality-management/quality-screen-detail',
        component: QualityScreenDetailComponent,
      },
      {
        path: 'project/quality-management/screen-test-case',
        component: ScreenTestCaseComponent,
      },
      {
        path: 'manage-profiile',
        component: ManageProfileSettingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
