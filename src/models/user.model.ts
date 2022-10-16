import Image from 'models/image.model';

export default class User {
  name: string;
  picture: string;
  rank: number;
  playerID: number;
  imageArray: Image[];
  points: number;

  constructor(
    playerID: number,
    name: string,
    picture: string,
    points: number,
    rank: number,
    image: Image[]
  ) {
    this.playerID = playerID;
    this.name = name;
    this.picture = picture;
    this.points = points;
    this.rank = rank;
    this.imageArray = image;
  }
}
