import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {AuthenticationService} from "../../services/authentication.service";
import {DatePipe, formatDate} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {NotifierService} from "angular-notifier";
import {passwordMatchValidator} from "../registration/registration.component";
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { saveAs } from 'file-saver';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  showNotFilled = false;
  private modalService = inject(NgbModal);
  isOver18 = false;
  birthdate: Date = new Date();
  model: NgbDateStruct | undefined;
  active = 1;
  isAdmin = false;

  private readonly notifier: NotifierService;


  id: number | null = null;

  isLoading = false;


  profileForm = this._formBuilder.group({
    name: [''],
    surname: [''],
    phone: [''],
    country: [''],
    email: ['', {
        validators: [ Validators.email],
        required: true,
        // asyncValidators: [this.emailValidator().bind(this)],
        updateOn: 'blur'
      },
    ],
    gender: [''],
    birthdate: [''],
    birthdateMd: [''],
    agreeTerms: [true],
  });


  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private _formBuilder: FormBuilder,
              notifierService: NotifierService,
              private datePipe: DatePipe) {
    this.notifier = notifierService;
  }

  heckEmptyFields() {
    console.log(this.account)
    if(this.account.Name == null || this.account.Name == ''){
      return true;
    }
    if(this.account.Surname == null || this.account.Surname == ''){
      return true;
    }
    if(this.account.phone == null || this.account.phone == ''){
      return true;
    }
    if(this.account.country == null || this.account.country == ''){
      return true;
    }
    if(this.account.Email == null || this.account.Email == ''){
      return true;
    }
    if(this.account.gender == null || this.account.gender == ''){
      return true;
    }
    if(this.account.birthdate == null || this.account.birthdate == ''){
      return true;
    }
    return false; // No empty fields found
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
      },
      (reason) => {
      },
    );
  }


  initProfileForm(res: any) {
    this.profileForm.patchValue({
      name: res.Name,
      surname: res.Surname,
      phone: res.phone,
      country: res.country,
      email: res.Email,
      gender: res.gender,
      birthdate: res.birthdate,
      agreeTerms: res.agreeTerms
    });
    this.showNotFilled = this.heckEmptyFields();
    this.birthdate = new Date(res['birthdate']);
    this.model = {year: this.birthdate.getFullYear(), month: this.birthdate.getMonth() + 1, day: this.birthdate.getDate()};
    let timeDiff = Math.abs(Date.now() - this.birthdate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    this.isOver18 = age >= 18;
    if(!this.isOver18 && (!res.agreeTerms)){
      this.profileForm.controls['agreeTerms'].setValue(false);
    }
    console.log(timeDiff, age, this.isOver18);
  }

  account: any;
  ngOnInit() {
    this.id = this.authenticationService.getUserId();
    this.isAdmin = this.authenticationService.isAdmin();
    console.log(this.id);
    if(this.id) {
      this.authenticationService.profile(this.id).subscribe((res: any) => {
        this.account = res;
        this.initProfileForm(res);
        console.log(this.account);

      });
    } else{
      this.notifier.notify('error', 'Something went wrong!');
    }
  }

  logOut(){
    this.authenticationService.logout();
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.profileForm.disable();
      // let ngbDate : any = this.profileForm.controls['birthdate'].value;
      let myDate = new Date(this.model!.year, this.model!.month - 1, this.model!.day);
      this.profileForm.patchValue({
        birthdate: formatDate(myDate, 'yyyy-MM-dd', 'en-US')
      });
      this.authenticationService.updateProfile(this.profileForm.value).subscribe({
        next: (res: any) => {
          this.profileForm.enable();
          this.notifier.notify('success', 'Profile updated successfully!');
          this.ngOnInit();
        },
        error: (error: any) => {
          this.profileForm.enable();
          this.notifier.notify('error', 'Something went wrong!');
        }
      });
    } else {
      this.profileForm.enable();
      this.notifier.notify('error', 'Please fill all required fields!');
    }
  }

  generateAgreement(){
    this.authenticationService.generateAgreement().subscribe({
      next: (data: any) => {
        saveAs(data, `Agreement.pdf`)
        this.notifier.notify('success', 'Agreement generated successfully!');
      },
      error: (error: any) => {
        console.log(error);
        this.notifier.notify('error', 'Something went wrong!');
      }
    });
  }
}
