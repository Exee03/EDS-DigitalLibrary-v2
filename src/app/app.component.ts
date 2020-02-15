import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('Initializing App...');
      this.authService.authState.subscribe(state => {
        console.log('Auth changed: ', state);
        if (state) {
          this.router.navigate(['menu']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  onSplitPaneVisible(event) {

  }
}
