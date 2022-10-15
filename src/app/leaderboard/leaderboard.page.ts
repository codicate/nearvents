import { Component, OnInit } from '@angular/core';
import { player } from './player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  playerArray: player[] = [
    (new player ("Herry Liu", "https://i.imgur.com/0b1S9Ze.jpg", 100)),
    (new player ("Leo He", "https://i.imgur.com/0b1S9Ze.jpg", 200)),
    (new player ("Grass Mud Horse", "https://i.imgur.com/0b1S9Ze.jpg", 150))
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onStart(){
    
  }

}
