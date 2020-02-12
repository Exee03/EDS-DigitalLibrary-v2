import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPopoverPage } from './setting-popover.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPopoverPageRoutingModule {}
