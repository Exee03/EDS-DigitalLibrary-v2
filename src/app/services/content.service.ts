import { Injectable } from '@angular/core';
import { Content } from '../models/content';
import { Storage } from '@ionic/storage';
import { History, User } from '../models/user';
import { CommonService } from './common.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  contents: Content[] = [];
  timeStart = 0;
  currentUser = new BehaviorSubject<User>(null);

  constructor(
    private storage: Storage,
    private commonService: CommonService
  ) {}

  async fetchContents(): Promise<Content[]> {
    const res = await fetch('assets/contents/contents.json');
    const data =  await res.json();
    this.contents = data.contents;
    return this.contents;
  }

  async getContents(category: string): Promise<Content[]> {
    // tslint:disable-next-line: no-unused-expression
    (this.contents.length === 0) ? await this.fetchContents() : null;
    const data = this.contents.filter(c => c.category === category);
    return data;
  }

  async getContentsById(id: string): Promise<Content> {
    // tslint:disable-next-line: no-unused-expression
    (this.contents.length === 0) ? await this.fetchContents() : null;
    const data = this.contents.find(c => c.id === id);
    return data;
  }

  saveContent(name: string, url: string) {
    this.storage.set('game', {name, url});
  }

  async getContentFromStorage(): Promise<Content[]> {
    const data = await this.storage.get('game');
    return data;
  }

  startSession() {
    this.timeStart = this.commonService.getTimestamp();
  }

  endSession(category: string, id: string) {
    let point = 0;
    switch (category) {
      case 'games':
        point = 5;
        break;
      case 'graphic-book':
        point = 10;
        break;
      case 'e-book':
        point = 10;
        break;
      default:
        break;
    }
    // tslint:disable-next-line: max-line-length
    const his: History = {id, category, point, date: this.commonService.getTime(), duration: (this.commonService.getTimestamp() - this.timeStart)};
    this.saveHistory(his);
  }

  saveHistory(history: History) {
    const user: User = this.currentUser.value;
    (user.history.length === null) ? user.history = [history] : user.history.push(history);
    user.trophy = this.updateTrophy(user.history);
    this.storage.set('auth-token', user);
    this.currentUser.next(user);
  }

  updateTrophy(histories: History[]): number {
    let totalPoint = 0;
    histories.forEach(h => {
      totalPoint += h.point;
    });
    return (totalPoint / 100);
  }
}
