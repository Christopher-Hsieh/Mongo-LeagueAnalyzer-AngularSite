import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroesComponent }      from './components/heroes/heroes.component';
import { HeroDetailComponent }  from './components/heroDetail/hero-detail.component';
import { SandboxComponent }        from './components/sandbox/sandbox.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'sandbox',
    component: SandboxComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
