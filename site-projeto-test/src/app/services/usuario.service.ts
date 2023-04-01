import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IUsuario } from '../models/IUsuario';
import { API_PATH } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpCliente: HttpClient,
    private router: Router){ }
  
  Logar(usuario: IUsuario) : Observable<any> {
    return this.httpCliente.post<any>(API_PATH + "/login", usuario).pipe(tap((resposta) => {
      if (!resposta.sucesso) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', btoa(JSON.stringify(resposta['usuario'])));
        this.router.navigate(['']);
    }))
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
