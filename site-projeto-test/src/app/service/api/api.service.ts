import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResquest } from 'src/app/models/IResquest';
import { API_PATH } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
    ) { }

  obterLogin() {
    return this.httpClient.get<IResquest[]>(`${API_PATH}login`).toPromise();
  }

  adicionar(res: IResquest) {
    return this.httpClient.post<IResquest>(`${API_PATH}signup`, res).toPromise();
  }
}
