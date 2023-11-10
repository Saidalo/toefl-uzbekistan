import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {DatePipe, formatDate} from "@angular/common";
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
  hide = true;

  selectedFiles: FileList | undefined;
  spaceLeft: number = 0;

  dateMessage = "";
  aviableDates : any[] = [];

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    image: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    date: [''],
  });

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient,
              private datePipe: DatePipe,
              private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      date: new FormControl('')
    });
    this.getAllDateAvailability();
  }

  getAllDateAvailability(){
    this.http.get(environment.apiUrl + '/account/getAllDateAvailability',
      {
        observe: 'response'
      }
    ).pipe(first()).subscribe({
      next: (response: any) => {
        this.aviableDates = response.body.data;
        console.log(this.aviableDates);
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
      }
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
    // / Map firstFormGroup to formData
    Object.keys(this.firstFormGroup.controls).forEach(key => {
      data.append(key, this.firstFormGroup.get(key)?.value);
    });

    // Map secondFormGroup to formData
    Object.keys(this.thirdFormGroup.controls).forEach(key => {
      data.append(key, this.secondFormGroup.get(key)?.value);
    });

    // data.append('name', this.registerForm.get('name')?.value);
    // data.append('surname', this.registerForm.get('surname')?.value);
    // data.append('email', this.registerForm.get('email')?.value);
    // data.append('password', this.registerForm.get('password')?.value);
    // data.append('date', this.datePipe.transform(this.registerForm.get('date')?.value, 'yyyy/MM/dd') || '');
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

  dateClass = (d: Date): any => {
    const classes = [];

    const day = formatDate((d || new Date()),'yyyy-MM-dd','en_US');
    const result = (this.aviableDates.find(item => {
      const dt = formatDate(item.date,'yyyy-MM-dd','en_US');
      return dt === day;
    }) || null);
    if(result === null) {
      return [];
    }
    switch (true) {
      case result.freespace <= 0:
        classes.push('date-full');
        break;
      case result.freespace < 50:
        classes.push('date-half');
        break;
      case result.freespace >= 50:
        classes.push('date-less');
        break;
    }

    return classes;
  }
  myFilter = (d: Date | null): boolean => {
    const day = formatDate((d || new Date()),'yyyy-MM-dd','en_US');
    const result = (this.aviableDates.find(item => {
      const dt = formatDate(item.date,'yyyy-MM-dd','en_US');
      return dt === day;
    }) || null);
    return result !== null;


    // console.log(d);
    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;
  };


}
