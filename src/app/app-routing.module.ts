import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['tabs']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninPageModule),
    ...canActivate(redirectLoggedInToItems),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'eventpage',
    loadChildren: () =>
      import('./eventpage/eventpage.module').then((m) => m.EventpagePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'user-feed',
    loadChildren: () => import('./user-feed/user-feed.module').then( m => m.UserFeedPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
