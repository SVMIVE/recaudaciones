import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login/login.component';
import { NbSelectModule } from '@nebular/theme';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config),
    NbSelectModule],

  exports: [RouterModule],
})
export class AppRoutingModule {
}
