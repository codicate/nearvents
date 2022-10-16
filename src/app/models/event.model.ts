import { StringFormat } from "@angular/fire/storage";
import { image } from "./image.model";

export class event {
    name: string;
    location: string;
    description: string;
    banner: string;
    imageArray: image[];
    creatorPlayerID: string;

    constructor(name: string, location: string, description: string, image: string, imageArray: image[], creatorPlayerID: string) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.banner = image;
        this.imageArray = imageArray;
        this.creatorPlayerID = creatorPlayerID;
    }
}