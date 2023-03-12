import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { NgChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';

// componenets
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './Pages/Home/home/home.component';
import { IssuesComponent } from './Pages/Issues/issues/issues.component';
import { WorkspaceDashboardComponent } from './Pages/Workspace/dashboard/workspacedashboard.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderbarComponent } from '../../components/headerbar/headerbar.component';
import { ProjectTileComponent } from '../../components/project-tile/project-tile.component';
import { AddnewprojectComponent } from './Pages/Workspace/addnewproject/addnewproject.component';
import { BugFilterComponent } from 'src/app/components/filters/bug-filter/bug-filter.component';
import { CrashesComponent } from './Pages/Crashes/crashes/crashes.component';
import { ReleaseListingComponent } from './Pages/Releases/release-listing/release-listing.component';
import { QualityManagementComponent } from './Pages/Quality/quality-management/quality-management.component';
import { CycleDialogComponent } from './Pages/Quality/quality-management/cycle-dialog/cycle-dialog.component';
import { BugDetailViewComponent } from './Pages/Issues/detail/bug-detail-view/bug-detail-view.component';
import { RatingEngineComponent } from './Pages/feedback-hub/rating-engine.component';
import { CrashDetailViewComponent } from './Pages/Crashes/detail/crash-detail-view/crash-detail-view.component';
import { DistributionComponent } from './Pages/Distribution/distribution/distribution.component';
import { WorkspaceManagementComponent } from './Pages/Workspace/workspace-management/workspace-management.component';
import { WorkspaceTileComponent } from 'src/app/components/workspace-tile/workspace-tile.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { QualityScreenDetailComponent } from './Pages/Quality/quality-management/quality-screen-detail/quality-screen-detail.component';
import { ScreenTestCaseComponent } from './Pages/Quality/quality-management/screen-test-case/screen-test-case.component';
import { NotificationsComponent } from './Pages/notifications/notifications.component';
import { CustomDropdonwComponent } from 'src/app/components/custom-dropdonw/custom-dropdonw/custom-dropdonw.component';

import { nl2brPipe } from 'src/app/utilities/pipes/newline';
import { ForceUpdateComponent } from './Pages/Releases/force-update/force-update.component';
import { ManageProfileSettingComponent } from './Pages/Workspace/manage-profile-setting/manage-profile-setting.component';
import { SetupForceUpdateComponent } from './Pages/Releases/setup-force-update/setup-force-update.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    IssuesComponent,
    WorkspaceDashboardComponent,
    HeaderbarComponent,
    ProjectTileComponent,
    AddnewprojectComponent,
    BugFilterComponent,
    CrashesComponent,
    ReleaseListingComponent,
    QualityManagementComponent,
    CycleDialogComponent,
    BugDetailViewComponent,
    RatingEngineComponent,
    CrashDetailViewComponent,
    DistributionComponent,
    WorkspaceManagementComponent,
    WorkspaceTileComponent,
    nl2brPipe,
    QualityScreenDetailComponent,
    ScreenTestCaseComponent,
    NotificationsComponent,
    ForceUpdateComponent,
    ManageProfileSettingComponent,
    CustomDropdonwComponent,
    SetupForceUpdateComponent,
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    MatMenuModule,
    NgChartsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCheckboxModule,
    DragDropModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonToggleModule,
  ],
})
export class DashboardModule {}
