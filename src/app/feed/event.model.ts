import { StringFormat } from "@angular/fire/storage";

export class event {
    playerID: number;
    eventID: number;
    eventName: string;
    eventLocation: string;
    eventPicture: string;
    eventDescription: string;
    imageIDArray: string[];

    constructor(playerID: number, eventID: number, eventName: string, eventLocation: string, eventPicture: string, eventDescription: string, imageIDArray: string[]) {
        this.playerID = playerID;
        this.eventID = eventID;
        this.eventName = eventName;
        this.eventLocation = eventLocation;
        this.eventPicture = eventPicture;
        this.eventDescription = eventDescription;
        this.imageIDArray = imageIDArray;
    }
}