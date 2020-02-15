import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';
import { Storage } from '@ionic/storage';
import { saveAs } from 'file-saver';
import { User } from '../models/user';
import { Platform } from '@ionic/angular';
import { Avatar } from '../models/avatar';

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
    private platform: Platform
    ) {
    console.log('Authentication Service ready!');
    this.platform.ready().then(() => this.checkToken());
  }

  async login(username: string): Promise<boolean> {
    const res = await this.isUserExist(username);
    if (res) {
      this.currentUser = this.getCurrentUser(username);
      this.saveCurrentUser();
      this.authState.next(true);
    } else {
      this.commonService.showAlert('Oppsss...', `Your username doesn't exist.`, 'Please enter the correct username.');
    }
    return res;
  }

  register(username: string, fullName: string, avatar: string) {
    // tslint:disable-next-line: max-line-length
    (this.users === null) ? this.users = [{username, fullName, avatar, history: [], trophy: 0}] : this.users.push({username, fullName, avatar, history: [], trophy: 0});
    this.storage.set('users', this.users);
    this.currentUser = this.getCurrentUser(username);
    this.saveCurrentUser();
    this.authState.next(true);
  }

  async getUsers(): Promise<User[]> {
    return await this.storage.get('users');
  }

  getCurrentUser(username: string): User {
    return this.users.find(u => u.username === username);
  }

  saveCurrentUser() {
    this.storage.set('auth-token', this.currentUser);
  }

  async isUserExist(username: string): Promise<boolean> {
    // tslint:disable-next-line: no-unused-expression
    this.users = (this.users === null) ? await this.getUsers() : this.users;
    return (this.users === null) ? false : (this.users.find(u => u.username === username)) ? true : false;
  }

  async getAvatars(): Promise<Avatar[]> {
    if (this.avatars === null) {
      const res = await fetch('assets/avatars/avatars.json');
      const data =  await res.json();
      this.avatars = data.avatar;
    }
    return this.avatars;
  }

  checkToken() {
    return this.storage.get('auth-token').then(res => {
      if (res) {
        this.commonService.showToast('Preparing data...');
        this.currentUser = res;
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {
    this.storage.remove('auth-token');
    this.authState.next(false);
  }

  writeJsonStorage() {
    let obj = {
      table: []
    };
    obj.table.push({id: 1, square: 2});
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {type : 'application/json'});
    saveAs(blob, 'abc.json');
  }
}
