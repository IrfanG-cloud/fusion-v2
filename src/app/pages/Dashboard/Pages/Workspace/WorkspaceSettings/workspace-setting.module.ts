import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

// componenets
import { WorkspaceSettingComponent } from './workspace-setting.component';
import { WorkspaceSettingRoutingModule } from './workspace-setting-routing.module';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { MembersComponent } from './members/members.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TrashComponent } from './trash/trash.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    WorkspaceSettingComponent,
    GeneralSettingComponent,
    MembersComponent,
    NotificationsComponent,
    TrashComponent,
  ],
  imports: [
    WorkspaceSettingRoutingModule,
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule
  ],
})
export class WorkspaceSettingModule {}
