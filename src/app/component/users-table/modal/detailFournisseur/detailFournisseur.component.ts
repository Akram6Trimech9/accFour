import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chauffeur } from 'src/app/models/chauffeur';
import { Fournisseur } from 'src/app/models/fournisseur';

@Component({
  selector: 'app-detail-fournisseur',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <img src="{{ data.fournisseur.photo }}" class="img-fluid rounded" alt="Chauffeur Photo">
            </div>
            <div class="col-md-8">
              <p><strong>Nom:</strong> {{ data.fournisseur.firstName }}</p>
              <p><strong>Prénom:</strong> {{ data.fournisseur.lastName }}</p>
              <p><strong>CIN:</strong> {{ data.fournisseur.cin }}</p>
              <p><strong>Mobile:</strong> {{ data.fournisseur.mobile }}</p>
              <p><strong>Email:</strong> {{ data.fournisseur.email }}</p>
              <p><strong>Credit:</strong> {{ data.fournisseur.credit }}</p>
              <p><strong>Address:</strong> {{ data.fournisseur.address }}</p>

             </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-secondary" (click)="closeDialog()">Close</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./detailFournisseur.component.css']
})
export class DetailFournisseurComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { fournisseur: Fournisseur } ,     private dialogRef: MatDialogRef<DetailFournisseurComponent> ,
) {}

  closeDialog(): void {
    this.dialogRef.close();

   }
}
