import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface WCliente  {
  Codigo : string
  RazonSocial : string
  Rif  : string
  Nit : string
  Tipo  : string
  Estatus  : string
  Actividad : string
  Declarar : string
  FechaInicio  : string
  FechaModificacion : string
  Email : string
  Telefono  : string
  CodigoPostal  : string
  Direccion : string
}

@Injectable({
  providedIn: 'root'
})


export class ClienteService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){
    
  }

  listar() : any{
    return this.httpClient.get<any>(this.url +  "sybase/cliente/listar")
  }

  lstActividad() : any{
    return this.httpClient.get<any>(this.url +  "sybase/cliente/lstactividad")
  }

  add(wCliente : WCliente){
    return this.httpClient.post<any>(this.url +  "sybase/cliente/agregar", wCliente)
  
  }
}
