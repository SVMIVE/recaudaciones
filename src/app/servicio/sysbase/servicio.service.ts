import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  listar(): any{
    return this.httpClient.get<any>(this.url +  "sybase/servicio/listar")
  }

  

}
