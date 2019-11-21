import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Principal',
    icon: 'grid-outline',
    link: '/home/tasa',
    home: true,
  },
  {
    title: 'Cliente',
    icon: 'person-add-outline',
    link: '/home/cliente',
    home: true,
  },
  {
    title: 'Conceptos',
    icon: 'list-outline',
    link: '/pages/forms/inputs',
    home: true,
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'OTROS',
    group: true,
  },
  {
    title: 'Documentos',
    icon: 'book-outline',
    children: [
      {
        title: 'Factura',
        icon: 'layout-outline',
        //link: '/pages/forms/inputs',
      },
      {
        title: 'Nota Debito',
        icon: 'file-outline',
        //link: '/pages/forms/layouts',
      },
      {
        title: 'Nota Credito',
        icon: 'file-text-outline',        
        link: '/pages/forms/buttons',
      },
      {
        title: 'Cuentas Por Cobrar',
        icon: 'folder-add-outline',
        //link: '/pages/forms/inputs',
      },
      {
        title: 'Cuentas Por Pagar',
        icon: 'folder-remove-outline',
        //link: '/pages/forms/inputs',
      },
    ],
  },
  {
    title: 'Seguridad',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
