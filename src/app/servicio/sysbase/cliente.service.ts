import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface WCliente  {

}

@Injectable({
  providedIn: 'root'
})


export class ClienteService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }
  lstActividad() : any{
    return this.httpClient.get<any>(this.url +  "sybase/cliente/lstactividad")
  }
}
