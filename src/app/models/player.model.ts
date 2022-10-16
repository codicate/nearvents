import { image } from 'app/models/image.model';

export class player {
    name: string;
    picture: string;
    rank: number;
    playerID: number;
    imageArray: image[];
    points: number;

    constructor(playerID: number, name: string, picture: string, points: number, rank: number, image: image[]) {
        this.playerID = playerID;
        this.name = name;
        this.picture = picture;
        this.points = points;
        this.rank = rank;
        this.imageArray = image;
    }
}