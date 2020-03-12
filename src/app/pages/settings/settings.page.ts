import { SettingApp } from './../../models/setting';
import { AddContentPage } from './../../modals/add-content/add-content.page';
import { Content } from './../../models/content';
import { ContentService } from './../../services/content.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { CommonService } from 'src/app/services/common.service';
import { SelectAvatarPage } from 'src/app/modals/select-avatar/select-avatar.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  users: User[];
  contents: Content[];
  currentUser: User;
  isEditProfile = false;
  isEditSetting = false;
  form = 'profile';
  isContentModified = false;
  isUsersModified = false;
  setting: SettingApp

  constructor(
    private authService: AuthService,
    private contentService: ContentService,
    private commonService: CommonService,
    private modalController: ModalController
  ) {
    this.currentUser = this.authService.currentUser;
    this.setting = this.contentService.setting;
    if (this.currentUser.isAdmin) {
      this.getUsers();
      this.getContents();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.isContentModified) {
      try {
        this.contentService.saveContentToStorage();
      } catch (error) {
        console.log(error);
      }
    }
    if (this.isUsersModified) {
      try {
        this.authService.saveUsersToStorage();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getUsers() {
    this.users = await this.authService.getUsers();
  }

  async getContents() {
    this.contents = await this.contentService.getContents();
  }

  changeFormProfile() {
    this.isEditProfile = !this.isEditProfile;
  }

  async changeAvatar() {
    const avatars = await this.authService.getAvatars();
    const modal = await this.modalController.create({
      component: SelectAvatarPage,
      backdropDismiss: false,
      componentProps: {
        username: this.currentUser.username,
        fullName: this.commonService.capitalize(this.currentUser.fullName),
        avatars,
        isRegister: false
      }
    });
    await modal.present();
    modal.onDidDismiss().then((_) =>
      this.currentUser = this.authService.currentUser);
  }

  saveProfile() {
    this.changeFormProfile();
    try {
      this.authService.editUser(this.currentUser);
    } catch (error) {
      this.commonService.showAlertError("Opss..", error, "Please try again.");
    }
  }

  formSegment(ev: any) {
    this.form = ev.detail.value;
  }

  async contentsSegment(ev: any) {
    if (ev.detail.value === 'all') {
      this.getContents();
    } else {
      this.contents = await this.contentService.getContentsByCategory(ev.detail.value);
    }
  }

  async addContent() {
    const modal = await this.modalController.create({
      component: AddContentPage,
    });
    await modal.present();
    this.isContentModified = true;
  }

  deleteContent(id: string) {
    this.isContentModified = true;
    this.contentService.deleteContent(id);
    this.commonService.showToast('Content delete successfully.');
  }

  deleteUser(username: string) {
    this.isUsersModified = true;
    this.authService.deleteUser(username);
    this.commonService.showToast('User delete successfully.');
  }

  changeFormSetting() {
    this.isEditSetting = !this.isEditSetting;
  }

  saveSetting() {
    this.changeFormSetting();
    try {
      this.contentService.updateSetting(this.setting);
    } catch (error) {
      this.commonService.showAlertError("Opss..", error, "Please try again.");
    }
  }

  downloadJson() {
    if (this.form === 'contents') {
      this.contentService.downloadContentJson();
    } else if (this.form === 'users') {
      this.authService.downloadUsersJson();
    } else if (this.form === 'settings') {
      this.contentService.downloadSettingJson();
    }
  }

  async onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const path = event.target.files[0].path;
      if (this.form === 'contents') {
        this.contents = await this.contentService.uploadContentJson(path);
        this.contentService.saveContentToStorage();
      } else if (this.form === 'users') {
        this.users = await this.authService.uploadUsersJson(path);
        this.authService.saveUsersToStorage();
      } else if (this.form === 'settings') {
        this.setting = await this.contentService.uploadSettingJson(path);
        this.contentService.updateSetting(this.setting);
      }
    }
  }
}
