import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur .service';

@Component({
  selector: 'app-add-min-credit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: `
    <div class="modal-test">
      <h2>Gérer le Crédit</h2>
      <div class="options">
        <button class="btn" (click)="selectOption('add')">Ajouter Crédit</button>
        <button class="btn" (click)="selectOption('remove')">Retirer Crédit</button>
      </div>

      <div *ngIf="action === 'remove'" class="payment-method">
        <p>Comment souhaitez-vous retirer le crédit ?</p>
        <select [(ngModel)]="paymentMethod" class="dropdown">
          <option value="" disabled selected>Sélectionnez une méthode</option>
          <option value="espece">Espèce</option>
          <option value="cheque">Chèque</option>
        </select>
      </div>

      <div *ngIf="action" class="credit-form">
        <p>{{ action | uppercase }} Crédit</p>
        <input [(ngModel)]="creditAmount" placeholder="Entrez le montant du crédit" type="number" class="input" />
        <button class="btn submit" (click)="processCredit()">Soumettre</button>
      </div>
    </div>
  `,
  styleUrls: ['./addMinCredit.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddMinCreditComponent {
  action: 'add' | 'remove' | null = null;
  paymentMethod: 'espece' | 'cheque' | null = null;
  creditAmount: number = 0;
  fournisseurUpdated: EventEmitter<Fournisseur> = new EventEmitter<Fournisseur>();

  constructor(private _fournisseurService : FournisseurService,
    private dialogRef: MatDialogRef<AddMinCreditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    console.log(data,"ok")
  }
  selectOption(option: 'add' | 'remove') {
    this.action = option;
    if (option === 'add') {
      this.paymentMethod = null;  
    }
  }

  processCredit() {
    if (this.action === 'remove' && !this.paymentMethod) {
      alert('Veuillez sélectionner une méthode de paiement.');
      return;
    }
    if (this.action === 'add') {
      this._fournisseurService.updateCredit({amount:this.creditAmount,method:this.paymentMethod,type:'credit'},this.data._id).subscribe(res=>{
           if(res.success){
            this.fournisseurUpdated.emit(res.data);
              this.dialogRef.close()
           }
      })
    } else if (this.action === 'remove') {
      this._fournisseurService.updateCredit({amount:this.creditAmount,method:this.paymentMethod,type:'debit'},this.data._id).subscribe(res=>{
        if(res.success){
          console.log(res.data,'fournisseur')
          this.fournisseurUpdated.emit(res.data);

          this.dialogRef.close()
        }
   })
    }

    this.action = null;
    this.paymentMethod = null;
    this.creditAmount = 0;
  }
}
