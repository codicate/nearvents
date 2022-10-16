import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () =>
          import('../feed/feed.module').then((m) => m.FeedPageModule),
      },
      {
        path: 'leaderboard',
        loadChildren: () =>
          import('../leaderboard/leaderboard.module').then(
            (m) => m.LeaderboardPageModule
          ),
      },
      {
        path: 'eventpage/:id',
        loadChildren: () =>
          import('../eventpage/eventpage.module').then(
            (m) => m.EventpagePageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'user-feed',
        loadChildren: () =>
          import('../user-feed/user-feed.module').then(
            (m) => m.UserFeedPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'tabs/feed',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/feed',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
