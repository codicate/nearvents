import { Component, OnInit } from '@angular/core';
import User from '../../models/user.model';
import { EventService } from 'services/event.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  players = [];

  constructor(private eventService: EventService) {}

  async ngOnInit() {
    this.players = await this.eventService.getAllPlayers();
    console.log(this.players);
    this.players.sort((a, b) => b.points - a.points);
  }

  onStart() {}
}
