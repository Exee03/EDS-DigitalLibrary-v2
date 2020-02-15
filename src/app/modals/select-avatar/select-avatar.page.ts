import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Avatar } from 'src/app/models/avatar';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.page.html',
  styleUrls: ['./select-avatar.page.scss'],
})
export class SelectAvatarPage implements OnInit {
  fullName = '';
  username = '';
  avatar = '';
  avatars: Avatar[] = null;

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private navParams: NavParams
    ) {
    }

  ngOnInit() {
    this.fullName = this.navParams.get('fullName');
    this.username = this.navParams.get('username');
    this.avatars = this.navParams.get('avatars');
  }

  select(url: string) {
    this.avatar = url;
  }

  register() {
    if (this.avatar !== '') {
      this.authService.register(this.username, this.fullName, this.avatar);
      this.close();
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
