import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
    selector: 'vex-professor',
    templateUrl: './professor.component.html',
    styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit, OnDestroy {
    constructor(
        private professorService: ProfessorService,
        private toastr: ToastrService
    ) {}
    destroy$ = new Subject()
    displayedColumns: string[] = [
        'rowNumber',
        'name',
        'lastName',
        'address',
        'actions',
    ]
    dataSource = new MatTableDataSource<Professor>()

    @ViewChild(MatPaginator) paginator: MatPaginator

    ngOnInit(): void {
        this.setLayout()
    }

    public setLayout(): void {
        this.professorService.getProfessors()

        this.professorService.professors
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                this.loadData(res)
            })
    }

    public loadData(data: any): void {
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator
    }

    public deleteProfessor(id: number) {
        this.professorService
            .deleteProfessor(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (res) => {
                    this.toastr.success('Delete success.')
                },
                (error) => this.toastr.error('Delete error.')
            )
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }
}

