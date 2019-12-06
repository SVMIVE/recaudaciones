import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';



export interface WActividad  {
  codigo : string
  descripcion : string
  abreviatura : string
  estatus : number
  usuario? : string
}


@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }
  listar() : any{
    return this.httpClient.get<any>(this.url +  "sybase/actividad/listar")
  }

  agregar(wactivida : WActividad): any{
    return this.httpClient.post<any>(this.url +  "sybase/actividad/insertar", wactivida)
  }
}
