import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  user = {
    name: 'He Liu',
    point: '540',
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Liu_He%2C_May_16%2C_2018.jpg',
  };

  constructor(private router: Router) {}

  goToProfilePage() {
    this.router.navigateByUrl('profile');
  }
}
