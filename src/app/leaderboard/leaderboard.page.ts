import { Component, OnInit } from '@angular/core';
import { EventService } from 'services/event.service';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  players = [];

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.authService.subscribeToUserUpdates(async () => {
      this.players = await this.eventService.getAllPlayers();
      this.players.sort((a, b) => b.points - a.points);
    });
  }

  async doRefresh(event) {
    this.players = await this.eventService.getAllPlayers();
    this.players.sort((a, b) => b.points - a.points);
    event.target.complete();
  }

  onStart() {}
}
