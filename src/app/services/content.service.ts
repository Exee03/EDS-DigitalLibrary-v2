import { Injectable } from '@angular/core';
import { Content } from '../models/content';
import { map, isEmpty } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  contents: Content[] = [];

  constructor(
    private storage: Storage
  ) {}

  async fetchContents() {
    console.log('fetch');
    const res = await fetch('assets/contents/contents.json');
    const data =  await res.json();
    this.contents = data.contents;
    return this.contents;
  }

  async getContents(type: string): Promise<Content[]> {
    // tslint:disable-next-line: no-unused-expression
    (this.contents.length === 0) ? await this.fetchContents() : null;
    const data = this.contents.filter(c => c.type === type);
    return data;
  }

  saveContent(name: string, url: string) {
    this.storage.set('game', {name, url});
  }

  async getContentFromStorage() {
    const data = await this.storage.get('game');
    return data;
  }
}
