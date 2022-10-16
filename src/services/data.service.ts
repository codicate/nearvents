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
      'Siddharth Narsipur',
      'https://i.imgur.com/4dRCI0l.jpg',
      1000,
      1,
      [],
      '101'
    ),
    new User(
      'Suchith Hedge',
      'https://i.imgur.com/S2Je7Rc.jpg',
      1000,
      2,
      [],
      '102'
    ),
    new User(
      'Henry Liu',
      'https://i.imgur.com/b5e3WKH.jpg',
      1000,
      3,
      [],
      '103'
    ),
  ];

  eventArray: Event[] = [
    new Event(
      'Dandyhacks 2022',
      'Rochester, NY',
      'Welcome',
      'https://i.imgur.com/5Fu6VcT.jpg',
      [],
      '101'
    ),
    new Event(
      'World Chess Championship',
      'Berlin, Germany',
      'Welcome',
      'https://i.imgur.com/nYHosgL.jpg',
      [],
      '102'
    ),
    new Event(
      'FIFA World Cup',
      'Moscow, Russia',
      'Welcome',
      'https://i.imgur.com/CzgIJ5Z.jpg',
      [],
      '103'
    ),
  ];

  imageArray: Image[] = [];

  currentEvent = new BehaviorSubject(new Event('', '', '', '', [], ''));
  getPageEvent = this.currentEvent.asObservable();

  private events = new BehaviorSubject(this.eventArray);
  getEvents = this.events.asObservable();

  private players = new BehaviorSubject(this.playerArray);
  getPlayers = this.players.asObservable();

  constructor(private auth: AuthService) {}

  updateEvents(message: Event[]) {
    this.events.next(message);
  }

  getPlayerName(creatorPlayerID: string) {
    for (let i = 0; i < this.playerArray.length; i++) {
      if (this.playerArray[i].playerID == creatorPlayerID) {
        return this.playerArray[i].name;
      }
    }
  }
  getPlayerPicture(creatorPlayerID: string) {
    for (let i = 0; i < this.playerArray.length; i++) {
      if (this.playerArray[i].playerID == creatorPlayerID) {
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
