import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdminService} from "../../services/admin.service";
import {FormControl} from "@angular/forms";
@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.scss']
})
export class AllAccountsComponent implements OnInit {
  accounts: any[] = [];
  isLoading = false;
  accounts$: any;
  selectedAccount: any;
  filter = new FormControl('', { nonNullable: true });


  constructor(private adminService: AdminService, private modalService: NgbModal) { }

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
}
