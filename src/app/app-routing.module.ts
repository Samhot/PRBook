import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MouvementsDetailComponent } from './mouvements-detail/mouvements-detail.component';
import { MouvementsComponent } from './mouvements/mouvements.component';
import { AuthGuard } from './services/auth-guard.service';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';
import { TodosComponent } from './todos/todos.component';
import { WodSearchComponent } from './wod-search/wod-search.component';
import { WodsDetailComponent } from './wods-detail/wods-detail.component';
import { WodsComponent } from './wods/wods.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '**', redirectTo: '/dashboard' },
  { path: 'wod/:id', component: WodsDetailComponent },
  { path: 'wods', component: WodsComponent },
  { path: 'wod/search/:keyword', component: WodSearchComponent},
  { path: 'todos', component: TodosComponent},
  { path: 'todo/:id', component: TodosDetailComponent },
  { path: 'mouvs', component: MouvementsComponent },
  { path: 'mouv/:id', component: MouvementsDetailComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: '',
    //     // canActivateChild: [AuthGuard],
    //     children: [
    //       // { path: '', redirectTo: 'admin', pathMatch: 'full' },
    //     ]
    //   }
    // ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}
