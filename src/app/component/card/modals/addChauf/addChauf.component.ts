import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChauffeurService } from 'src/app/services/chauffeur.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-chauf',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addChauf.component.html',
  styleUrls: ['./addChauf.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddChaufComponent implements OnInit {
  @Output() chauffeurAdded: EventEmitter<any> = new EventEmitter();  

  chauffeurForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder , private  _chauffeurService : ChauffeurService , 
    private dialogRef: MatDialogRef<AddChaufComponent> ,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.chauffeurForm = this.fb.group({
      firstName: ['', Validators.required],
      cin: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      transportName: ['', Validators.required],
      transportSerie: ['', Validators.required],
      photo: ['']
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.chauffeurForm.patchValue({
        photo: file
      });
    }
  }
  onSubmit(): void {
    if (this.chauffeurForm.valid) {
      const formData = new FormData();
      Object.keys(this.chauffeurForm.controls).forEach(key => {
        formData.append(key, this.chauffeurForm.get(key)?.value);
      });
 
      this._chauffeurService.postChauffeur(formData).subscribe(res=>{
          if(res){
            this.toastr.success('Chauffeur added successfully', 'Success');
            this.dialogRef.close();
            this.chauffeurAdded.emit(res);
          }
      })
    } else {
      this.chauffeurForm.markAllAsTouched();
    }
  }
}