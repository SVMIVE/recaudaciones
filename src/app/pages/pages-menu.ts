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
    title: 'Pagos',
    icon: 'credit-card',
    link: '/home/pagos',
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
        link: '/home/concepto',
      },{
        title: 'Bancos',
        icon: 'inbox',
        link: '/home/bancos',
      },{
        title: 'Actividades',
        icon: 'bulb-outline',
        link: '/home/actividades',
      },{
        title: 'Servicios',
        icon: 'briefcase',
        link:'/home/servicios',
      },{
        title: 'Monedas',
        icon: 'hash',
        link: '/home/moneda',
      },{
        title: 'Pagadores',
        icon: 'layers',
        link: '/home/pagadores',
      },{
        title: 'Control',
        icon: 'options',
        link: '/home/control',
      },      
      {
        title: 'Seguirdad',
        icon: 'shield',
        link: '/home/seguridad',
      },
    ],
  },{
    title: 'Cerrar Sesión',
    icon: 'log-out',
    link: '/home/salir',
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