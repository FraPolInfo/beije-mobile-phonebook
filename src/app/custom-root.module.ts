import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PhonelistComponent } from './components/phonelist/phonelist.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './components/@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PhonelistCardComponent } from './components/phonelist/phonelist-card/phonelist-card.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PhonelistEditComponent } from './components/phonelist/phonelist-edit/phonelist-edit.component';
import { SpinnerInterceptor } from './components/@shared/spinner/spinner.interceptor';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        SharedModule,
        FormsModule,
        AppRoutingModule,
        MatSlideToggleModule,
        HttpClientModule,
        FontAwesomeModule     
    ],
    declarations: [
        AppComponent,
        HomepageComponent,
        PhonelistComponent,
        PhonelistCardComponent,
        PhonelistEditComponent
    ],
    exports: [AppComponent,
        HomepageComponent,
        PhonelistComponent],
    bootstrap: [AppComponent],
    providers: [
      provideAnimationsAsync(),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: SpinnerInterceptor,
        multi: true
      }
    ]
})
export class CustomRootModule { }