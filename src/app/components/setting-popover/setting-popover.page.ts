import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-popover',
  templateUrl: './setting-popover.page.html',
  styleUrls: ['./setting-popover.page.scss'],
})
export class SettingPopoverPage implements OnInit {
  page: string;

  constructor(
    private authService: AuthService,
    private popoverController: PopoverController,
    private router: Router,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.page = this.navParams.get('page');
  }

  profile() {
    this.router.navigate(['/menu/profile']);
    this.popoverController.dismiss();
  }

  settings() {
    this.router.navigate(['/menu/settings']);
    this.popoverController.dismiss();
  }

  logout() {
    this.authService.logout();
    this.popoverController.dismiss();
  }

  async dismissPopover() {
    await this.popoverController.dismiss();
  }

}
