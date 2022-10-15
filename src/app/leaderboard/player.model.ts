export class player {
    rank: number
    name: string;
    profilePicture: string;
    points: number;

    constructor(rank: number, name: string, profilePicture: string, points: number) {
        this.rank = rank;
        this.name = name;
        this.profilePicture = profilePicture;
        this.points = points;
    }
}