import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'services/auth.service';
import { CameraService } from 'services/camera.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = null;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private cameraService: CameraService
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
  }

  async signOut() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.signOut();
    await loading.dismiss();

    this.router.navigateByUrl('', { replaceUrl: true });
  }

  async doRefresh(event) {
    this.user = await this.authService.getCurrentUser();
    event.target.complete();
  }
}
