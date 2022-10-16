import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./info/info.module').then((m) => m.InfoPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
