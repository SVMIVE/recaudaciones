import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';



export interface WBanco  {
  codigo : string
  descripcion : string
  abreviatura : string
  estatus : number
  usuario? : string
}


@Injectable({
  providedIn: 'root'
})
export class BancoService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }
  listar() : any{
    return this.httpClient.get<any>(this.url +  "sybase/banco/listar")
  }

  agregar(banco : WBanco): any{
    return this.httpClient.post<any>(this.url +  "sybase/banco/insertar", banco)
  }
}
