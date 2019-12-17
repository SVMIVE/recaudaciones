import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


export interface AutoIncrement {
  Usuario : string
  Ip : string
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  listar(): any{
    return this.httpClient.get<any>(this.url +  "sybase/servicio/listar")
  }

  autoincrement(auto : AutoIncrement) : any {    
    return this.httpClient.post<any>(this.url +  "sybase/admincontrol/autoincrement", auto)
  }

  

}
