import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Professor } from 'src/app/models/professor';
import {  ExamsService } from 'src/app/services/exams.service';

@Component({
  selector: 'vex-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  constructor(private examsService:ExamsService , private toastr:ToastrService) { }
  destroy$ = new Subject();
  displayedColumns: string[] = ['rowNumber','professor','subject', 'date', 'type', 'criteria', 'actions'];
  dataSource = new MatTableDataSource<Professor>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    this.setLayout();
     }
     
     setLayout(): void{
       this.examsService.getExams()
    
       this.examsService.exams.pipe(
           takeUntil(this.destroy$)
           ).subscribe(
         res=>{
           this.loadData(res);
         }
       )
       }
       
       loadData(data:any): void{
         this.dataSource.data = data;
         this.dataSource.paginator = this.paginator;
       }
 
       deleteExam(id:number){
         this.examsService.deleteExam(id)
         .pipe(
               takeUntil(this.destroy$)
               )
                 .subscribe(
               res=>{
                   this.toastr.success("Delete success.");
               },
               error=> this.toastr.error("Delete error."));
       }
 
       ngOnDestroy(): void {
         this.destroy$.next();
         this.destroy$.complete();
       }
 
}
