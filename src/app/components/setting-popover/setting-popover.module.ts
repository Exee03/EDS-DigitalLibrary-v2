import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPopoverPageRoutingModule } from './setting-popover-routing.module';

import { SettingPopoverPage } from './setting-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPopoverPageRoutingModule
  ],
  declarations: [SettingPopoverPage]
})
export class SettingPopoverPageModule {}
