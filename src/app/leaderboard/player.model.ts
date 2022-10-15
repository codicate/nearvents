export class player {
    name: string;
    profilePicture: string;
    points: number;

    constructor(name: string, profilePicture: string, points: number) {
        this.name = name;
        this.profilePicture = profilePicture;
        this.points = points;
    }
}