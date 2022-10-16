import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { stringLength } from '@firebase/util';
import Event from 'models/event.model';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'services/auth.service';
import { CameraService } from 'services/camera.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'services/event.service';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  pageEvent: Event;
  user = null;
  orderby: string;
  name: string;
  event = null;
  blur = true;

  constructor(
    private router: Router,
    private eventService: EventService,
    public dataService: DataService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private cameraService: CameraService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.dataService.getID.subscribe(async (message) => {
      const user = await this.authService.getCurrentUser();
      if (message) {
        if (message === user.id || user.events.includes(message)) {
          this.blur = false;
        }

        const ev = await this.eventService.getEvent(message);
        this.user = user;
        this.event = ev;
        console.log(ev);
      }
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  goToMap() {
    this.router.navigateByUrl('tabs/tabs/map', {
      replaceUrl: true,
    });
  }
  

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    const success = await this.eventService.participateEvent(
      image,
      this.event.creatorPlayerID,
      this.user.id
    );

    if (success) {
      this.blur = false;
    }
  }
}
