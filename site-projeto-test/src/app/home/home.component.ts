import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Propridades
  imageSrc = 'assets/img/LOGO-CDL.png'
  imageAlt = 'Moz'

  imgSearch = '/assets/img/search.png'
  imgPerfil = '/assets/img/Perfil.jpeg'

  // Métodos
  constructor(
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    
  }

  
}
