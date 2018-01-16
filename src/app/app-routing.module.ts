import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WodsComponent }        from './wods/wods.component';
import { WodsDetailComponent }  from './wods-detail/wods-detail.component'

import { DashboardComponent }   from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: WodsDetailComponent },
  { path: 'wods', component: WodsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}