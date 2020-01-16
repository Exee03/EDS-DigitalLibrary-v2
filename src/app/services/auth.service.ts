import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from './common.service';
import { Storage } from '@ionic/storage';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);

  constructor(private storage: Storage, private commonService: CommonService) {
    console.log('auth service ready');
  }

  login() {
    this.authState.next(true);
  }

  checkToken() {
    return this.storage.get('auth-token').then(res => {
      if (res) {
        this.commonService.showToast('Preparing data...');
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {
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
