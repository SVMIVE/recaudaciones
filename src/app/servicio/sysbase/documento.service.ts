import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export interface WDocumento {
  call_back: string,
  tbl : string,
  nu_documento: string,
  fe_documento: string,
  tp_documento: string,
  cd_servicio: string,
  oficina: number,
  cd_cliente: string,
  st_documento:0,
  cd_usuario?: string ,
  pc_iva: number,
  mn_documento_bf: number,
  baseimponible: number,
  mn_iva_bf: number,
  exentos: number,
  moneda: string,
  cod_terminal: string,
  onetomany ?: [],
}

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }
  listar() : any{
    return this.httpClient.get<any>(this.url +  "sybase/documento/lstdocactivos")
  }

  agregar(obj : any) : any {
    return this.httpClient.post<any>(this.url +  "sybase/admincontrol/insertjoin", obj)
  }
  CtrlSeniat(obj : any) : any {
    return this.httpClient.post<any>(this.url +  "sybase/admincontrol/updseniat", obj)
  }
}
