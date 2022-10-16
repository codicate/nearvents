import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  setDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { CameraService } from './camera.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private cameraService: CameraService
  ) {}

  async getAllPlayers() {
    try {
      const users = await getDocs(collection(this.firestore, 'users'));
      return users.docs.map((d) => d.data());
    } catch (e) {
      console.error(e);
    }
  }

  async getPlayer(id) {
    try {
      const user = await getDoc(doc(this.firestore, 'users', id));
      return user.data();
    } catch (e) {
      console.error(e);
    }
  }

  async getAllEvents() {
    try {
      const eventsSnapshot = await getDocs(
        collection(this.firestore, 'events')
      );
      const eventsData = eventsSnapshot.docs.map((d) => d.data());
      const events = await Promise.all(
        eventsData.map(async (e) => {
          const creator = await this.getPlayer(e.creatorPlayerID);
          return { ...e, creator };
        })
      );
      events.sort((a: any, b: any) => b.createdAt - a.createdAt);
      return events;
    } catch (e) {
      console.error(e);
    }
  }

  async getEvent(id) {
    try {
      const q = query(
        collection(this.firestore, 'events'),
        where('creatorPlayerID', '==', id)
      );
      const querySnapshot = await getDocs(q);

      const event = querySnapshot.docs.map((d) => d.data())[0];
      const creator = await this.getPlayer(event.creatorPlayerID);
      event.creator = creator;

      return event;
    } catch (e) {
      console.error(e);
    }
  }

  async createEvent(creatorPlayerID, rawImage, name, coordinates, description) {
    try {
      const image = await this.cameraService.uploadImage(
        rawImage,
        'event/' + creatorPlayerID
      );
      await setDoc(doc(this.firestore, 'events', creatorPlayerID), {
        name: name.value,
        location: coordinates,
        description: description.value,
        banner: image,
        imageArray: [],
        creatorPlayerID,
        createdAt: Timestamp.now(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async participateEvent(rawImage, creatorPlayerID, playerID) {
    try {
      const image = await this.cameraService.uploadImage(
        rawImage,
        'event/' + creatorPlayerID + '/' + playerID
      );

      const event = await this.getEvent(creatorPlayerID);
      event.imageArray.push(image);
      await setDoc(doc(this.firestore, 'events', creatorPlayerID), event);

      const player = await this.getPlayer(playerID);
      player.events.push(creatorPlayerID);
      await setDoc(doc(this.firestore, 'users', playerID), player);
    } catch (e) {
      console.error(e);
    }
  }
}
