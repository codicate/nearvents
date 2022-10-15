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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register({ email, password }) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.createUserDocument(user);
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
      const snapshot = await getDoc(doc(this.firestore, `users/${user.uid}`));
      if (!snapshot.exists()) {
        this.createUserDocument(user);
      }
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

  getCurrentUser() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  private createUserDocument(user) {
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return setDoc(userDocRef, {
      id: user.uid,
      email: user.email,
      // displayName: user.displayName,
      // imageUrl: user.photoURL,
    });
  }
}
