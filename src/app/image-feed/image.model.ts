export class image {
    imageID: number;
    eventID: number;
    imageURL: string;


    constructor(imageID: number, eventID: number, imageURL: string) {
        this.imageID = imageID;
        this.eventID = eventID;
        this.imageURL = imageURL;
    }
}