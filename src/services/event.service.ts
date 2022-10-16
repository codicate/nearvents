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
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async getAllEvents() {
    try {
      const eventsSnapshot = await getDocs(
        collection(this.firestore, 'events')
      );
      const events = eventsSnapshot.docs.map((d) => d.data());
      await Promise.all(
        events.map(async (e) => {
          const creator = await this.getPlayer(e.creatorPlayerID);
          e.creator = creator.data();
        })
      );
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
      event.creator = creator.data();

      return event;
    } catch (e) {
      console.error(e);
    }
  }

  async createEvent(rawImage, creatorPlayerID, name, coordinates, description) {
    try {
      const image = await this.cameraService.uploadImage(
        rawImage,
        'event/' + creatorPlayerID
      );
      await addDoc(collection(this.firestore, 'events'), {
        name: name.value,
        location: coordinates,
        description: description.value,
        banner: image,
        imageArray: [],
        creatorPlayerID,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
