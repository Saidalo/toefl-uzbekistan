import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../enviroments/enviroment";
import {map} from "rxjs";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private http: HttpClient,public dialog: MatDialog) { }

  account: any;
  ngOnInit() {
    this.requestAccounts().subscribe((res: any) => {
      console.log(res.data);
      this.account = res.data;
    });
  }

  public requestAccounts(){
    return this.http.get(
      environment.apiUrl + '/account/all',
      {
      }
    ).pipe(map(res => {return res;}));
  }
}
