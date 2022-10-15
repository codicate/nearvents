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

  ngOnInit() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  async signOut() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.signOut();
    await loading.dismiss();

    this.router.navigateByUrl('', { replaceUrl: true });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.cameraService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your picture.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
