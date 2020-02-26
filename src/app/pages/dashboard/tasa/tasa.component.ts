import { Component, OnInit } from '@angular/core';
import { TasaService } from '../../../servicio/tasa/tasa.service';

interface Tasa {
  descripcion : string
  monto: string
  fecha: string
}

@Component({
  selector: 'ngx-tasa',
  templateUrl: './tasa.component.html',
  styleUrls: ['./tasa.component.scss']
})
export class TasaComponent implements OnInit {

  lstTasa = []

  constructor(private tasaService : TasaService) { }

  ngOnInit() {
    this.tasaService.listar().subscribe(     
      (resp) => {        
        this.lstTasa = [
          {
            descripcion : "Dolar ",
            fecha : resp[0].fecha_aplica_dol.substring(0, 10),
            //monto : parseFloat( resp[0].ta_dollar ).toFixed(2) + ' Bs. ' + resp[0].fecha_aplica_dol.substring(0, 10),
            monto : parseFloat( resp[0].ta_dollar ).toFixed(2),
          },
          {
            descripcion : "Euro ",
            fecha : resp[0].fecha_aplica_eur.substring(0, 10),
            //monto : parseFloat(  resp[0].mn_euro ).toFixed(2) + ' Bs.  ' +  resp[0].fecha_aplica_eur.substring(0, 10),
            monto : parseFloat(  resp[0].mn_euro ).toFixed(2),

          },
          {
            descripcion : "Petro ",
            fecha : resp[0].fecha_aplica_ptr.substring(0, 10),
            //monto : parseFloat( resp[0].mn_petro ).toFixed(2) + ' Bs.  ' +  resp[0].fecha_aplica_ptr.substring(0, 10),
            monto : parseFloat( resp[0].mn_petro ).toFixed(2),
          }        
        ]
      },
      (error) =>{
        console.log("Error del sistema")
      }
    );
  }


}
