import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface WConcepto {
  Descripcion : string
  Servicio : number
  Monto : number
  Tipo : number
  Estatus : number
  Iva : number
  Descuento : number
  Numero : string
}

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }

  listar(): any{
    return this.httpClient.get<any>(this.url +  "sybase/concepto/listar")
  }

  
  consultar(id : string): any{
    var Ser = {
      servicio: id
    }
    console.log(Ser)
    return this.httpClient.post<any>(this.url +  "sybase/concepto/consultar", Ser)
  }
}
