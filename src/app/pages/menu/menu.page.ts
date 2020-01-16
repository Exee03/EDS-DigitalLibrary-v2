import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';

  menu = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home',
    },
    {
      title: 'Profile',
      url: '/menu/profile',
      icon: 'person',
    },
    {
      title: 'Settings',
      url: '/menu/settings',
      icon: 'settings',
    },
  ];

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url === '/menu') {
        this.selectedPath = '/menu/home';
      } else {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

}
