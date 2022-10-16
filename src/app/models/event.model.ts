import { StringFormat } from "@angular/fire/storage";
import { image } from "./image.model";

export class event {
    name: string;
    location: string;
    description: string;
    banner: string;
    imageArray: image[];

    constructor(name: string, location: string, description: string, image: string, imageArray: image[]) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.banner = image;
        this.imageArray = imageArray;
    }
}