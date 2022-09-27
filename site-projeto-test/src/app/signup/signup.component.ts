import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_PATH } from 'src/environments/environment';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup
  submitted!: boolean;
  editProfileForm: any;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private _loadingService: LoadingService,
    private _alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      telefone:['',Validators.required],
      email:['',Validators.required, Validators.email],
      password:['',[Validators.required, Validators.minLength(8)]],
    })
  }

  signUp() {
    this._loadingService.show()
    this.httpClient.post<any>(`${API_PATH}signup`, this.signupForm.value)
      .subscribe( resultado => {
        this._alert.success('O usuário com sucesso!!');
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, error=> {
        if (error.status == 400) {
          this._alert.error('O usuário já existe um usuário cadastrado!', error);
        }
      }),
      () => this._loadingService.hide()
  }

  public onSubmit(): void {
    this.submitted = true;
    if(!this.signupForm.valid) {
      console.log("Formulário inválido");
      return;
    }
    console.log("Formulário válido", this.signupForm.value);
  }

//   registerForm = new FormGroup({
//     name: new FormControl('', [Validators.pattern(/\s/), Validators.required]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
//     confirmPassword: new FormControl('', Validators.required)
//   }, { validators: confirmPasswordValidator});

//   onSubmit(): void {
//     // crack an egg or split a nut
//   }

// }

// export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');

//   return password && confirmPassword && password.value === confirmPassword.value ? { confirmPassword: true } : null;

}
