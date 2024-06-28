import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Chauffeur } from 'src/app/models/chauffeur';
import { Fournisseur } from 'src/app/models/fournisseur';
import { ChauffeurService } from 'src/app/services/chauffeur.service';
import { FournisseurService } from 'src/app/services/fournisseur .service';

@Component({
  selector: 'app-edit-fournisseur',
  standalone: true,
  templateUrl: './editFournisseur.component.html',
   styleUrls: ['./editFournisseur.component.css'],
  imports: [MatDialogModule,ReactiveFormsModule,CommonModule,FormsModule],
})
export class EditFournisseurComponent {
  @Output() fournisseurAdded: EventEmitter<any> = new EventEmitter();  
  chauffeurs!: Chauffeur[]

  fornisseurForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileBase64: string | ArrayBuffer | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { fournisseur: Fournisseur } ,private fb: FormBuilder , private  _chauffeurService : ChauffeurService , 
    private dialogRef: MatDialogRef<EditFournisseurComponent> ,
    private toastr: ToastrService,
    private _fournisseurService : FournisseurService

  ) {}

  ngOnInit(): void {
    this._chauffeurService.getAll().subscribe(res => {
      this.chauffeurs = res.data
    })
    this.fornisseurForm = this.fb.group({
      firstName: [this.data.fournisseur.firstName, Validators.required],
      cin: [this.data.fournisseur.cin, Validators.required],
      mobile: [this.data.fournisseur.mobile, [Validators.required, Validators.pattern(/^\d+$/)]],
      lastName: [this.data.fournisseur.lastName, Validators.required],
      email: [this.data.fournisseur.email, [Validators.required, Validators.email]],
      credit: [this.data.fournisseur.credit, Validators.required],
      address: [this.data.fournisseur.address, Validators.required],
      photo: [this.data.fournisseur.photo],
      chauffeur: [this.data.fournisseur.chauffeur, Validators.required],
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
       const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = reader.result;
      };
      reader.onerror = (error) => {
        console.error('File reading failed:', error);
      };
      reader.readAsDataURL(file);
  
      this.fornisseurForm.patchValue({
        photo: file
      });
    }
  }
  onSubmit(): void {
    if (this.fornisseurForm.valid) {
       if(this.selectedFile){
        const formData = new FormData();
        formData.append('firstName', this.fornisseurForm.value.firstName);
        formData.append('cin', this.fornisseurForm.value.cin);
        formData.append('mobile', this.fornisseurForm.value.mobile);
        formData.append('lastName', this.fornisseurForm.value.lastName);
        formData.append('email', this.fornisseurForm.value.email);
        formData.append('credit', this.fornisseurForm.value.credit);
        formData.append('address', this.fornisseurForm.value.address);
        formData.append('photo', this.selectedFile);
        this._fournisseurService.updateFournisseur(formData, this.data.fournisseur._id).subscribe(res => {
          if (res) {
            this.toastr.success('Fournisseur updated successfully', 'Success');
            this.dialogRef.close();
            this.fournisseurAdded.emit(res);
          }
        });
       }else{
         const  record : Fournisseur  ={
             ...this.fornisseurForm.value
         }
        this._fournisseurService.updateFournisseur(record, this.data.fournisseur._id).subscribe(res => {
          if (res) {
            this.toastr.success('Fournisseur updated successfully', 'Success');
            this.dialogRef.close();
            this.fournisseurAdded.emit(res);
          }
        });
       }
     
    } else {
      this.fornisseurForm.markAllAsTouched();
    }
  }
  
  
 }
