import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, Usuario } from '../../servicio/auth/login.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../@core/data/users';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

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

    // tslint:disable-next-line: one-line
    constructor(private loginServicio: LoginService, private router: Router){ }

  ngOnInit() {

  }

  async login () {
    this.loading = false;

    const usr: Usuario = {
      nombre : this.nombre,
      clave : this.clave,
      clase : this.clase,
    };

    await this.loginServicio.Validar(usr).subscribe(
      (resp) => {
        sessionStorage.setItem('key-iaim', resp.token);
        this.router.navigateByUrl('/home/tasa');
      },
      (error) => {
        console.error('No se logro conectar...');
      },
    );
    this.loading = true;
  }
}
