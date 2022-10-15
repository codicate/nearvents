import { StringFormat } from "@angular/fire/storage";

export class event {
    playerID: number;
    eventID: number;
    eventName: string;
    eventLocation: string;
    eventPicture: string;
    eventDescription: string;

    constructor(playerID: number, eventID: number, eventName: string, eventLocation: string, eventPicture: string, eventDescription: string) {
        this.playerID = playerID;
        this.eventID = eventID;
        this.eventName = eventName;
        this.eventLocation = eventLocation;
        this.eventPicture = eventPicture;
        this.eventDescription = eventDescription;
    }
}