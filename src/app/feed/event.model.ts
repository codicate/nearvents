import { StringFormat } from "@angular/fire/storage";

export class event {
    playerID: number;
    eventName: string;
    eventLocation: string;
    eventCreator: string;
    eventPicture: string;
    eventDescription: string;

    constructor(playerID: number, eventName: string, eventLocation: string, eventCreator: string, eventPicture: string, eventDescription: string) {
        this.playerID = playerID;
        this.eventName = eventName;
        this.eventLocation = eventLocation;
        this.eventCreator = eventCreator;
        this.eventPicture = eventPicture;
        this.eventDescription = eventDescription;
    }
}