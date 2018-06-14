import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';
import { TodosComponent } from './todos/todos.component';
import { WodSearchComponent } from './wod-search/wod-search.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodsComponent } from './wods/wods.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wod/:id', component: WodsDetailComponent },
  { path: 'wods', component: WodsComponent },
  { path: 'wod/search/:keyword', component: WodSearchComponent},
  { path: 'todos', component: TodosComponent},
  { path: 'todo/:id', component: TodosDetailComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}