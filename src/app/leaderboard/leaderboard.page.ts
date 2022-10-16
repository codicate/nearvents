import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';
import { dataService } from '../../services/data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  playerArray: User[] = [];

  constructor(private dataService: dataService) {}

  ngOnInit() {
    this.dataService.getPlayers.subscribe(
      (message) => (this.playerArray = message)
    );
  }

  onStart() {}
}
