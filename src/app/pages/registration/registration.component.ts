import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {first} from "rxjs";
import {environment} from "../../../enviroments/enviroment";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  errorMessage: any
  public registerForm!: FormGroup;

  selectedFiles: FileList | undefined;
  spaceLeft: number = 0;

  dateMessage = "";

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient,
              private datePipe: DatePipe) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      date: new FormControl('')
    });
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  public onSubmit() {
    let currentFileUpload;
    const data: FormData = new FormData();
    if(this.selectedFiles && this.selectedFiles.length > 0) {
      currentFileUpload = this.selectedFiles.item(0);
    }
    data.append('name', this.registerForm.get('name')?.value);
    data.append('surname', this.registerForm.get('surname')?.value);
    data.append('email', this.registerForm.get('email')?.value);
    data.append('password', this.registerForm.get('password')?.value);
    data.append('date', this.datePipe.transform(this.registerForm.get('date')?.value, 'yyyy/MM/dd') || '');
    if(currentFileUpload) {
      data.append('image', currentFileUpload, currentFileUpload.name);
    }
    console.log(this.registerForm.value);
    this.authenticationService.register(
      data
    );
  }

  // public dateChecker(event: any) {
  //   let date = new Date(event.value);
  //   console.log(date.toDateString());
  //
  // }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const date = this.datePipe.transform(event.value, 'yyyy/MM/dd');
    this.dateMessage = "Loading...";
    if(!date) return;
    this.http.get(environment.apiUrl + '/account/checkDateAvailability',
    {
      params: {
        date: date
      },
      observe: 'response'
    }
    ).pipe(first()).subscribe({
      next: (response: any) => {
        console.log(response);
        this.spaceLeft = response.body.data.freespace;
        let msg = ""
        if(this.spaceLeft < 0) {
          msg = "No Exam"
        } else{
          msg = `${this.spaceLeft} spaces available`;
        }
        this.dateMessage = msg;
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
        this.dateMessage = "Try again...";
      }
    });
  }



}
