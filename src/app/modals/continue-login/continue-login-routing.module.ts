import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinueLoginPage } from './continue-login.page';

const routes: Routes = [
  {
    path: '',
    component: ContinueLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinueLoginPageRoutingModule {}
