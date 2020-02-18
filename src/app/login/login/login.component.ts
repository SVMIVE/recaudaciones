import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, Usuario } from '../../servicio/auth/login.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../@core/data/users';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

    money = 9876543.21;
    protected options: {};
    redirectDelay: number;
    showMessages: any;
    strategy: string;
    errors: string[];
    messages: string[];
    submitted: boolean;
    rememberMe: boolean;
    nombre: string;
    clave: string;
    clase: string;
    loading = false;
    selectedItem: string;
    estatus: string;
    index = 0;

    // tslint:disable-next-line: one-line
    constructor(private loginServicio: LoginService, private router: Router, private toastrService: NbToastrService){ }

  ngOnInit() {

  }

  showToast(position, status, msj) {
    this.index += 1;
    this.toastrService.show(
      status || 'Success',
      msj,
      { position, status });
  }


  async login () {
    this.loading = true;

    const usr: Usuario = {
      nombre : this.nombre,
      clave : this.clave,
      clase : this.clase,
    };



    await this.loginServicio.Validar(usr).subscribe(
      (resp) => {
        console.log( resp )
        localStorage.setItem( 'key.iaim', resp.token );
        this.router.navigateByUrl('/home/tasa');

      },
      (error) => {
        this.showToast('top-right', 'danger', 'Usuario o clave errada');
        this.nombre = '',
        this.clave = '',
        this.loading = false;
      },
    );
  }
  PresionarEnter(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }
}
