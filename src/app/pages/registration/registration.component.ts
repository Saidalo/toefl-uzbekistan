import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {
  AbstractControl, AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {HttpClient} from "@angular/common/http";
import {DatePipe, formatDate} from "@angular/common";
import {first, map, Observable, of} from "rxjs";
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

  dateMessage = "no Date selected";
  aviableDates : any[] = [];
  datesLoading = true;

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', {
      validators: [Validators.required, Validators.email],
      // asyncValidators: [this.emailValidator().bind(this)],
      updateOn: 'blur'
    },
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repassword: ['', Validators.required],
  }, {validator: passwordMatchValidator});

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


  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.checkEmailExistence(control.value).pipe(
        map(response => {
          return response.data.exist ? { emailExists: true } : null;
        })
      );
    };
  }


  // validateEmail(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors> => {
  //     let bReturn: boolean = true;
  //     if (this.form.controls['username'].value == 'test@test.test')
  //     {
  //       bReturn = false;
  //     }
  //     let err: ValidationErrors = { 'exists': true };
  //     return bReturn ? of(null) : of(err);
  //   };
  // }
  /* Shorthands for form controls (used from within template) */
  get password() { return this.firstFormGroup.get('password'); }
  get repassword() { return this.firstFormGroup.get('repassword'); }
  get email() { return this.firstFormGroup.get('email'); }

  /* Called on each input in either password field */
  onPasswordInput() {
    if (this.firstFormGroup.hasError('passwordMismatch'))
      this.repassword?.setErrors([{'passwordMismatch': true}]);
    else
      this.repassword?.setErrors(null);
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
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
        this.datesLoading = false;
        console.log(this.aviableDates);
      },
      error: (error: any) => {
        this.datesLoading = false;
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
      data.append(key, this.thirdFormGroup.get(key)?.value);
    });

    if(currentFileUpload) {
      data.append('image', currentFileUpload, currentFileUpload.name);
    }
    console.log(this.registerForm.value);
    this.authenticationService.register(
      data
    );
  }

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

  addSelectedDateFromCalendar(date: Date){
    let found = false;
    const day = formatDate((date || new Date()),'yyyy-MM-dd','en_US');
    this.aviableDates.forEach((item: any) => {
      const dt = formatDate(item.date,'yyyy-MM-dd','en_US');
      if(dt === day && item.freespace > 0) {

        this.dateMessage = "";
        found = true;
        this.thirdFormGroup.patchValue({
          date: formatDate((date || new Date()),'yyyy-MM-dd','en_US')
        });
      }
    });
    if(!found) {
      this.thirdFormGroup.patchValue({
        date: ''
      });
      this.dateMessage = "No Exam";
    }

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

  };

  goForward(stepper: any) {
    const email = this.firstFormGroup.get('email')?.value;
    this.checkEmailExistence(email).subscribe(response => {
      if (response.data.exist) {
        // Show error message
        alert('Email already exists');
      } else {
        stepper.next();
      }
    });
  }

  checkEmailExistence(email: string): Observable<any> {
    // Call the API and return the response as an Observable
    // Replace the URL with the actual URL of your API
    return this.http.get(environment.apiUrl + `/account/checkEmailExistence?email=${email}`);
  }


}

export const passwordMatchValidator = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password')?.value === formGroup.get('repassword')?.value)
    return null;
  else
    return {passwordMismatch: true};
};
