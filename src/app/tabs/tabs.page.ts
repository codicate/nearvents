import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.subscribeToUserUpdates((user) => {
      this.user = user;
    });
  }

  goToProfilePage() {
    this.router.navigateByUrl('tabs/tabs/profile', { replaceUrl: true });
  }
}
