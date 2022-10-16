import Image from 'models/image.model';

export default class User {
  name: string;
  picture: string;
  rank: number;
  playerID: string;
  imageArray: Image[];
  points: number;

  constructor(
    name: string,
    picture: string,
    points: number,
    rank: number,
    image: Image[],
    playerID: string
  ) {
    this.name = name;
    this.picture = picture;
    this.points = points;
    this.rank = rank;
    this.imageArray = image;
    this.playerID = playerID;
  }
}
