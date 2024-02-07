import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PhonelistComponent } from './components/phonelist/phonelist.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './components/@shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        SharedModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomepageComponent,
        PhonelistComponent
    ],
    exports: [AppComponent,
        HomepageComponent,
        PhonelistComponent],
    bootstrap: [AppComponent]
})
export class CustomRootModule { }