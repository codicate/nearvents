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

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
  }

  goToProfilePage() {
    this.router.navigateByUrl('tabs/tabs/profile', { replaceUrl: true });
  }
}
