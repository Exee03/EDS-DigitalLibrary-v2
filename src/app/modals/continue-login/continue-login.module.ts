import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContinueLoginPageRoutingModule } from './continue-login-routing.module';

import { ContinueLoginPage } from './continue-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContinueLoginPageRoutingModule
  ],
  declarations: [ContinueLoginPage]
})
export class ContinueLoginPageModule {}
