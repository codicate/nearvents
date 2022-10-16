import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Event from '../models/event.model';
import User from '../models/user.model';
import Image from '../models/image.model';

import { AuthService } from 'services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class dataService {
  playerArray: User[] = [
    new User(
      1,
      'Siddharth Narsipur',
      'https://i.imgur.com/4dRCI0l.jpg',
      100,
      1,
      null
    ),
    new User(
      2,
      'Suchith Hedge',
      'https://i.imgur.com/S2Je7Rc.jpg',
      100,
      2,
      null
    ),
    new User(3, 'Henry Liu', 'https://i.imgur.com/b5e3WKH.jpg', 100, 3, null),
  ];

  eventArray: Event[] = [
    new Event('Dandyhacks 2022', 'Rochester, NY', 'Welcome', '', []),
  ];

  currentEvent = new BehaviorSubject(new Event('', '', '', '', []));

  private events = new BehaviorSubject(this.eventArray);
  getEvents = this.events.asObservable();

  private players = new BehaviorSubject(this.playerArray);
  getPlayers = this.players.asObservable();

  constructor(private auth: AuthService) {}
  updateEvents(message: Event[]) {
    this.events.next(message);
  }

  getPlayerName(eventID: number) {
    for (let i = 0; i < this.playerArray.length; i++) {
      if (this.playerArray[i].playerID == eventID) {
        return this.playerArray[i].name;
      }
    }
  }

  getPlayerPicture(playerName: string) {
    for (let i = 0; i < this.playerArray.length; i++) {
      if (this.playerArray[i].name == playerName) {
        return this.playerArray[i].picture;
      }
    }
  }

  updatePlayers(message: User[]) {
    this.players.next(message);
  }

  getEvent(playerName: string) {
    return event;
  }

  sendPageEvent(message: Event) {
    this.currentEvent.next(message);
  }

  getCurrentevent() {
    return this.currentEvent;
  }
}
