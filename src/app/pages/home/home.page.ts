import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  textFilter = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  writeJson() {
    this.authService.writeJsonStorage();
  }

  onSearchChange(event) {
    const text: string = event.target.value;
    this.textFilter = text;
  }

}
