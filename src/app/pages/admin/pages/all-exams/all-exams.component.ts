import {Component, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AdminService} from "../../services/admin.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-all-exams',
  templateUrl: './all-exams.component.html',
  styleUrls: ['./all-exams.component.scss']
})
export class AllExamsComponent {
  @ViewChild('moreActions') moreActionsModal: any;
  tableName = 'Exams';
  exams: any[] = [];
  isLoading = false;
  selectedAccunt: any;
  isAccountsLoading = false;
  accounts: any[] = [];
  response: any[] = [];
  notifier: any;

  constructor(private adminService: AdminService,
              private modalService: NgbModal,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

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

  openRegisteredAccountModal(exam: any) {
    this.selectedAccunt = exam;
    this.isAccountsLoading = true;
    this.adminService.getUsersByExam(exam.exam_id).subscribe({
      next: (exams: any) => {
        this.accounts = exams.accounts;
        this.response = [];
        this.accounts.forEach((account: any) => {
          if(account.payment === 1){
            account.payment = true;
          }
          this.response.push({
            account_id: account.id,
            exam_id: exam.exam_id,
            reading: account.reading,
            listening: account.listening,
            speaking: account.speaking,
            writing: account.writing,
            payment: account.payment,
          });
        });
        this.isAccountsLoading = false;
      },
      error: error => {
        console.log(error);
        this.isAccountsLoading = false;
      }
    });
    this.modalService.open(this.moreActionsModal, { size: 'xl' });
  }

  saveScores(){
    this.isAccountsLoading = true;
    const scores = {
      scores:this.response
    }
    this.adminService.updateScores(scores).subscribe({
      next: (res: any) => {
        this.isAccountsLoading = false;
        this.notifier.notify('success', 'Score updated successfully');
      },
      error: error => {
        this.notifier.notify('error', 'Score not updated');
        this.isAccountsLoading = false;
      }
    });
  }
}
