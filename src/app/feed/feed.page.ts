import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Event from '../../models/event.model';
import { Router, RouterModule } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { AuthService } from 'services/auth.service';
import { CameraService } from 'services/camera.service';
import { EventService } from 'services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dataService } from 'services/data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  credentials: FormGroup;
  events = [];
  user = null;
  image = null;

  constructor(
    private dataService: dataService,
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService,
    private eventService: EventService
  ) {}

  get name() {
    return this.credentials.get('name');
  }

  get description() {
    return this.credentials.get('description');
  }

  async ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required]],
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
    this.dataService.getCurrentID(id);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss('test what is this', 'confirm');
  }

  async doRefresh(event) {
    this.events = await this.eventService.getAllEvents();
    event.target.complete();
  }

  async takePicture() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });
  }

  async createEvent() {
    if (this.image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const coordinates = await Geolocation.getCurrentPosition();
      console.log(coordinates);
      const result = await this.eventService.createEvent(
        this.image,
        this.user.id,
        this.name,
        [coordinates.coords.latitude, coordinates.coords.longitude],
        this.description
      );
      await loading.dismiss();

      this.modal.dismiss(null, 'cancel');
    }
  }
}
