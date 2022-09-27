import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}
