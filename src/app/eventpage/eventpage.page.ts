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
  upload = false;
  user = null;
  orderby: string;
  userID = null;
  name: string;
  event = null;

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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  goToMap(){
    this.router.navigateByUrl('tabs/tabs/map', {
      replaceUrl: true,
    });
  }

  takePicture(){}

  async ngOnInit() {
    this.dataService.getID.subscribe(async (message) => {
      this.userID = message;
      if(message) this.event = await this.eventService.getEvent(message);
      console.log("event is", this.event)
    });
    console.log('The user id is', this.userID);
    
    
  }
}
