import { Routes } from '@angular/router';

import { NgbdnavBasicComponent } from './nav/nav.component';
import { CardsComponent } from './card/card.component';
import { ChauffeurDetailsComponent } from './chauffeurDetails/chauffeur-detail.component';
import { HistoriqueComponent } from './historique/historique.component';
import { UsersTableComponent } from './users-table/users-table.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chauffeur',
        component: CardsComponent,
      },
      {
        path: 'chauffeur-details/:id',
        component: ChauffeurDetailsComponent,
      },
      {
        path: 'fournisseur',
        component: UsersTableComponent,
      },
      {
        path: 'historique',
        component: HistoriqueComponent,
      },

      {
        path: 'nav',
        component: NgbdnavBasicComponent,
      },
    ],
  },
];
