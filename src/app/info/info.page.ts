import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'services/auth.service';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { CameraService } from 'services/camera.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  credentials: FormGroup;
  image = null;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  get name() {
    return this.credentials.get('name');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async takePicture() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt, // Camera, Photos or Prompt!
    });
  }

  async createUser() {
    if (this.image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.authService.createUser(this.image, this.name);
      await loading.dismiss();

      this.router.navigateByUrl('tabs', { replaceUrl: true });

      // if (!result) {
      //   const alert = await this.alertController.create({
      //     header: 'Upload failed',
      //     message: 'There was a problem uploading your picture.',
      //     buttons: ['OK'],
      //   });
      //   await alert.present();
      // }
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
