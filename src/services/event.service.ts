import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private auth: Auth, private firestore: Firestore) {}

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
      events.map(async (e) => {
        const creator = await this.getPlayer(e.creatorPlayerID);
        e.creator = creator.data();
      });
      return events;
    } catch (e) {
      console.error(e);
    }
  }

  async createEvent(event) {
    try {
      await addDoc(collection(this.firestore, 'events'), event);
    } catch (e) {
      console.error(e);
    }
  }
}
