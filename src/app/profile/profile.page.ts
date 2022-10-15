import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async signOut() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.signOut();
    await loading.dismiss();

    this.router.navigateByUrl('', { replaceUrl: true });
  }
}
