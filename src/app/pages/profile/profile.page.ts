import { Component, OnInit } from '@angular/core';
import { User, History } from 'src/app/models/user';
import { PopoverController, ModalController } from '@ionic/angular';
import { SettingPopoverPage } from 'src/app/components/setting-popover/setting-popover.page';
import { Chart } from 'chart.js';
import { ContentService } from 'src/app/services/content.service';
import { CommonService } from 'src/app/services/common.service';
import { Content } from 'src/app/models/content';
import { HistoryPage } from 'src/app/modals/history/history.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: User;
  labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  data = [];
  backgroundColor = [];
  borderColor = [];
  myChart;
  colorThisWeek = 'rgba(153, 102, 255, 1)';
  colorLastWeek = 'rgba(128, 128, 128, 1)';
  durationReading;
  durationGaming;

  constructor(
    private contentService: ContentService,
    private commonService: CommonService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) {
    this.contentService.currentUser.subscribe(user => {
      this.user = user;
      this.generateStatistics(user.history);
      this.generateTimeSpent(user);
    });
  }

  ngOnInit() {
    this.createChart();
  }

  async generateStatistics(history: History[]) {
    this.backgroundColor = [
      this.colorLastWeek,
      this.colorLastWeek,
      this.colorLastWeek,
      this.colorLastWeek,
      this.colorLastWeek
    ];
    this.borderColor = [
      this.colorLastWeek,
      this.colorLastWeek,
      this.colorLastWeek,
      this.colorLastWeek,
      this.colorLastWeek
    ];
    const newData = [0, 0, 0, 0, 0, 0, 0];
    history.forEach(h => {
      switch (this.commonService.checkWeek(h.date)) {
        case 1:
          const index1 = this.commonService.getDayOfWeek(h.date);
          newData[index1] += this.contentService.calculateTrophy(h.point);
          this.backgroundColor[index1] = this.colorThisWeek;
          this.borderColor[index1] = this.colorThisWeek;
          break;
        case 0:
          const index2 = this.commonService.getDayOfWeek(h.date);
          newData[index2] += this.contentService.calculateTrophy(h.point);
          this.backgroundColor[index2] = this.colorThisWeek;
          this.borderColor[index2] = this.colorThisWeek;
          break;
        case -1:
          const index3 = this.commonService.getDayOfWeek(h.date);
          newData[index3] += this.contentService.calculateTrophy(h.point);
          break;
        default:
          break;
      }
    });
    this.data = [];
    newData.forEach(d => {
      this.data.push(Math.round(d));
    });
    // console.log(newData);

  }

  generateTimeSpent(user: User) {
    let totalGame = 0;
    let totalRead = 0;
    user.history.forEach(h => {
      if (h.category === 'games') {
        totalGame += h.duration;
      } else {
        totalRead += h.duration;
      }
    });
    this.durationGaming = this.commonService.toHourMin(totalGame);
    this.durationReading = this.commonService.toHourMin(totalRead);
  }

  generateContentHistory(history: History[]): Content[] {
    const historyContent: Content[] = [];
    history.forEach(async h => {
      const content = await this.contentService.getContentsById(h.id);
      if (content === undefined) {
        historyContent.push({ title: '(this ' + h.category + ' has been deleted)', desc: '', category: h.category, lastAdded: '', id: h.id, url: '' });
      } else {
        historyContent.push(content);
      }
    });
    return historyContent;
  }

  createChart() {
    const canvas: any = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'No. of trophy',
            barThickness: 20,
            maxBarThickness: 30,
            data: this.data,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'top'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  async settingsPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: SettingPopoverPage,
      event: ev,
      componentProps: { page: 'profile' }
      // cssClass: 'popover_class',
    });

    /** Sync event from popover component */
    // this.events.subscribe('fromPopoverEvent', (a) => {
    //   this.syncTasks(a);
    // });
    return await popover.present();
  }

  async showHistory() {
    await this.commonService.loading(false, 'ProfilePage-showHistory');
    const modal = await this.modalController.create({
      component: HistoryPage,
      backdropDismiss: false,
      componentProps: {
        historyContent: this.generateContentHistory(this.user.history.slice().reverse()),
        userHistory: this.user.history,
      }
    });
    this.commonService.loading(true, 'ProfilePage-showHistory');
    await modal.present();
  }
}
