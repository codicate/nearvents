import { Component, OnInit, Input } from '@angular/core';
import { stringLength } from '@firebase/util';
import { event } from './event.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
    eventArray: event[] = [
      (new event ("Dandyhacks 2022", "Rochester, NY", "Siddharth Narsipur", "https://i.imgur.com/0b1S9Ze.jpg", "University of Rochester’s 42 Hour Hackathon")),
      (new event ("Hack the North 2022", "Waterloo, ON", "Siddharth Narsipur", "https://i.imgur.com/0b1S9Ze.jpg", "University of Waterloo’s 42 Hour Hackathon"))
    ];

  constructor() {
  }

  ngOnInit() {
  }

  onStart(){
    
  }

}
