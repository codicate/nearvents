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
  setDoc,
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
}
