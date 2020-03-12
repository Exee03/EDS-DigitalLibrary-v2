import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Plugins, FilesystemDirectory, FilesystemEncoding, FileWriteResult } from '@capacitor/core';
const { Filesystem } = Plugins;
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  appPath = 'Digital-Library';

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: Storage,
  ) { }

  getTime() {
    const dateTime = new Date();
    // tslint:disable-next-line: max-line-length
    return dateTime.toLocaleString();
  }

  getTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async loading(isDone: boolean, from: string) {
    if (isDone) {
      console.log('Stop loading:', from);
      this.loadingController.dismiss();
    } else {
      console.log('Start loading:', from);
      const loading = await this.loadingController.create({
        translucent: true
      });
      await loading.present();
    }
  }

  async showAlert(header, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToast(text: string) {
    this.toastController.getTop();
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    return toast.present();
  }

  async showAlertError(header, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    // this.loading(true, message);
    await alert.present();
  }

  capitalize(str: string) {
    // tslint:disable-next-line: only-arrow-functions
    return str.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  getDayOfWeekToString(date: string) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  getDayOfWeek(date: string) {
    return new Date(date).getDay();
  }

  checkWeek(date: string) {
    const dateFormat = new Date(date);
    const currentDay = new Date();
    const firstThisWeek = currentDay.getDate() - currentDay.getDay();
    const firstThisWeekDay = new Date(currentDay.setDate(firstThisWeek));
    const firstLastWeek = firstThisWeek - 7;
    const firstLastWeekDay = new Date(currentDay.setDate(firstLastWeek));
    const firstLast2Week = firstThisWeek - 14;
    const firstLast2WeekDay = new Date(currentDay.setDate(firstLast2Week));

    const same = dateFormat.getTime() === firstThisWeekDay.getTime();
    if (same) { return 1; }

    if (dateFormat > firstThisWeekDay) { return 1; }

    if (dateFormat < firstThisWeekDay && dateFormat > firstLastWeekDay) { return 0; }

    if (dateFormat > firstLast2WeekDay && dateFormat < firstLastWeekDay) { return -1; }
  }

  toHourMin(duration: number) {
    let min = Math.floor(duration / 60);
    let hour = 0;
    if (min > 59) {
      hour = min / 60;
      const remainder = hour - Math.floor(hour);
      if (remainder > 0) {
        hour -= remainder;
      }
      min = min - (hour * 60);
    } else if (min < 1) {
      min = 0;
    }
    return {hour, min};
  }

  async readFileHtml(url: string): Promise<string> {
    try {
      const res = await fetch(url);
      const htmlString = await res.text();
      const path = url.slice(0, -10);
      var re = /assets/gi;
      return htmlString.replace(re, path);
    } catch(e) {
      console.error('Unable to read file', e);
    }
  }

  async getPath(url: string): Promise<string> {
    try {
      let file = await Filesystem.getUri({
        path: url,
        directory: FilesystemDirectory.Documents,
      })
      return file.uri;
    } catch(e) {
      console.error('Unable to getUri file', e);
    }
  }

  async getFromJson(fileName: string): Promise<any> {
    try {
      let path = await this.getPath(this.appPath + '/' + fileName + '.json');
      const res = await fetch(path);
      return await res.json();
    } catch (error) {
      console.log('Error while getting from json: ', error);
    }
  }

  async getFromStorage(fileName: string): Promise<any> {
    try {
      return await this.storage.get(fileName);
    } catch (error) {
      console.log('Error while getting from storage: ', error);
    }
  }

  async saveToJson(fileName: string, data: Object): Promise<FileWriteResult> {
    try {
      const json = JSON.stringify(data);
      return Filesystem.writeFile({
        path: this.appPath + '/' + fileName + '.json',
        data: json,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
    } catch (error) {
      console.log('Error while saving to json: ', error);
    }
  }

  saveToStorage(name: string, data: Object): Promise<any> {
    try {
      return this.storage.set(name, data);
    } catch (error) {
      console.log('Error while saving to storage: ', error);
    }
  }

  async fileDelete(path: string) {
    await Filesystem.deleteFile({
      path: this.appPath + '/' + path,
      directory: FilesystemDirectory.Documents
    });
  }

  downloadJson(name: string, data: Object) {
    // const object = {
    //   table: []
    // };
    // object.table.push({ id: 1, square: 2 });
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    return saveAs(blob, name + '.json');
  }

  async uploadJson(filePath: string) {
    try {
      const res = await fetch(filePath);
      return await res.json();
    } catch (error) {
      console.log('Error while upload from json: ', error);
    }
  }
}
