import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventpagePageRoutingModule } from './eventpage-routing.module';

import { EventpagePage } from './eventpage.page';

import { ImageFeedComponent } from 'app/image-feed/image-feed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventpagePageRoutingModule
  ],
  declarations: [EventpagePage, ImageFeedComponent]
})
export class EventpagePageModule {}
