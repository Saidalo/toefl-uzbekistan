import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { LoginComponent } from './pages/login/login.component';
import {TokenInterceptor} from "./helpers/token.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TopHeaderComponent } from './layouts/top-header/top-header.component';
import { PreparationComponent } from './pages/preparation/preparation.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AccountListComponent } from './pages/account-list/account-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './layouts/dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { VerificationComponent } from './pages/verification/verification.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './widgets/calendar/calendar.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NotifierModule} from "angular-notifier";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ErrorInterceptor} from "./helpers/error.interceptor";
import { GoogleMapsModule } from '@angular/google-maps';
import { PopUpModalComponent } from './pop-up-modal/pop-up-modal.component';
import { CountUpModule } from 'ngx-countup';
import { CustomCardComponent } from './widgets/custom-card/custom-card.component';
import { UrlVideoplayerComponent } from './widgets/url-videoplayer/url-videoplayer.component'
import {CarouselModule} from "ngx-owl-carousel-o";
import {ToeflItpComponent} from "./pages/toefl-itp/toefl-itp.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    AboutUsComponent,
    TeachersComponent,
    CoursesComponent,
    ContactsComponent,
    LoginComponent,
    UnderConstructionComponent,
    TopHeaderComponent,
    PreparationComponent,
    RegistrationComponent,
    AccountListComponent,
    DialogComponent,
    VerificationComponent,
    CalendarComponent,
    ProfileComponent,
    PopUpModalComponent,
    CustomCardComponent,
    UrlVideoplayerComponent,
    ToeflItpComponent
  ],
    imports: [
        CountUpModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgbModule,
        MatStepperModule,
        MatIconModule,
        MatCardModule,
        CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
        FormsModule,
        MatProgressSpinnerModule,
        NotifierModule.withConfig({
            // Custom options in here
        }),
        MatRadioModule,
        MatSelectModule,
        GoogleMapsModule,
        NgOptimizedImage,
        CarouselModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
