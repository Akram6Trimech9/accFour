import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Tableau de bord',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/chauffeur',
    title: 'Chauffeurs',
    icon: 'bi bi-car-front',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/fournisseur',
    title: 'Fornisseur',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/component/historique',
    title: 'Historique',
    icon: 'bi bi-hdd-stack',
    class: '',
    extralink: false,
    submenu: []
  } 

];
