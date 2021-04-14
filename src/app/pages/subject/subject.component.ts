import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subjects } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'vex-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  displayedColumns: string[] = ['rowNumber', 'name', 'semester','actions'];
  destroy$ = new Subject();
  dataSource = new MatTableDataSource<Subjects>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private subjectService:SubjectService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.setLayout();
  }

  
  setLayout(): void{
    this.subjectService.getSubjects();
    this.subjectService.subjects
    .pipe(
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

  deleteSubject(id:number){
    this.subjectService.deleteSubject(id)
    .pipe(
          takeUntil(this.destroy$)
          )
            .subscribe(
          res=>{
              this.toast.success('Delete successfull');
          },
          error=> this.toast.error('Delete error'));
  }


}
