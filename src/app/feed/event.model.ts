import { StringFormat } from "@angular/fire/storage";

export class event {
    name: string;
    location: string;
    author: string;
    authorURL: string;
    photoURL: string;
    description: string;

    constructor(name: string, location: string, author: string, photoURL: string, authorURL: string, description: string) {
        this.name = name;
        this.location = location;
        this.author = author;
        this.authorURL = authorURL;
        this.photoURL = photoURL;
        this.description = description;
    }
}