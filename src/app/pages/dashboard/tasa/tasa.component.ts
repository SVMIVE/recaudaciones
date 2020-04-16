import { Component, OnInit } from '@angular/core';
import { TasaService } from '../../../servicio/tasa/tasa.service';
import { CurrencyPipe } from '@angular/common'


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
  dol: any;
  eur: any;
  pet: any;

  constructor(private tasaService : TasaService,
    private cp: CurrencyPipe) { }

  ngOnInit() {
    this.tasaService.listar().subscribe(     
      (resp) => {      
        
        this.dol = this.cp.transform(parseFloat( resp[0].ta_dollar ).toFixed(2), '', 'BS', '1.2-2','pt-BR');
        this.eur = this.cp.transform(parseFloat( resp[0].mn_euro ).toFixed(2), '', 'BS', '1.2-2','pt-BR');
        this.pet = this.cp.transform(parseFloat( resp[0].mn_petro ).toFixed(2), '', 'BS', '1.2-2','pt-BR');

        this.lstTasa = [
          {
            descripcion : "Dolar ",
            fecha : resp[0].fecha_aplica_dol.substring(0, 10),
            //monto : parseFloat( resp[0].ta_dollar ).toFixed(2) + ' Bs. ' + resp[0].fecha_aplica_dol.substring(0, 10),
            monto : this.dol + ' ' + resp[0].fecha_aplica_dol.substring(0, 10),
          },
          {
            descripcion : "Euro ",
            fecha : resp[0].fecha_aplica_eur.substring(0, 10),
            //monto : parseFloat(  resp[0].mn_euro ).toFixed(2) + ' Bs.  ' +  resp[0].fecha_aplica_eur.substring(0, 10),
            monto : this.eur + ' ' + resp[0].fecha_aplica_eur.substring(0, 10),

          },
          {
            descripcion : "Petro ",
            fecha : resp[0].fecha_aplica_ptr.substring(0, 10),
            //monto : parseFloat( resp[0].mn_petro ).toFixed(2) + ' Bs.  ' +  resp[0].fecha_aplica_ptr.substring(0, 10),
            monto : this.pet + ' ' + resp[0].fecha_aplica_ptr.substring(0, 10),
          }        
        ]
      },
      (error) =>{
        console.log("Error del sistema")
      }
    );
  }


}
