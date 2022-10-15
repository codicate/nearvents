import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { stringLength } from '@firebase/util';
import { event } from './event.model';
import { Router, RouterModule } from '@angular/router';
import { dataService } from '../data.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'services/auth.service';
import { CameraService } from 'services/camera.service';
import { AlertController, LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  user = null;
  eventArray: event[] = [];
  upload: boolean = false;


  userEventName: string;
  userEventDescription: string;
  userEventLocation: string;

  constructor(private router: Router, 
    public dataService: dataService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private cameraService: CameraService
    ) {}

  ngOnInit() {
    this.dataService.getEvents.subscribe(message => this.eventArray = message);
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  onEventClick(){
    console.log("Clicked");
    //this.router.navigate(['eventpage']);
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


  submitUserEvent() {
  this.dataService.eventArray.unshift(new event(4,this.userEventName, this.userEventLocation, "Siddharth Narsipur", this.user.imageUrl, this.userEventDescription));
  }


}
