import {Component, OnInit} from '@angular/core';
import {environment} from "../../../enviroments/enviroment";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../layouts/dialog/dialog.component";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit{

  imgSrc = environment.apiUrl + '/account/image/';
  acounts: any;
  fullPage = document.querySelector('#fullpage');
  constructor(private http: HttpClient,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.requestAccounts().subscribe((res: any) => {
      console.log(res.data);
      this.acounts = res.data;
    });
  }
  public requestAccounts(){
    return this.http.get(
      environment.apiUrl + '/account/all',
      {
      }
    ).pipe(map(res => {return res;}));
  }

  openDialog(src: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: src,
    });
  }
}
