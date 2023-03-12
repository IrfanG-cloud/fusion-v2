import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

// componenets
import { ProjectSettingComponent } from './project-setting.component';
import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { ConfigurationSettingComponent } from './configuration-setting/configuration-setting.component';

@NgModule({
  declarations: [
    ProjectSettingComponent,
    GeneralSettingComponent,
    IntegrationsComponent,
    ConfigurationSettingComponent,
  ],
  imports: [
    ProjectSettingRoutingModule,
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
  ],
})
export class ProjectSettingModule {}
