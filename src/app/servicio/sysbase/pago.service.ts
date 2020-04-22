import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export interface WPago {
  call_back: string,
  tbl : string,
  nu_pago: string,
  fe_pago: string,
  tp_pago: string,
  cd_servicio: string,
  oficina: number,
  cd_cliente: string,
  st_pago:0,
  cd_usuario?: string ,
  pc_iva: number,
  mn_pago_bf: number,
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
export class PagoService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }
  listar() : any{
    return this.httpClient.get<any>(this.url +  "sybase/pago/lstpagoscliente")
  }

  agregar(obj : any) : any {
    return this.httpClient.post<any>(this.url +  "sybase/admincontrol/insertjoin", obj)
  }

}
