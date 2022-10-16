import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Event from '../../models/event.model';
import { Router, RouterModule } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'services/auth.service';
import { CameraService } from 'services/camera.service';
import { EventService } from 'services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  credentials: FormGroup;
  user = null;
  events = [];
  upload = false;
  userEventName: string;
  userEventDescription: string;
  userEventLocation: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private cameraService: CameraService,
    private eventService: EventService
  ) {}

  get name() {
    return this.credentials.get('name');
  }

  get location() {
    return this.credentials.get('location');
  }

  get description() {
    return this.credentials.get('description');
  }

  async ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
    this.events = await this.eventService.getAllEvents();
  }

  onEventClick(id) {
    console.log('Clicked');
    this.router.navigateByUrl('tabs/tabs/eventpage/' + id, {
      replaceUrl: true,
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('test what is this', 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event;
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

  createEvent() {}
}
