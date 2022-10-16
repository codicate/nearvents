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
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { CameraService } from './camera.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private cameraService: CameraService
  ) {}

  async register({ email, password }) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async loginWithGoogle() {
    try {
      const { user } = await signInWithPopup(
        this.auth,
        new GoogleAuthProvider()
      );
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (e) {
      console.error(e);
    }
  }

  async getCurrentUser() {
    const user = this.auth.currentUser;
    const docRef = await getDoc(doc(this.firestore, 'users', user.uid));
    return docRef.data();
  }

  async createUser(image, name) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, 'users', user.uid);
    const picture = await this.cameraService.uploadImage(
      image,
      'profile/' + user.uid
    );
    return setDoc(userDocRef, {
      id: user.uid,
      email: user.email,
      name: name.value,
      points: 80,
      rank: 0,
      images: [],
      picture,
    });
  }
}
