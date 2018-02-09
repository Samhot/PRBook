import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { WodsComponent }        from './wods/wods.component';
import { WodsDetailComponent }  from './wods-detail/wods-detail.component'

import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { WodSearchComponent } from './wod-search/wod-search.component';
import { TodosComponent } from './todos/todos.component';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';
import { HomeComponent } from './home/home.component'

// import { PublicDealsComponent } from './public-deals/public-deals.component';
// import { PrivateDealsComponent } from './private-deals/private-deals.component';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wod/:id', component: WodsDetailComponent },
  { path: 'wods', component: WodsComponent },
  { path: 'wod/search/:keyword', component: WodSearchComponent},
  { path: 'todos', component: TodosComponent},
  { path: 'todo/:id', component: TodosDetailComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'deals', component: PublicDealsComponent },
  // { path: 'special', component: PrivateDealsComponent},
  { path: 'connected', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}