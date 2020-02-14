import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectAvatarPageRoutingModule } from './select-avatar-routing.module';

import { SelectAvatarPage } from './select-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectAvatarPageRoutingModule
  ],
  declarations: [SelectAvatarPage]
})
export class SelectAvatarPageModule {}
