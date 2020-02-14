import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectAvatarPage } from './select-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: SelectAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectAvatarPageRoutingModule {}
