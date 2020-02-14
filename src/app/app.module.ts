import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { RegisterPageModule } from './modals/register/register.module';
import { ContentViewerPageModule } from './modals/content-viewer/content-viewer.module';
import { SettingPopoverPageModule } from './components/setting-popover/setting-popover.module';
import { ListContentPageModule } from './modals/list-content/list-content.module';
import { SelectAvatarPageModule } from './modals/select-avatar/select-avatar.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    RegisterPageModule,
    ContentViewerPageModule,
    SettingPopoverPageModule,
    ListContentPageModule,
    SelectAvatarPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
