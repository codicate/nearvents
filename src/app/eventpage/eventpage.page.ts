import { Component, OnInit } from '@angular/core';
import { event } from '../feed/event.model';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  eventArray: event[] = [
    (new event ("Dandyhacks 2022", "Rochester, NY", "Siddharth Narsipur", "https://i.imgur.com/0b1S9Ze.jpg", "https://i.imgur.com/4dRCI0l.jpg", "University of Rochester’s 42 Hour Hackathon")),
    (new event ("Dandyhacks 2022", "Rochester, NY", "Siddharth Narsipur", "https://i.imgur.com/0b1S9Ze.jpgg", "https://i.imgur.com/4dRCI0l.jpg",  "University of Rochester’s 42 Hour Hackathon"))
  ];

  constructor() { }

  ngOnInit() {
  }

}
