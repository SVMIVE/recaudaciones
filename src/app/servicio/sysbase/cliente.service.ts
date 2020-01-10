import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface WCliente  {
  Codigo: string;
  RazonSocial: string;
  Rif: string;
  Nit: string;
  Tipo: string;
  Estatus: number;
  Actividad: string;
  Declarar: number;
  FechaInicio: string;
  FechaModificacion: string;
  Email: string;
  Telefono: string;
  CodigoPostal: string;
  Direccion: string;
  Usuario: string;
}

// Control de mapping
export interface WAdminUsuario {
  tbl: string;
  cedula_rif: string;
  nit: string;
  razon_social: string;
  auxiliar_contable: string;
  actividad_empresa: string; // Actividad
  presidente?: string;
  porc_ing_bruto: number; // Declara
  origen: string;
  dec_ing_bruto: number;
  dec_ajusta?: number;
  activo: number; // Estatus
  cd_usuario?: string;
  fecha_registro: string; // Fecha y Hora
  Fech_modi_contrato?: string; // Fecha y Hora
  Fech_ini_contrato?: string; // Fecha y Hora
  oficina: string;
  tipo_cliente?: string;
  dir_estado: string;
  telefono_1: string;
  telefono_2?: string;
  email?: string;
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

  agregar(wC : WCliente){
    var wAdmin : WAdminUsuario  = {
      tbl: 'dbo.admin_personas_juridicas',
      auxiliar_contable : wC.Codigo,
      cedula_rif : wC.Rif,
      nit : wC.Nit,
      razon_social : wC.RazonSocial,
      actividad_empresa : wC.Actividad, //Actividad
      presidente : 'PRESIDENTE',
      porc_ing_bruto: wC.Declarar, //Declara
      dec_ing_bruto: 0,
      origen : 'SEDE',
      activo : wC.Estatus, //Estatus
      cd_usuario: 'LOGIN',
      fecha_registro:'GETDATE()', //Fecha y Hora
      oficina: '2',
      tipo_cliente: wC.Tipo,
      dir_estado: wC.Direccion,
      telefono_1: wC.Telefono,      
    }

    console.log(wAdmin)
    console.error( JSON.stringify(wAdmin) )

    return this.httpClient.post<any>(this.url +  "sybase/admincontrol/insertvarios", wAdmin)
  
  }

  consultar(id : string) : any {
    return this.httpClient.post<any>(this.url +  "sybase/cliente/razonsocial", { "auxcontable": id } )
  }
}
