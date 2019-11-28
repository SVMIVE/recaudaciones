import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';



export interface WBanco  {
  id : string
  descripcion : string
  activo : boolean
  abreviatura : string
  cod_usuario : string
}


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  url = environment.url
  constructor(private httpClient : HttpClient) { }

  obtener(id:string){

  }
  listar() : any{
    return this.httpClient.get<any>(this.url +  "sybase/factura/listar")
  }
}
