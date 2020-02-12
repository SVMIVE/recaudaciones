import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface Usuario  {
  nombre: string;
  clave: string;
  clase: string;
}

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  url = environment.url;

  constructor(protected httpdClient: HttpClient, private router: Router) { }

  Validar(usuario: Usuario): any {
   return this.httpdClient.post<any>(this.url + 'wusuario/login', usuario);
  }

  obtenerUsuario(){
    if (localStorage.getItem('key.iaim') != undefined ){

      var e = localStorage.getItem("key.iaim");
      var s = e.split(".");
      var json = JSON.parse(atob(s[1]));
      var Usr = json.Usuario;
      console.log(Usr)

      return Usr
    }
  }
}
