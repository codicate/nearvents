import { Component, OnInit, Input } from '@angular/core';
import { stringLength } from '@firebase/util';
import { event } from './event.model';
import { Router, RouterModule } from '@angular/router';
import { dataService } from '../data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  eventArray: event[] = [];

  constructor(private router: Router, public dataService: dataService) {
  }

  ngOnInit() {
    this.dataService.getEvents.subscribe(message => this.eventArray = message);
  }

  onEventClick(){
    console.log("Clicked");
    this.router.navigate(['eventpage']);

  }

}
