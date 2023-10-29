import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotfoundComponent} from "./pages/notfound/notfound.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {TeachersComponent} from "./pages/teachers/teachers.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./helpers/auth.guard";
import {UnderConstructionComponent} from "./pages/under-construction/under-construction.component";
import {PreparationComponent} from "./pages/preparation/preparation.component";


const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'contact',
    component: ContactsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preparation',
    component: PreparationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'under-construction',
    component: UnderConstructionComponent
  },
  {
    path: '**',
    redirectTo: '/404',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
