import { Content } from './../models/content';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { History, User } from '../models/user';
import { CommonService } from './common.service';
import { BehaviorSubject } from 'rxjs';
import { Capacitor, FileWriteResult } from '@capacitor/core';
import { SettingApp } from '../models/setting';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  contents: Content[] = [];
  timeStart = 0;
  currentUser = new BehaviorSubject<User>(null);
  setting: SettingApp;

  constructor(
    private storage: Storage,
    private commonService: CommonService
  ) { }

  async getContents(): Promise<Content[]> {
    console.log('ContentService: Get contents');
    // tslint:disable-next-line: no-unused-expression
    try {
      (this.contents.length === 0) ? this.contents = await this.getContentFromStorage() : null;
      (this.contents === null) ? this.contents = await this.getContentsFromJson() : null;
    } catch (error) {
      console.log('Error while getting contents: ', error);
    }
    return this.contents;
  }

  async getContentsFromJson(): Promise<Content[]> {
    console.log('ContentService: Get contents from json');
    return await this.commonService.getFromJson('contents');
  }

  async getContentFromStorage(): Promise<Content[]> {
    console.log('ContentService: Get contents from storage');
    return await this.commonService.getFromStorage('contents');
  }

  getContentsByCategory(category: string): Array<Content> {
    console.log('ContentService: Get contents by category');
    const data = this.contents.filter(c => c.category === category);
    return data;
  }

  async getContentsById(id: string): Promise<Content> {
    console.log('ContentService: Get contents by id');
    // tslint:disable-next-line: no-unused-expression
    (this.contents.length === 0) ? await this.getContents() : null;
    const data = this.contents.find(c => c.id === id);
    return data;
  }

  async saveContent(title: string, desc: string, url: string, category: string) {
    console.log('ContentService: Save content');
    const contentByCategory = await this.getContentsByCategory(category);
    this.contents.push({ title, desc, url: Capacitor.convertFileSrc(url), category, id: (category + '-' + contentByCategory.length.toString()), lastAdded: this.commonService.getTime() });
  }

  saveContentToStorage(): Promise<any> {
    console.log('ContentService: Save contents to storage');
    return this.commonService.saveToStorage('contents', this.contents)
  }

  async saveContentToJson(): Promise<FileWriteResult> {
    console.log('ContentService: Save contents to json');
    await this.commonService.fileDelete('contents' + '.json').catch((error) => console.log('Error to delete file: ', error));
    return this.commonService.saveToJson('contents', this.contents);
  }

  downloadContentJson() {
    console.log('ContentService: Download contents json');
    return this.commonService.downloadJson('contents', this.contents);
  }

  async uploadContentJson(url: string) {
    console.log('ContentService: Upload contents json');
    this.contents = await this.commonService.uploadJson(url);
    return this.contents;
  }

  async deleteContent(id: string) {
    console.log('ContentService: Delete content');
    const index = this.contents.findIndex((c) => c.id === id);
    this.contents.splice(index, 1);
  }

  startSession() {
    console.log('ContentService: Start session');
    this.timeStart = this.commonService.getTimestamp();
  }

  endSession(category: string, id: string) {
    console.log('ContentService: End session');
    // let point = 0;
    // switch (category) {
    //   case 'games':
    //     point = 5;
    //     break;
    //   case 'graphic-book':
    //     point = 10;
    //     break;
    //   case 'e-book':
    //     point = 10;
    //     break;
    //   default:
    //     break;
    // }
    // tslint:disable-next-line: max-line-length
    const his: History = { id, category, point: this.setting.pointPerContent, date: this.commonService.getTime(), duration: (this.commonService.getTimestamp() - this.timeStart) };
    this.saveHistory(his);
  }

  saveHistory(history: History) {
    console.log('ContentService: Save to user history');
    const user: User = this.currentUser.value;
    (user.history.length === null) ? user.history = [history] : user.history.push(history);
    user.trophy = this.updateTrophy(user.history);
    this.commonService.saveToStorage('auth-token', user);
    this.currentUser.next(user);
  }

  updateTrophy(histories: History[]): number {
    console.log('ContentService: Update trophy');
    let totalPoint = 0;
    histories.forEach(h => {
      totalPoint += h.point;
    });
    return (totalPoint / this.setting.pointPerTrophy);
  }

  calculateTrophy(point: number): number {
    return point / this.setting.pointPerTrophy;
  }

  updateSetting(newSetting: SettingApp) {
    console.log('ContentService: Update settings');
    this.setting = newSetting;
    this.commonService.saveToStorage('settings', this.setting);
  }

  downloadSettingJson() {
    console.log('ContentService: Download settings json');
    return this.commonService.downloadJson('settings', this.setting);
  }

  async uploadSettingJson(url: string) {
    console.log('ContentService: Upload settings json');
    this.setting = await this.commonService.uploadJson(url);
    return this.setting;
  }
}
