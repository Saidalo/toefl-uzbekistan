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
import {AdminService} from "../admin/services/admin.service";

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
  isExamsLoading = false;
  exams: any[] = [];

  format = 'dd/MM/yyyy';
  myDate = '2019-06-29';
  locale = 'en-US';


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
              private datePipe: DatePipe,
              private adminService: AdminService) {
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
    this.getExams();
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

  getExams() {
    this.isExamsLoading = true;
    this.adminService.getExamsByUser().subscribe({
      next: (exams: any) => {
        const format = 'dd/MM/yyyy';
        const myDate = '2019-06-29';
        const locale = 'en-US';
        this.exams = exams.exams;

        this.exams.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.isExamsLoading = false;
      },
      error: error => {
        console.log(error);
        this.isExamsLoading = false;
      }
    });
  }

  protected readonly formatDate = formatDate;

  payViaClick() {
    let objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();
    const currentDate = `${day}-${month}-${year}`;
    const service_id = 30465;
    const merchant_id = 22928;
    const secret_key = 'LVduPJQTWj3bN';
    const merchant_user_id = 'toeflcenter';
    const transaction_param = `${currentDate}-${localStorage.getItem('user_id')}`
    window.location.href = `https://my.click.uz/services/pay?service_id=${service_id}&merchant_id=${merchant_id}&amount=1000&transaction_param=${transaction_param}`;
  }

  payViaPayme() {

  }
}
