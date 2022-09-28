import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HTTPStatus } from './loader/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'site-projeto-test';

  constructor(
    private httpStatus: HTTPStatus,
    private spinner: NgxSpinnerService
  ) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      if(status) {
        spinner.show();
      }
      else {
        spinner.hide();
      }
    });
  }
}
