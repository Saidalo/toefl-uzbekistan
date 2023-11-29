import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../enviroments/enviroment";
import {map} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {DatePipe} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {NotifierService} from "angular-notifier";
import {passwordMatchValidator} from "../registration/registration.component";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  active = 1;

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
      // asyncValidators: [this.emailValidator().bind(this)],
      updateOn: 'blur'
    },
    ]
  });


  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private _formBuilder: FormBuilder,
              notifierService: NotifierService,
              private datePipe: DatePipe) {
    this.notifier = notifierService;
  }

  account: any;
  ngOnInit() {
    this.id = this.authenticationService.getUserId();
    console.log(this.id);
    if(this.id) {
      this.authenticationService.profile(this.id).subscribe((res: any) => {
        this.account = res;
        console.log(this.account);
        this.profileForm.patchValue({
          name: res.Name,
          surname: res.Surname,
          phone: res.phone,
          country: res.country,
          email: res.Email
        });
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
      this.authenticationService.updateProfile(this.profileForm.value).subscribe({
        next: (res: any) => {
          if (res.status == 1) {
          } else {
            this.profileForm.enable();
            this.notifier.notify('error', 'Something went wrong!');
          }
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
}
