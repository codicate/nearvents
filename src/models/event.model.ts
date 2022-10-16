import { StringFormat } from '@angular/fire/storage';
import Image from './image.model';

export default class Event {
  name: string;
  location: string;
  description: string;
  banner: string;
  imageArray: Image[];
  creatorPlayerID: string;

  constructor(
    name: string,
    location: string,
    description: string,
    image: string,
    imageArray: Image[],
    creatorPlayerID: string
  ) {
    this.name = name;
    this.location = location;
    this.description = description;
    this.banner = image;
    this.imageArray = imageArray;
    this.creatorPlayerID = creatorPlayerID;
  }
}
