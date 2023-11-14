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

  countryOptions = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Åland Islands", label: "Åland Islands" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "American Samoa", label: "American Samoa" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Anguilla", label: "Anguilla" },
    { value: "Antarctica", label: "Antarctica" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Aruba", label: "Aruba" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Bouvet Island", label: "Bouvet Island" },
    { value: "Brazil", label: "Brazil" },
    { value: "British Indian Ocean Territory", label: "British Indian Ocean Territory" },
    { value: "Brunei Darussalam", label: "Brunei Darussalam" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Cape Verde", label: "Cape Verde" },
    { value: "Cayman Islands", label: "Cayman Islands" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Christmas Island", label: "Christmas Island" },
    { value: "Cocos (Keeling) Islands", label: "Cocos (Keeling) Islands" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo", label: "Congo" },
    { value: "Congo, The Democratic Republic of The", label: "Congo, The Democratic Republic of The" },
    { value: "Cook Islands", label: "Cook Islands" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Cote D'ivoire", label: "Cote D'ivoire" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Curaçao", label: "Curaçao" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Falkland Islands (Malvinas)", label: "Falkland Islands (Malvinas)" },
    { value: "Faroe Islands", label: "Faroe Islands" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "French Guiana", label: "French Guiana" },
    { value: "French Polynesia", label: "French Polynesia" },
    { value: "French Southern Territories", label: "French Southern Territories" },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Gibraltar", label: "Gibraltar" },
    { value: "Greece", label: "Greece" },
    { value: "Greenland", label: "Greenland" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guadeloupe", label: "Guadeloupe" },
    { value: "Guam", label: "Guam" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guernsey", label: "Guernsey" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-bissau", label: "Guinea-bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    { value: "Heard Island and Mcdonald Islands", label: "Heard Island and Mcdonald Islands" },
    { value: "Holy See (Vatican City State)", label: "Holy See (Vatican City State)" },
    { value: "Honduras", label: "Honduras" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran, Islamic Republic of", label: "Iran, Islamic Republic of" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Isle of Man", label: "Isle of Man" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jersey", label: "Jersey" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Korea, Democratic People's Republic of", label: "Korea, Democratic People's Republic of" },
    { value: "Korea, Republic of", label: "Korea, Republic of" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Lao People's Democratic Republic", label: "Lao People's Democratic Republic" },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libyan Arab Jamahiriya", label: "Libyan Arab Jamahiriya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Macao", label: "Macao" },
    { value: "Macedonia, The Former Yugoslav Republic of", label: "Macedonia, The Former Yugoslav Republic of" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Martinique", label: "Martinique" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mayotte", label: "Mayotte" },
    { value: "Mexico", label: "Mexico" },
    { value: "Micronesia, Federated States of", label: "Micronesia, Federated States of" },
    { value: "Moldova, Republic of", label: "Moldova, Republic of" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Caledonia", label: "New Caledonia" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "Niue", label: "Niue" },
    { value: "Norfolk Island", label: "Norfolk Island" },
    { value: "Northern Mariana Islands", label: "Northern Mariana Islands" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    { value: "Palestinian Territory, Occupied", label: "Palestinian Territory, Occupied" },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Pitcairn", label: "Pitcairn" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Puerto Rico", label: "Puerto Rico" },
    { value: "Qatar", label: "Qatar" },
    { value: "Reunion", label: "Reunion" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Helena", label: "Saint Helena" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    { value: "Saint Pierre and Miquelon", label: "Saint Pierre and Miquelon" },
    { value: "Saint Vincent and The Grenadines", label: "Saint Vincent and The Grenadines" },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Georgia and The South Sandwich Islands", label: "South Georgia and The South Sandwich Islands" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Svalbard and Jan Mayen", label: "Svalbard and Jan Mayen" },
    { value: "Eswatini", label: "Eswatini" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syrian Arab Republic", label: "Syrian Arab Republic" },
    { value: "Taiwan (ROC)", label: "Taiwan (ROC)" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tanzania, United Republic of", label: "Tanzania, United Republic of" },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-leste", label: "Timor-leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tokelau", label: "Tokelau" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Turks and Caicos Islands", label: "Turks and Caicos Islands" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "United States Minor Outlying Islands", label: "United States Minor Outlying Islands" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Virgin Islands, British", label: "Virgin Islands, British" },
    { value: "Virgin Islands, U.S.", label: "Virgin Islands, U.S." },
    { value: "Wallis and Futuna", label: "Wallis and Futuna" },
    { value: "Western Sahara", label: "Western Sahara" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" }
    ];

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
