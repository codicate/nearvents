import { image } from 'app/image-feed/image.model';

export class player {
    rank: number
    name: string;
    profilePicture: string;
    points: number;
    playerID: number;
    images: image[];


    constructor(rank: number, name: string, profilePicture: string, points: number, playerID: number, images: image[]) {
        this.rank = rank;
        this.name = name;
        this.profilePicture = profilePicture;
        this.points = points;
        this.playerID = playerID;
        this.images = images;
    }
}