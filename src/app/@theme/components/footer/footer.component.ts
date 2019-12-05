import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><a href="http://www.aeropuerto-maiquetia.com.ve/web/" target="_blank">IAIM</a> 2019</span>
    <div class="socials">
      <a href="https://twitter.com/IAIM_VE" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.instagram.com/iaim_ve/" target="_blank" class="ion ion-social-instagram"></a>
    </div>
  `,
})
/*
<<a href="#" target="_blank" class="ion ion-social-github"></a>
<a href="#" target="_blank" class="ion ion-social-facebook"></a>
<a href="#" target="_blank" class="ion ion-social-twitter"></a>
<a href="#" target="_blank" class="ion ion-social-linkedin"></a>
*/
export class FooterComponent {
}
