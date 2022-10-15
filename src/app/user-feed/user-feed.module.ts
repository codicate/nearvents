import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserFeedPageRoutingModule } from './user-feed-routing.module';

import { UserFeedPage } from './user-feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserFeedPageRoutingModule
  ],
  declarations: [UserFeedPage]
})
export class UserFeedPageModule {}
