import {Component, OnInit, ViewChild} from '@angular/core';
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
import {first, map, Observable} from "rxjs";
import {NotifierService} from "angular-notifier";
import {environment} from "../../../environments/environment";
import {MyVars} from "../../data/vars";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('stepper') generalStepper: any;

  private readonly notifier: NotifierService;
  errorMessage: any;
  hide = true;
  isLoading = false;
  id = -1;

  selectedFiles: FileList | undefined;
  spaceLeft: number = 0;

  dateMessage = "no Date selected";
  aviableDates : any[] = [];
  datesLoading = true;
  disableSelect = new FormControl(false);
  selectedTest = 'TOEFL_ITP';

  testTypeFormGroup = this._formBuilder.group({
    test: ['', Validators.required]
  });

  testOptions = [
    {value: "TOEFL_ITP", text: "TOEFL ITP® Assessment Series — a convenient, affordable and reliable assessment of English-language skills. The tests are accepted in more than 2,500 institutions in 50+ countries annually. With the TOEFL ITP tests, you can measure your proficiency level in four different skills — reading comprehension, listening comprehension, structure and written expression, and speaking."},
    {value: "TOEFL_IBT", text: "Designed by institutions for institutions, the TOEFL iBT test meets your needs in a superior way. That's why more than 12,000 universities in over 160 countries trust it to showcase their applicants' ability to succeed in an English-speaking academic environment."}
  ];
  testText = "";

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', {
      validators: [Validators.required, Validators.email],
      // asyncValidators: [this.emailValidator().bind(this)],
      updateOn: 'blur'
    },
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
    ]],
    repassword: ['', Validators.required],
  }, {validator: passwordMatchValidator});

  secondFormGroup = this._formBuilder.group({
    country: ['', Validators.required],
    identity_type: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    date: [''],
  });
  myVars = MyVars;

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient,
              private datePipe: DatePipe,
              private _formBuilder: FormBuilder,
              notifierService: NotifierService) {
    this.notifier = notifierService;
    this.testText = this.testOptions.find(value => value.value === this.selectedTest)?.text ?? "";
  }


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
    if(this.authenticationService.isLoggedIn()) {
      this.authenticationService.profile().subscribe({
        next: (response: any) => {
          this.firstFormGroup.disable();
          this.generalStepper.selectedIndex = 1;
        },
        error: (error: any) => {
          this.notifier.notify('error', error.error.message);
        }
      })
    }
    this.getAllDateAvailability();
  }

  getAllDateAvailability(){
    this.http.get(environment.apiUrl + '/account/getAllDateAvailability',
      {
        params: {
          type: this.selectedTest
        },
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
        this.notifier.notify('error', error.error.message);
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

    // Map thirdForm to formData
    Object.keys(this.thirdFormGroup.controls).forEach(key => {
      data.append(key, this.thirdFormGroup.get(key)?.value);
    });

    if(currentFileUpload) {
      data.append('image', currentFileUpload, currentFileUpload.name);
    }
    this.authenticationService.register(
      data
    );
  }

  public onSubmitFirstForm(stepper: any){
    const data: FormData = new FormData();
    // / Map firstFormGroup to formData
    Object.keys(this.firstFormGroup.controls).forEach(key => {
      data.append(key, this.firstFormGroup.get(key)?.value);
    });

    this.authenticationService.registerAccount(this.firstFormGroup.value).subscribe({
      next: (response: any) => {
        localStorage.setItem(MyVars.tokenKey, response.token);
        this.id = response.result.insertId;
        localStorage.setItem(MyVars.userId, response.result.insertId);
        this.isLoading = false;
        this.firstFormGroup.enable();
        this.notifier.notify('success', "Successfully registered your account!");
        stepper.next();
      },
      error: (error: any) => {
        this.isLoading = false;
        this.firstFormGroup.enable();
        this.notifier.notify('error', error.error.message);
      },
    });
  }

  public onSubmitImageForm(stepper: any){
    let currentFileUpload;
    const data: FormData = new FormData();
    if(this.selectedFiles && this.selectedFiles.length > 0) {
      currentFileUpload = this.selectedFiles.item(0);
    }

    if (this.id == -1){
      this.id = this.authenticationService.getUserId() ?? -1;
    }

    if(this.id == -1){
      this.notifier.notify('error', "Something went wrong!");
      return;
    }
    Object.keys(this.secondFormGroup.controls).forEach(key => {
      data.append(key, this.secondFormGroup.get(key)?.value);
    });

    data.append('id', this.id.toString());

    if(currentFileUpload) {
      data.append('image', currentFileUpload, currentFileUpload.name);
    }
    this.secondFormGroup.disable();
    this.authenticationService.uploadImage(data).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.secondFormGroup.enable();
        this.notifier.notify('success', "Successfully uploaded your image!");
        stepper.next();
      },
      error: (error: any) => {
        this.isLoading = false;
        this.secondFormGroup.enable();
        this.notifier.notify('error', error.error.message);
      },
    });
  }

  onTestSelect(testName: string) {
    this.testTypeFormGroup.patchValue({
      test: testName
    });
    this.selectedTest = testName;
    const testText = this.testOptions.find(value => value.value === testName)?.text;
    this.testText = testText ?? "";
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

  registerExam(exam_id: number){
    this.isLoading = true;
    const account_id = this.authenticationService.getUserId();
    if(!account_id) {
      this.notifier.notify('error', "Something went wrong!");
      return;
    }
    this.authenticationService.registerExam(account_id, exam_id).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.notifier.notify('success', "Successfully registered your exam!");
        this.generalStepper.next();
      },
      error: (error: any) => {
        this.isLoading = false;
        this.notifier.notify('error', "You already registered for the exam!");
        this.generalStepper.next();
      },
    });
  }

  refreshDates(){
    this.datesLoading = true;
    this.getAllDateAvailability();
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
    if(this.firstFormGroup.valid) {
      const email = this.firstFormGroup.get('email')?.value;
      this.checkEmailExistence(email).subscribe(response => {
        if (response.data.exist) {
          // Show error message
          alert('Email already exists');
        } else {
          this.isLoading = true;
          // this.firstFormGroup.disable();
          this.onSubmitFirstForm(stepper);
        }
      });
    }
  }

  goForwardExamType(stepper: any) {

    this.generalStepper.next();
    // if(this.testTypeFormGroup.valid) {
    //   stepper.next();
    //   // this.isLoading = true;
    //   // this.firstFormGroup.disable();
    //   // this.onSubmitFirstForm(stepper);
    // } else{
    //   this.notifier.notify('error', "Please fill all required fields!");
    // }
  }

  goForwardUploadImage(stepper: any) {
      if(this.secondFormGroup.valid) {
        this.isLoading = true;
        // this.firstFormGroup.disable();
        this.onSubmitImageForm(stepper);
      } else{
        this.notifier.notify('error', "Please fill all required fields!");
      }
  }

  goForwardDate(stepper: any) {
    if(this.thirdFormGroup.valid) {
      this.isLoading = true;
      this.thirdFormGroup.disable();
      const data: FormData = new FormData();
      // / Map firstFormGroup to formData
      Object.keys(this.thirdFormGroup.controls).forEach(key => {
        data.append(key, this.thirdFormGroup.get(key)?.value);
      });

      data.append('id', this.id.toString());

      this.authenticationService.registerDate(data).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.thirdFormGroup.enable();
          this.notifier.notify('success', "Successfully registered your date!");
          stepper.next()
        },
        error: (error: any) => {
          this.isLoading = false;
          this.thirdFormGroup.enable();
          this.notifier.notify('error', error.error.message);
        },
      });
    } else{
      this.notifier.notify('error', "Please fill all required fields!");
    }
  }

  checkEmailExistence(email: string): Observable<any> {
    // Call the API and return the response as an Observable
    // Replace the URL with the actual URL of your API
    return this.http.get(environment.apiUrl + `/account/checkEmailExistence?email=${email}`);
  }


  protected readonly MyVars = MyVars;
}

export const passwordMatchValidator = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password')?.value === formGroup.get('repassword')?.value)
    return null;
  else
    return {passwordMismatch: true};
};
