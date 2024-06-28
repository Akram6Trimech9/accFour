import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chauffeur } from 'src/app/models/chauffeur';

@Component({
  selector: 'app-detail-chauf',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <img src="{{ data.chauffeur.photo }}" class="img-fluid rounded" alt="Chauffeur Photo">
            </div>
            <div class="col-md-8">
              <p><strong>First Name:</strong> {{ data.chauffeur.firstName }}</p>
              <p><strong>Last Name:</strong> {{ data.chauffeur.lastName }}</p>
              <p><strong>CIN:</strong> {{ data.chauffeur.cin }}</p>
              <p><strong>Mobile:</strong> {{ data.chauffeur.mobile }}</p>
              <p><strong>Email:</strong> {{ data.chauffeur.email }}</p>
              <p><strong>Transport Name:</strong> {{ data.chauffeur.transportName }}</p>
              <p><strong>Transport Series:</strong> {{ data.chauffeur.transportSerie }}</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-secondary" (click)="closeDialog()">Close</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./detailChauf.component.css']
})
export class DetailChaufComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { chauffeur: Chauffeur } ,     private dialogRef: MatDialogRef<DetailChaufComponent> ,
) {}

  closeDialog(): void {
    this.dialogRef.close();

   }
}
