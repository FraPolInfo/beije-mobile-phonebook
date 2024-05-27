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

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        SharedModule,
        FormsModule,
        AppRoutingModule,
        MatSlideToggleModule,
    ],
    declarations: [
        AppComponent,
        HomepageComponent,
        PhonelistComponent,
        PhonelistCardComponent
    ],
    exports: [AppComponent,
        HomepageComponent,
        PhonelistComponent],
    bootstrap: [AppComponent],
    providers: [
      provideAnimationsAsync()
    ]
})
export class CustomRootModule { }