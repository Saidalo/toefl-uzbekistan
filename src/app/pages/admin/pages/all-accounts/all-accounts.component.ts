import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdminService} from "../../services/admin.service";
import {FormControl} from "@angular/forms";
import {NotifierService} from "angular-notifier";
@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {
  @ViewChild('moreActions') moreActionsModal: any;
  @ViewChild('editScore') editScore: any;
  accounts: any[] = [];
  isLoading = false;
  isExamsLoading = false;
  accounts$: any;
  selectedAccount: any;
  exams: any[] = [];
  filter = new FormControl('', { nonNullable: true });
  selectedExam: any;
  notifier: NotifierService;


  constructor(private adminService: AdminService,
              private modalService: NgbModal,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.updateAccounts();
  }

  updateAccounts(){
    this.isLoading = true;

    this.adminService.allAccounts().subscribe({
      next: (accounts: any) => {
        this.accounts = accounts.users;

        this.isLoading = false;
      },
      error: error => {
        console.log(error);

        this.isLoading = false;
      }
    });
  }

  openMoreActions(account: any) {
    this.selectedAccount = account;
    this.isExamsLoading = true;
    this.adminService.getExamsByUserById(account.id).subscribe({
      next: (exams: any) => {
        this.exams = exams.exams;
        this.isExamsLoading = false;
      },
      error: error => {
        console.log(error);
        this.isExamsLoading = false;
      }
    });
    this.modalService.open(this.moreActionsModal, { size: 'xl' });
  }

  updateScores(){
    this.isExamsLoading = true;
    if(this.selectedExam.score === null || this.selectedExam.score === undefined){
      this.selectedExam.score = 0;
    }
    const scores = {
      scores:[
        {
          account_id: this.selectedAccount.id,
          exam_id: this.selectedExam.exam_id,
          score: this.selectedExam.score
        }
      ]
    }
    this.adminService.updateScores(scores).subscribe({
      next: (res: any) => {
        this.isExamsLoading = false;
        this.notifier.notify('success', 'Score updated successfully');
      },
      error: error => {
        this.notifier.notify('error', 'Score not updated');
        this.isExamsLoading = false;
      }
    });
  }

  openEditScore(exam: any){
    this.selectedExam = exam;
    this.modalService.open(this.editScore);
  }
}
