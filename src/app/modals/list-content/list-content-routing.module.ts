import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListContentPage } from './list-content.page';

const routes: Routes = [
  {
    path: '',
    component: ListContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListContentPageRoutingModule {}
