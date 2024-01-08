import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.scss']
})
export class AllExamsComponent {
  tableName = 'Exams';
  exams: any[] = [];
  isLoading = false;


  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit() {
    this.updateExams();
  }

  updateExams(){
    this.isLoading = true;

    this.adminService.allAnyTable({tableName: this.tableName}).subscribe({
      next: (accounts: any) => {
        this.exams = accounts.items;

        this.isLoading = false;
      },
      error: error => {
        console.log(error);

        this.isLoading = false;
      }
    });
  }
}
