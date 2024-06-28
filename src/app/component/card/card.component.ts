import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DetailChaufComponent } from './modals/detailChauf/detailChauf.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { EditChaufComponent } from './modals/editChauf/editChauf.component';
import { AddChaufComponent } from './modals/addChauf/addChauf.component';
import { Chauffeur } from 'src/app/models/chauffeur';
import { ChauffeurService } from 'src/app/services/chauffeur.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
@Component({
  templateUrl: 'card.component.html',
  styleUrls:['card.component.css'],
  standalone: true,
  imports:[CommonModule,RouterModule,MatDialogModule,MatPaginatorModule,FormsModule]
})
export class CardsComponent implements OnInit {
   chauffeurs : Chauffeur[] =[]
   totalItems = 0;
   pageSize = 5;
   currentPage = 1;
   searchQuery: string = '';
   selectedChauffeurs: Chauffeur[] = [];

  constructor(private router : Router,public dialog: MatDialog,private toastr: ToastrService , private _chauffeurService : ChauffeurService){}
  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getChauffeurs();
  }
  ngOnInit(): void {
    this.getChauffeurs()
  }
  getChauffeurs(): void {
    this._chauffeurService.getAllChauffeurs(this.pageSize, this.currentPage).subscribe(res => {
      this.chauffeurs = res.data;
      this.totalItems = res.totalItems;
    });
  }
  takeMeToDetails(id:any){ 
    this.router.navigateByUrl(`component/chauffeur-details/${id}`)
  }
  openDetails(chauffeur : Chauffeur){
    this.dialog.open(DetailChaufComponent , {
      data: { chauffeur }
    }
    );

  }
  openAddChauffeur(){
    const dialogRef = this.dialog.open(AddChaufComponent, {
      width: '50%', 
      height: '70%', 
    });

    dialogRef.componentInstance.chauffeurAdded.subscribe((event) => {
          console.log(event.data,"event")
        this.chauffeurs.push(event.data)
        console.log(this.chauffeurs,"chauffeurs table ")
    });
  }  
  deleteChauffeur(chauffeur: Chauffeur): void { 
    this._chauffeurService.deleteChauffeur(chauffeur._id).subscribe(res => {
      if (res.success) {
        this.chauffeurs = this.chauffeurs.filter((item: Chauffeur) => item._id !== chauffeur._id);
        this.toastr.success('Chauffeur deleted successfully', 'Success', {
          positionClass: 'toast-bottom-right'
        });
      }
    });
  }
  onCheckboxChange(event: any, chauffeur: Chauffeur): void {
    if (event.target.checked) {
      this.selectedChauffeurs.push(chauffeur);
     } else {
      const index = this.selectedChauffeurs.findIndex((selected) => selected._id === chauffeur._id);
      if (index !== -1) {
        this.selectedChauffeurs.splice(index, 1);
      }
    }
  }
  onActionChange(event:any): void {
    if (event.target.value === 'deleteAll') {
      this.chauffeurs.forEach(async (chauffeur: Chauffeur) => {
        await this._chauffeurService.deleteChauffeur(chauffeur._id).subscribe(res => {
          if (res.success) {
            this.chauffeurs = this.chauffeurs.filter((item: Chauffeur) => item._id !== chauffeur._id);
          }
        });
        this.selectedChauffeurs= []
      });

     } else if (event.target.value  === 'deleteSelected') {
      this.selectedChauffeurs.forEach(async (chauffeur: Chauffeur) => {
        await this._chauffeurService.deleteChauffeur(chauffeur._id).subscribe(res => {
          if (res.success) {
            this.chauffeurs = this.chauffeurs.filter((item: Chauffeur) => item._id !== chauffeur._id);
          }
        });
        this.selectedChauffeurs= []

      });
     }
  }
  
  editChauffeur(chauffeur: Chauffeur): void {
    const dialogRef = this.dialog.open(EditChaufComponent, {
      width: '50%',
      height: '70%',
      data: { chauffeur }
    });

    dialogRef.componentInstance.chauffeurEdited.subscribe(updatedChauffeur => {
       const index = this.chauffeurs.findIndex(ch => ch._id === updatedChauffeur.data._id);
      if (index !== -1) {
        this.chauffeurs[index] = updatedChauffeur.data;
      }
    });
  }
  addChauffeur(){
    this.dialog.open(AddChaufComponent);
  }
  searchChauffeurs() {
    this._chauffeurService.searchChauffeurs(this.searchQuery).subscribe(
      res=>{
           if (res.success) {
            this.chauffeurs = res.data;
          }
        },
         
     );
  }
}
