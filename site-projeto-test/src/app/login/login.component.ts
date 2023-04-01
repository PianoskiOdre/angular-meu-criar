import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_PATH } from 'src/environments/environment';
import { AuthInterceptor } from '../loader/interceptor.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  imageSrc = 'assets/img/LOGO-CDL.png'

  public loginForm !: FormGroup;
  loading: boolean = false;
  submitted!: boolean;
  editProfileForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private _loadingService: LoadingService,
    private _alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    }, {updateOn: 'submit'})
  }


  login() {
    this._loadingService.show()
    this.httpClient.get<any>(`${API_PATH}signup`)
    .subscribe(res=>{
      AuthInterceptor.acessoToken = res.token;
      const user = res.find((login: any)=>{
        return login.email === this.loginForm.value?.email && login.password === this.loginForm.value?.password
      });
      if(user) {
        this._alert.success(`O usuário obteve sucesso!`);
        this.loginForm.reset();
        this.router.navigate([`dashboard`])
      }else {
        this._alert.error('Usuário não foi encontrado!!');
      }
    }, error=> {
      this._alert.error('Algo deu errado!!')
    }),
    () => this._loadingService.hide()
  }
}
