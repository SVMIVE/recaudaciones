import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasaService {
  url = environment.url
  constructor(private httpClient : HttpClient) { 

  }
  listar(): any{
    return this.httpClient.get<any>(this.url +  "sybase/listartasa")
  }
}
