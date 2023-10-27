import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotfoundComponent} from "./pages/notfound/notfound.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {TeachersComponent} from "./pages/teachers/teachers.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";


const routes: Routes = [
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'teachers',
    component: TeachersComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
