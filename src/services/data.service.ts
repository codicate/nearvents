import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { event } from '../app/models/event.model';
import { image } from '../app/models/image.model';
import { player } from '../app/models/player.model';

import { AuthService } from 'services/auth.service';

@Injectable({
 providedIn: 'root'
})
export class dataService {

  playerArray: player[] = [
    new player("Siddharth Narsipur","https://i.imgur.com/4dRCI0l.jpg", 1,"101",[],1000),
    new player("Suchith Hedge","https://i.imgur.com/S2Je7Rc.jpg",2,"102",[],1000),
    new player("Henry Liu","https://i.imgur.com/b5e3WKH.jpg",3,"103",[],1000),
  ];

  eventArray: event[] = [
    new event("Dandyhacks 2022","Rochester, NY","Welcome","https://i.imgur.com/5Fu6VcT.jpg",[],"101"),
    new event("World Chess Championship","Berlin, Germany","Welcome","https://i.imgur.com/nYHosgL.jpg",[],"102"),
    new event("FIFA World Cup","Moscow, Russia","Welcome","https://i.imgur.com/CzgIJ5Z.jpg",[],"103"),
  ]

 imageArray: image[] = [];

 currentEvent = new BehaviorSubject(new event("","","","", [],""));
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

 getPlayerName(creatorPlayerID: string){
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