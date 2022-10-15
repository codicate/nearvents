import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { event } from './feed/event.model';
import { player } from './leaderboard/player.model';
import { image } from './image-feed/image.model';

import { AuthService } from 'services/auth.service';

@Injectable({
 providedIn: 'root'
})
export class dataService {

  playerArray: player[] = [
    new player(1, "Siddharth Narsipur", "https://i.imgur.com/4dRCI0l.jpg", 100, 1 , null),
    new player(2, "Suchith Hedge", "https://i.imgur.com/S2Je7Rc.jpg", 100, 2, null),
    new player(3, "Henry Liu", "https://i.imgur.com/b5e3WKH.jpg", 100, 3, null)
  ];

  eventArray: event[] = [
    new event(1,100,"Dandyhacks 2022", "Rochester, NY", "https://i.imgur.com/0b1S9Ze.jpg", "Event Description"),
    new event(2,200, "Bengaluru Marathon", "Bangalore Marathon", "https://i.imgur.com/Na5x4Fl.jpg", "Event Description"),
    new event(3,300, "World Wrestling Championship", "Wuhan, China", "https://i.imgur.com/K08RkpX.jpg", "Event Description")
  ]

 currentEvent = new BehaviorSubject(new event(0,900,"TestEvent", "", "", ""));
 getPageEvent = this.currentEvent.asObservable();

 private events = new BehaviorSubject(this.eventArray);
 getEvents = this.events.asObservable();

 private players = new BehaviorSubject(this.playerArray);
 getPlayers = this.players.asObservable();

 constructor(private auth: AuthService) {
 }
 updateEvents(message: event[]) {
 this.events.next(message)
 }

 getPlayerName(eventID: number){
  for (let i = 0; i < this.playerArray.length; i++) {
    if (this.playerArray[i].playerID == eventID) {
      return this.playerArray[i].name;
    }
  }
}

getPlayerPicture(playerName: string) {
    for (let i = 0; i < this.playerArray.length; i++) {
      if (this.playerArray[i].name == playerName) {
        return this.playerArray[i].profilePicture;
      }
    }
 }

 updatePlayers(message: player[]) {
 this.players.next(message)
 }

 getEvent(playerName: string) {
   return event;
 }

 sendPageEvent(message: event) {
   this.currentEvent.next(message);
 }

 getCurrentevent() {
   return this.currentEvent;
 }

}