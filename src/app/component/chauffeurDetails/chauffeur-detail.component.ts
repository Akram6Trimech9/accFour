import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
 import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddMinCreditComponent } from '../users-table/modal/addMinCredit/addMinCredit.component';
import { ChauffeurService } from 'src/app/services/chauffeur.service';
import { Chauffeur } from 'src/app/models/chauffeur';
import { AddFournisseurComponent } from './modal/addFournisseur/addFournisseur.component';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur .service';
import { DetailFournisseurComponent } from '../users-table/modal/detailFournisseur/detailFournisseur.component';
 
@Component({
  selector: 'chauffeur-details',
  standalone: true,
  templateUrl: 'chauffeur-detail.component.html',
  imports: [
    FormsModule, ReactiveFormsModule , NgFor, CommonModule ,RouterModule,MatDialogModule
  ],
  styles:[
    `/* Global Styles */
body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #333;
    background-color: #f5f5f5;
  }
  
   .searchinput {
    border-radius: 20px;
    border-color: #ccc;
    padding: 8px 16px;
    width: 300px;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  button{
    border: none;
    background-color: white;
    }
    button > span > i {
    font-size: 18px;
    color:rgb(64, 57, 90) ;
    }
  .customButton {
    background-color: rgb(64, 57, 90);
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .searchAdd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  
  .card-title{
    background:rgb(64, 57, 90) ;
    padding:15px; 
    color:white
  }
  `
  ]
})
export class ChauffeurDetailsComponent implements OnInit {
  
   idUser : string = ''
  constructor(  private route: ActivatedRoute,
    private _fournisseurService: FournisseurService,
     private router : Router,public dialog: MatDialog,private toastr: ToastrService  , private _chaufService : ChauffeurService){
    
  }
  chauffeur !: Chauffeur
  fournisseurs : any[] =[]  
   ngOnInit(): void {
     this.route.params.subscribe(params => {
      const id = params['id'];  
      this.idUser = id
     });
     this._chaufService.getOne(this.idUser).subscribe(res=>{ 
      this.chauffeur = res.data
      this.fournisseurs = this.fournisseurs = res.data.fournisseurs || [];
     })
   }
   openCreditUpdate(fournisseur:any){
    const dialogRef = this.dialog.open(AddMinCreditComponent, {
      data:fournisseur
    });
    dialogRef.componentInstance.fournisseurUpdated.subscribe((updatedFournisseur: Fournisseur) => {
       const index = this.fournisseurs.findIndex(f => f._id === updatedFournisseur._id);
       if (index !== -1) {
        this.fournisseurs[index] = updatedFournisseur;
      }
    });
  }
  deleteFournisseur(id: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
        this._fournisseurService.deleteFournisseur(id).subscribe(
            (res) => {
                if (res.success) {
                     this.fournisseurs = this.fournisseurs.filter(f => f._id !== id);
                     this.toastr.success('Fournisseur supprimé avec succès.', 'Succès');
                } else {
                    console.error('Failed to delete fournisseur:', res.message);
                    this.toastr.error('Une erreur s\'est produite lors de la suppression du fournisseur.', 'Erreur');
                }
            },
            
        );
    }}
   addFournisseur(){ 
     this.dialog.open(AddFournisseurComponent, {
      width: '50%', 
      height: '70%', 
      data:this.chauffeur
    })
   }

   showDetails(fournisseur : Fournisseur){
    this.dialog.open(DetailFournisseurComponent,{
      data: { fournisseur }

    })
  }
}