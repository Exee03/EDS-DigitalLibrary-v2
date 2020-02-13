import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListContentPageRoutingModule } from './list-content-routing.module';

import { ListContentPage } from './list-content.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListContentPageRoutingModule,
    PipesModule
  ],
  declarations: [ListContentPage]
})
export class ListContentPageModule {}
