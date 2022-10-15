import { event } from "app/feed/event.model";

export class player {
    rank: number
    name: string;
    profilePicture: string;
    points: number;
    playerID: number;


    constructor(rank: number, name: string, profilePicture: string, points: number, playerID: number) {
        this.rank = rank;
        this.name = name;
        this.profilePicture = profilePicture;
        this.points = points;
        this.playerID = playerID;
    }
}