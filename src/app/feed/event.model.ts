export class event {
    name: string;
    location: string;
    author: string;
    photoURL: string;
    description: string;

    constructor(name: string, location: string, author: string, photoURL: string, description: string) {
        this.name = name;
        this.location = location;
        this.author = author;
        this.photoURL = photoURL;
        this.description = description;
    }
}