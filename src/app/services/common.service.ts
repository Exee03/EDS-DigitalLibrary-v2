import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
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
    return new Date(date).getDay() - 1;
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

  calculateTrophy(point: number) {
    return point / 100;
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
}
