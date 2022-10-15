import { Component, OnInit, Input } from '@angular/core';
import { stringLength } from '@firebase/util';
import { event } from './event.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
    eventArray: event[] = [
      (new event ("Dandyhacks 2022", "Rochester, NY", "Siddharth Narsipur", "https://i.imgur.com/0b1S9Ze.jpg", "https://i.imgur.com/4dRCI0l.jpg", "University of Rochester’s 42 Hour Hackathon")),
      (new event ("Dandyhacks 2022", "Rochester, NY", "Siddharth Narsipur", "https://i.imgur.com/0b1S9Ze.jpgg", "https://i.imgur.com/4dRCI0l.jpg",  "University of Rochester’s 42 Hour Hackathon"))
    ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onEventClick(){
    this.eventArray = [];
    console.log("Clicked");
    this.router.navigate(['eventpage']);

  }

}
