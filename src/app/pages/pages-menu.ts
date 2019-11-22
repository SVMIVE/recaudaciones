import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Principal',
    icon: 'home',
    link: '/home/tasa',
    home: true,
  },{
    title: 'Documentos',
    icon: 'book-outline',
    link: '/home/documentos',
  },{
    title: 'Configuración',
    icon: 'settings-2-outline',
    children: [      
      {
        title: 'Cliente',
        icon: 'person-add-outline',
        link: '/home/cliente',
      },{
        title: 'Conceptos',
        icon: 'layers',
        link: '/pages/forms/inputs',
      },{
        title: 'Bancos',
        icon: 'inbox',
        link: '/pages/forms/inputs',
      },{
        title: 'Actividades',
        icon: 'bulb-outline',
        link: '/pages/forms/inputs',
      },{
        title: 'Servicios',
        icon: 'briefcase',
        link: '/pages/forms/inputs',
      },{
        title: 'Monedas',
        icon: 'hash',
        link: '/pages/forms/inputs',
      },{
        title: 'Pagadores',
        icon: 'credit-card',
        link: '/pages/forms/inputs',
      },{
        title: 'Control',
        icon: 'options',
        link: '/pages/forms/inputs',
      },      
      {
        title: 'Seguirdad',
        icon: 'shield',
        link: '/auth/seguridad',
      },
    ],
  },{
    title: 'Cerrar Sesión',
    icon: 'log-out',
    link: '/home/documentos',
  },
];


/**
 * 
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
 */