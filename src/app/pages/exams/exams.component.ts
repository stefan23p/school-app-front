import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Column, TableData } from 'src/app/components/models/table-data-model';
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
  displayedColumns: string[] = ['rowNo','professor','subject', 'date', 'type', 'criteria', 'actions'];
  dataSource = new MatTableDataSource<Professor>();
  columnData: TableData = {
    dataSource: this.dataSource,
    displayColumns: this.displayedColumns,
    columns: [{
      name: 'rowNo',
      title: 'Row number',
      actions: null
    },
    {
      name: 'professor',
      title: 'Full name',
      actions: null
    },
    {
      name: 'subject',
      title: 'Subject',
      actions: null
    },
    {
      name: 'date',
      title: 'Date',
      actions: null
    },
    {
      name: 'type',
      title: 'Type',
      actions: null
    },
    {
      name: 'criteria',
      title: 'Criteria',
      actions: null
    },
    {
      name: 'actions',
      title: 'Actions',
      actions: [{
        type: 'delete',
        icon: 'delete'
      }]
    }
    ]}
  
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
         this.columnData.dataSource.data = data;
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
