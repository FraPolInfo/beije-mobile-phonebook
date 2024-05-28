import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './button/button.component';
import { InputTextComponent } from './input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
        ButtonComponent,
        InputTextComponent,
        SpinnerComponent
    ],
    exports: [
        ButtonComponent,
        InputTextComponent,
        SpinnerComponent]
})
export class SharedModule { }