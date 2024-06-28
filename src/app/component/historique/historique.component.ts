import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Historique } from 'src/app/models/historique';
import { HistoryService } from 'src/app/services/history.service';
 

@Component({
  selector: 'app-historique',
  standalone: true,
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css'],
  imports:[CommonModule,FormsModule,ToastrModule]
})
export class HistoriqueComponent implements OnInit {
  creditHistory: Historique[] = [];
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;
  searchQuery=''

  constructor(private historyService: HistoryService, private toastr: ToastrService) { }
  search(){
    this.historyService.searchHistorique(this.searchQuery).subscribe(res=>{
      this.creditHistory = res.data
    })
  }
  ngOnInit(): void {
    this.loadCreditHistory();
  }

  loadCreditHistory(): void {
    this.historyService.getAllCreditHistory(this.pageSize, this.currentPage).subscribe((res) => {
      if (res.success) {
        this.creditHistory = res.data;
        this.totalItems = res.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);  
      } else {
        console.error('Failed to fetch credit history');
      }
    });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadCreditHistory();
  }
  deleteHistorique(id: any): void {
    this.historyService.deleteHistorique(id).subscribe(res => {
      if (res) {
        this.creditHistory = this.creditHistory.filter(item => item._id !== id);
        this.toastr.success('History  deleted successfully!');
      } else {
        this.toastr.error('Failed to delete history item.');
      }
    } )
  }
}
