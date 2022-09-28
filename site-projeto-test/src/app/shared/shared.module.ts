import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AlertModalComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
