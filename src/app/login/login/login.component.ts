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

    // tslint:disable-next-line: one-line
    constructor(private loginServicio: LoginService, private router: Router){ }

  ngOnInit() {
    console.error('Control de pasos');
  }

  login () {
    this.loading = true;
    // setTimeout(() => this.loading = false, 3000);
    const usr: Usuario = {
      nombre : this.nombre,
      clave : this.clave,
      clase : this.clase,
    };

    this.loginServicio.Validar(usr).subscribe(
      (resp) => {
//        console.log(resp.token)
        sessionStorage.setItem('key-iaim', resp.token);

        this.router.navigateByUrl('home');
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('No se logro conectar...');
      },
    );
  }

}
