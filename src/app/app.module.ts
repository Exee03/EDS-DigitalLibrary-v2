import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ContentViewerPageModule } from './modals/content-viewer/content-viewer.module';
import { SettingPopoverPageModule } from './components/setting-popover/setting-popover.module';
import { ListContentPageModule } from './modals/list-content/list-content.module';
import { SelectAvatarPageModule } from './modals/select-avatar/select-avatar.module';
import { ContinueLoginPageModule } from './modals/continue-login/continue-login.module';
import { AddContentPageModule } from './modals/add-content/add-content.module';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { HistoryPageModule } from './modals/history/history.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ContentViewerPageModule,
    SettingPopoverPageModule,
    ListContentPageModule,
    SelectAvatarPageModule,
    ContinueLoginPageModule,
    AddContentPageModule,
    HistoryPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DocumentViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
