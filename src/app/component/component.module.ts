import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
  import { NgbdnavBasicComponent } from './nav/nav.component';
 import { CardsComponent } from './card/card.component';
 import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
     
    NgbdnavBasicComponent,
     CardsComponent,
     MatDialogModule,
    ToastrModule.forRoot(),
    
  ],
  providers:[
    
  ],
  declarations: [
     
  ]
})
export class ComponentsModule { }
