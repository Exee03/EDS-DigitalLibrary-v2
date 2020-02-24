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
  nameAvatar = '';
  urlAvatar: Array<string>;
  attributionLine = '';

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
    this.nameAvatar = this.avatars[0].name;
    this.attributionLine = this.avatars[0].credit;
    this.updateAvatarUrls(this.nameAvatar);
  }

  updateAvatarUrls(name: string) {
    this.nameAvatar = name;
    this.urlAvatar = this.avatars.find((a) => a.name === name).url;
    this.attributionLine = this.avatars.find((a) => a.name === name).credit;
  }

  selectAvatar(url: string) {
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
