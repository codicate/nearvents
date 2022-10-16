import { StringFormat } from '@angular/fire/storage';
import Image from './image.model';

export default class Event {
  name: string;
  location: string;
  description: string;
  banner: string;
  imageArray: Image[];

  constructor(
    name: string,
    location: string,
    description: string,
    image: string,
    imageArray: Image[]
  ) {
    this.name = name;
    this.location = location;
    this.description = description;
    this.banner = image;
    this.imageArray = imageArray;
  }
}
