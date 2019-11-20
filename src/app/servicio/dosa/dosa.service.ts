import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'


export interface WDosa  {
  desde : string
  hasta : string
}


@Injectable({
  providedIn: 'root'
})
export class DosaService {
  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }
  listar(wDosa: WDosa) : any{
    return this.httpClient.post<any>(this.url +  "dosa/listar", wDosa)
  }

  NoProcesadas(wDosa: WDosa) : any{
    return this.httpClient.post<any>(this.url +  "dosa/noprocesadas", wDosa)
  }
}
