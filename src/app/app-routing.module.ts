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
import {ToeflItpComponent} from "./pages/toefl-itp/toefl-itp.component";
import {ToeflIbtComponent} from "./pages/toefl-ibt/toefl-ibt.component";
import {ToeicComponent} from "./pages/toeic/toeic.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AccountListComponent} from "./pages/account-list/account-list.component";
import {VerificationComponent} from "./pages/verification/verification.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import { BlogsComponent } from './pages/blogs/blogs.component';
const adminModule = () =>
  import("./pages/admin/admin.module").then((x) => x.AdminModule);



const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verification',
    component: VerificationComponent,
  },
  {
    path: 'contact',
    component: ContactsComponent,
    canActivate: []
  },
  {
    path: 'account-list',
    component: AccountListComponent,
    canActivate: [],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: []
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: []
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: []
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: []
  },
  {
    path: 'preparation',
    component: PreparationComponent,
    canActivate: []
  },
  {
    path: 'toefl-itp',
    component: ToeflItpComponent,
    canActivate: []
  },
  {
    path: 'toefl-ibt',
    component: ToeflIbtComponent,
    canActivate: []
  },
  {
    path: 'toeic',
    component: ToeicComponent,
    canActivate: []
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blogs/:blog',
    component: BlogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "admin",
    loadChildren: adminModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'under-construction',
    component: UnderConstructionComponent
  },
  {
    path: '**',
    redirectTo: '/under-construction',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
