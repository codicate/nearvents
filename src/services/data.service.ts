import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Image from '../models/image.model';

@Injectable({
  providedIn: 'root',
})
export class dataService {

  imageArray: Image[] = [];

  currentID = new BehaviorSubject("");
  getID = this.currentID.asObservable();

  constructor() {}

  getCurrentID(message: string){
    this.currentID.next(message);
  }
}
