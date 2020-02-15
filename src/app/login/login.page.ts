import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { SelectAvatarPage } from '../modals/select-avatar/select-avatar.page';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isRegister = false;
  username = '';
  password = '';
  fullName = '';

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async login() {
    (await this.authService.login(this.username)) ? this.username = '' : this.username = this.username;
  }

  changeForm() {
    this.isRegister = !this.isRegister;
    this.username = '';
    this.password = '';
    this.fullName = '';
  }

  async selectAvatar() {
    if (this.username !== '' && this.fullName !== '') {
      if (! await this.authService.isUserExist(this.username)) {
        const avatars = await this.authService.getAvatars();
        const modal = await this.modalController.create({
          component: SelectAvatarPage,
          backdropDismiss: false,
          componentProps: {
            username: this.username,
            fullName: this.commonService.capitalize(this.fullName),
            avatars
          }
        });
        return await modal.present();
      } else {
        // tslint:disable-next-line: max-line-length
        this.commonService.showAlert('Oh no!', 'Your nickname is already taken.', 'Please enter different with this ' + this.username + '.');
      }
    } else {
        // tslint:disable-next-line: max-line-length
        this.commonService.showAlert('Hey!', 'They are some question is not answered.', 'Please answer all the questions.');
    }
  }

}
