import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { stringLength } from '@firebase/util';
import Event from 'models/event.model';
import { Router, RouterModule } from '@angular/router';
import { dataService } from '../../services/data.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'services/auth.service';
import { CameraService } from 'services/camera.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  pageEvent: Event;
  upload = false;
  user = null;
  orderby: string;
  userID: string;
  
  @ViewChild(IonModal) modal: IonModal;

  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event;
  }

  constructor(
    private route: ActivatedRoute,
    public dataService: dataService,
    private loadingController: LoadingController,
    private cameraService: CameraService,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataService.getID.subscribe(
      (message) => (this.userID = message)
    );
    console.log("The user id is", this.userID)
  }
  }

