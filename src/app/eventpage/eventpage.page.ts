import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { stringLength } from '@firebase/util';
import { event } from 'app/feed/event.model';
import { Router, RouterModule } from '@angular/router';
import { dataService } from '../data.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'services/auth.service';
import { CameraService } from 'services/camera.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  pageEvent: event;
  upload: boolean = false;
  user = null;

  getPlayerAvatar(playerId: number) {
    for(let i = 0; i<this.dataService.playerArray.length;i++) {
      if(this.dataService.playerArray[i].playerID == playerId) {
        return this.dataService.playerArray[i].profilePicture;
      }
    }
  }

  getPlayerName(playerName: number) {
    for(let i = 0; i<this.dataService.playerArray.length;i++) {
      if(this.dataService.playerArray[i].playerID == playerName) {
        return this.dataService.playerArray[i].name;
      }
    }
  }

  @ViewChild(IonModal) modal: IonModal;

  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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
      this.upload = true;

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

  constructor(
    public dataService: dataService,
    private loadingController: LoadingController,
    private cameraService: CameraService,
    private alertController: AlertController,
    private authService: AuthService) { }

  ngOnInit() {
    this.dataService.getPageEvent.subscribe(message => this.pageEvent = message);
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

}
