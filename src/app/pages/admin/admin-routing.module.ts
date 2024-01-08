import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AllAccountsComponent} from "./pages/all-accounts/all-accounts.component";
import {AllExamsComponent} from "./pages/all-exams/all-exams.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'all-accounts', component: AllAccountsComponent },
      { path: 'all-exams', component: AllExamsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
