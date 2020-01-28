import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[ngxPasswordValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true}],
})
export class PasswordValidationDirective implements Validator {

  passwordsProhibidos = [''];

validate(control: import('@angular/forms').AbstractControl): import('@angular/forms').ValidationErrors {
  const password = <string>control.value;

  if (!password) {return; }

  if (password.length < 6) {return; }

  if (this.passwordsProhibidos.indexOf(password) !== -1) {
    return {'passwordValidation': {'message': 'Ingrese un Password Válido'}};
  }
}
  constructor() {}
}
