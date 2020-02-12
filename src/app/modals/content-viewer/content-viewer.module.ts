import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentViewerPageRoutingModule } from './content-viewer-routing.module';

import { ContentViewerPage } from './content-viewer.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ContentViewerPageRoutingModule
  ],
  declarations: [ContentViewerPage]
})
export class ContentViewerPageModule {}
