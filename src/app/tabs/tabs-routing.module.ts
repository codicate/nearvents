import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () =>
          import('../feed/feed.module').then((m) => m.FeedPageModule),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'leaderboard',
        loadChildren: () =>
          import('../leaderboard/leaderboard.module').then(
            (m) => m.LeaderboardPageModule
          ),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'eventpage/:id',
        loadChildren: () =>
          import('../eventpage/eventpage.module').then(
            (m) => m.EventpagePageModule
          ),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
        ...canActivate(redirectUnauthorizedToLogin),
      },
      {
        path: 'map',
        loadChildren: () =>
          import('../map/map.module').then((m) => m.MapPageModule),
        ...canActivate(redirectUnauthorizedToLogin),
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
