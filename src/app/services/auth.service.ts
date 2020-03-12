import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';
import { Storage } from '@ionic/storage';
import { saveAs } from 'file-saver';
import { User } from '../models/user';
import { Platform, ModalController } from '@ionic/angular';
import { Avatar } from '../models/avatar';
import { ContinueLoginPage } from '../modals/continue-login/continue-login.page';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  users: User[] = null;
  currentUser: User;
  avatars: Avatar[] = null;

  constructor(
    private storage: Storage,
    private commonService: CommonService,
    private contentService: ContentService,
    private platform: Platform,
    private modalController: ModalController
  ) {
    console.log('Authentication Service ready!');
    this.platform.ready().then(() => this.checkToken()).then(() => this.getSetting());
  }

  async login(username: string): Promise<boolean> {
    console.log('AuthService: Login');
    const res = await this.isUserExist(username);
    if (res) {
      this.currentUser = this.getCurrentUser(username);
      this.saveCurrentUser();
      this.authState.next(true);
    } else {
      this.commonService.showAlert(
        'Opss...',
        `Your username doesn't exist.`,
        'Please enter the correct username.'
      );
    }
    return res;
  }

  async loginAsAdmin(username: string, password: String): Promise<boolean> {
    console.log('AuthService: Login as admin');
    const res = await this.isUserExist(username);
    const isAdmin = this.users.some((u) => u.password === password);
    if (res) {
      if (isAdmin) {
        this.currentUser = this.getCurrentUser(username);
        this.saveCurrentUser();
        this.authState.next(true);
      } else {
        this.commonService.showAlert(
          'Opss...',
          `Your password is incorrect.`,
          'Please enter the correct password.'
        );
      }
    } else {
      this.commonService.showAlert(
        'Opss...',
        `Your username doesn't exist.`,
        'Please enter the correct username.'
      );
    }
    return res && isAdmin;
  }

  register(username: string, fullName: string, avatar: string) {
    console.log('AuthService: Register');
    // tslint:disable-next-line: max-line-length
    this.users === null
      ? (this.users = [{ username, fullName, avatar, history: [], trophy: 0, isAdmin: false, password: '' }])
      : this.users.push({ username, fullName, avatar, history: [], trophy: 0, isAdmin: false, password: '' });
    this.saveUsers();
    this.currentUser = this.getCurrentUser(username);
    this.saveCurrentUser();
    this.authState.next(true);
  }

  async getUsers(): Promise<User[]> {
    console.log('AuthService: Get users');
    // tslint:disable-next-line: no-unused-expression
    (this.users === null || this.users.length === 0) ? this.users = await this.commonService.getFromStorage('users') : null;
    (this.users === null || this.users.length === 0) ? this.users = await this.commonService.getFromJson('users') : null;
    return this.users;
  }

  getCurrentUser(username: string): User {
    console.log('AuthService: Get current user');
    return this.users.find(u => u.username === username);
  }

  saveCurrentUser() {
    console.log('AuthService: Save current user');
    this.commonService.saveToStorage('auth-token', this.currentUser);
    this.contentService.currentUser.next(this.currentUser);
  }

  async isUserExist(username: string): Promise<boolean> {
    console.log('AuthService: Check the existence of user');
    // tslint:disable-next-line: no-unused-expression
    this.users = this.users === null ? await this.getUsers() : this.users;
    return this.users === null
      ? false
      : this.users.find(u => u.username === username)
        ? true
        : false;
  }

  updateAvatar(avatar: string) {
    console.log('AuthService: Update the avatar of user');
    this.users.forEach(u => {
      if (u.username === this.currentUser.username) {
        u.avatar = avatar;
      }
    });
    this.currentUser.avatar = avatar;
    this.saveCurrentUser();
    this.saveUsers();
  }

  editUser(user: User) {
    console.log('AuthService: Edit user');
    if (user.username === this.currentUser.username) {
      this.updateUser(user);
    } else {
      if (this.isUserExist(user.username)) {
        throw "This username already exist";
      } else {
        this.updateUser(user);
      }
    }
  }

  async updateUser(user: User) {
    console.log('AuthService: Update user');
    user.fullName = this.commonService.capitalize(user.fullName);
    await this.getUsers().then(users => users.forEach(u => {
      (u.username === this.currentUser.username) ? u = user : null;
    }));
    this.saveUsers();
    this.currentUser = user;
    this.saveCurrentUser();
    this.commonService.showToast('Profile updated successfully.');
  }

  deleteUser(username: string) {
    console.log('AuthService: Delete user');
    const index = this.users.findIndex((c) => c.username === username);
    this.users.splice(index, 1);
  }

  async getAvatars(): Promise<Avatar[]> {
    console.log('AuthService: Get avatar');
    if (this.avatars === null) {
      const res = await fetch('assets/avatars/avatars.json');
      const data = await res.json();
      this.avatars = data.avatar;
    }
    return this.avatars;
  }

  checkToken() {
    console.log('AuthService: Check token');
    return this.storage.get('auth-token').then(res => {
      if (res) {
        this.confirmationSameUser(res);
      }
    });
  }

  async confirmationSameUser(user: User) {
    console.log('AuthService: Get confirmation for same user');
    const modal = await this.modalController.create({
      component: ContinueLoginPage,
      backdropDismiss: false,
      componentProps: {
        user
      }
    });
    modal.onDidDismiss().then((detail) => {
      (detail.data) ? this.continueLogin(user) : this.logout();
    })
      .catch((err) => console.log(err.message));
    return await modal.present();
  }

  continueLogin(user: User) {
    console.log('AuthService: Continue login');
    this.commonService.showToast('Preparing data...');
    this.currentUser = user;
    this.contentService.currentUser.next(user);
    this.authState.next(true);
  }

  isAuthenticated() {
    console.log('AuthService: Check auth state');
    return this.authState.value;
  }

  async logout() {
    console.log('AuthService: Logout');
    const user = await this.commonService.getFromStorage('auth-token');
    this.updateUser(user);
    this.saveUsers();
    this.storage.remove('auth-token');
    this.authState.next(false);
  }

  // writeJsonStorage() {
  //   const object = {
  //     table: []
  //   };
  //   object.table.push({ id: 1, square: 2 });
  //   const json = JSON.stringify(object);
  //   const blob = new Blob([json], { type: 'application/json' });
  //   saveAs(blob, 'abc.json');
  // }

  saveUsers() {
    console.log('AuthService: Save users');
    return this.saveUsersToStorage().then(() => this.saveUsersToJson());
  }

  saveUsersToStorage() {
    console.log('AuthService: Save users to storage');
    return this.commonService.saveToStorage('users', this.users);
  }

  saveUsersToJson() {
    console.log('AuthService: Save users to json');
    return this.commonService.saveToJson('users', this.users);
  }

  downloadUsersJson() {
    console.log('AuthService: Download users json');
    return this.commonService.downloadJson('users', this.users);
  }

  async uploadUsersJson(url: string) {
    console.log('AuthService: Upload users json');
    this.users = await this.commonService.uploadJson(url);
    return this.users;
  }

  async getSetting() {
    console.log('AuthService: Get setting');
    this.contentService.setting = await this.commonService.getFromStorage('settings');
  }

}
