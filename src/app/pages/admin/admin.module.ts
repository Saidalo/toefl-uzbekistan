import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AllAccountsComponent } from './pages/all-accounts/all-accounts.component';
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableComponent } from './widgets/table/table.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AllExamsComponent } from './pages/all-exams/all-exams.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AdminComponent,
    AllAccountsComponent,
    TableComponent,
    AllExamsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule.forChild([
      {
        path: "",
        component: AdminComponent,
        children: [
          {path: "all-accounts", component: AllAccountsComponent},
          {path: "all-exams", component: AllExamsComponent}
        ]
      }
    ]),
    MatInputModule,
    MatDatepickerModule,
    NgbInputDatepicker
  ]
})
export class AdminModule { }
