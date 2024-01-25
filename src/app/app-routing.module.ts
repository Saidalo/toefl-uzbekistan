import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotfoundComponent} from "./pages/notfound/notfound.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";
import {TeachersComponent} from "./pages/teachers/teachers.component";
import {ToeflTests} from "./pages/our-tests/tests.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./helpers/auth.guard";
import {UnderConstructionComponent} from "./pages/under-construction/under-construction.component";
import {PreparationComponent} from "./pages/preparation/preparation.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AccountListComponent} from "./pages/account-list/account-list.component";
import {VerificationComponent} from "./pages/verification/verification.component";
import {ProfileComponent} from "./pages/profile/profile.component";
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
    canActivate: [AuthGuard]
  },
  {
    path: 'account-list',
    component: AccountListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'preparation',
    component: PreparationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'our-tests/:test',
    component: ToeflTests,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
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
