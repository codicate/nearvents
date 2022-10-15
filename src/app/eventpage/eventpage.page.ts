import { Component, OnInit } from '@angular/core';
import { dataService } from 'app/data.service';
import { event } from 'app/feed/event.model';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  pageEvent: event;

  constructor(public dataService: dataService) { }

  ngOnInit() {
    this.dataService.getPageEvent.subscribe(message => this.pageEvent = message);
  }

}
