import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) { }

  public allAccounts(){
    return this.http.get(
      environment.apiUrl + '/admin/allAccounts'
    ).pipe(map(res => {return res;}));
  }

  public allAnyTable(body:any){
    return this.http.post(
      environment.apiUrl + '/admin/allAnyTable',
      body
    ).pipe(map(res => {return res;}));
  }

  public updateAccount(body:any){
    return this.http.post(
      environment.apiUrl + '/admin/updateAccount',
      body
    ).pipe(map(res => {return res;}));
  }

  public deleteAnyItem(body:any){
    return this.http.post(
      environment.apiUrl + '/admin/deleteAnyItem',
      body
    ).pipe(map(res => {return res;}));
  }

  public updateAnyItem(body:any){
    return this.http.post(
      environment.apiUrl + '/admin/updateAnyItem',
      body
    ).pipe(map(res => {return res;}));
  }

  public addAnyItem(body:any){
    return this.http.post(
      environment.apiUrl + '/admin/addAnyItem',
      body
    ).pipe(map(res => {return res;}));
  }

  public getExamsByUser(){
      return this.http.get(
      environment.apiUrl + '/exam/getExamsByUser'
      ).pipe(map(res => {return res;}));
  }

  public getExamsByUserById(id: any){
    return this.http.get(
      environment.apiUrl + '/admin/getExamsByUser/'+id
    ).pipe(map(res => {return res;}));
  }

  public getUsersByExam(id: any){
    return this.http.get(
      environment.apiUrl + '/admin/getAllAccountsForExam/' + id
    ).pipe(map(res => {return res;}));
  }

  public updateScores(body:any){
    return this.http.post(
      environment.apiUrl + '/admin/updateScores',
      body
    ).pipe(map(res => {return res;}));
  }
}
