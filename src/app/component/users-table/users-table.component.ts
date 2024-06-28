import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/models/fournisseur';
import { FournisseurService } from 'src/app/services/fournisseur .service';
import { AddFournisseurComponent } from './modal/addFournisseur/addFournisseur.component';
import { AddMinCreditComponent } from './modal/addMinCredit/addMinCredit.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DetailFournisseurComponent } from './modal/detailFournisseur/detailFournisseur.component';
import { EditFournisseurComponent } from './modal/editFournisseur/editFournisseur.component';
 
@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
    standalone:true,
    imports:[CommonModule,FormsModule]
})
export class UsersTableComponent implements OnInit {
    fournisseurs: Fournisseur[] = [];
    currentPage: number = 1;
    totalPages: number = 0;
    pageSize: number = 5;
    pages: number[] = [];
    searchQuery: string = '';

    constructor(public dialog: MatDialog,private _fournisseurService: FournisseurService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.loadFournisseurs();
    }

    loadFournisseurs(): void {
        this._fournisseurService.getAllFournisseur(this.pageSize, this.currentPage).subscribe((res) => {
            if (res.success) {
                this.fournisseurs = res.data;
                this.totalPages = Math.ceil(res.totalItems / this.pageSize);
                this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
            } else {
                console.error('Failed to fetch fournisseurs');
            }
        });
    }

    onPageChange(page: number): void {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.loadFournisseurs();
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
    updateFournisseur(fournisseur: any): void {
      const dialogRef = this.dialog.open(EditFournisseurComponent, {
          width: '50%',
          height: '70%',
          data: { fournisseur }
      });
      dialogRef.componentInstance.fournisseurAdded.subscribe((updatedFournisseur: any) => {
          const index = this.fournisseurs.findIndex(f => f._id === updatedFournisseur.data._id);
          if (index !== -1) {
              this.fournisseurs[index] = updatedFournisseur.data;
          }
      });
  }
    openAddFournisseur(){
      const dialogRef = this.dialog.open(AddFournisseurComponent, {
        width: '50%', 
        height: '70%', 
      });
    }
    search() {
      this._fournisseurService.searchFournisseurs(this.searchQuery).subscribe(
        res=>{
             if (res.success) {
              this.fournisseurs = res.data;
            }
          },
           
       );
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
      }
  }
  showDetails(fournisseur : Fournisseur){
    this.dialog.open(DetailFournisseurComponent,{
      data: { fournisseur }

    })
  }
}
