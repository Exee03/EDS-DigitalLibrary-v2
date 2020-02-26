import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  users: User[];
  currentUser: User;

  constructor(
    private authService: AuthService
  ) {
    this.getUsers();
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
  }

  async getUsers() {
    this.users = await this.authService.getUsers();
    console.log(this.users);
  }

}
