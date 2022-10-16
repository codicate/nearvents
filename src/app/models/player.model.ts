import { image } from 'app/models/image.model';

export class player {
    name: string;
    picture: string;
    rank: number;
    playerID: string;
    imageArray: image[];
    points: number;

    constructor(name: string, picture: string, rank: number, playerID: string, imageArray: image[], points: number) {
        this.name = name;
        this.picture = picture;
        this.rank = rank;
        this.playerID = playerID;
        this.imageArray = imageArray;
        this.points = points;
    }
}