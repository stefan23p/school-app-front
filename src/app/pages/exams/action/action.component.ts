import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Exam } from 'src/app/models/exam';
import { Professor } from 'src/app/models/professor';
import { Subjects } from 'src/app/models/subject';
import { ExamsService } from 'src/app/services/exams.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'vex-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit,OnDestroy {

  constructor(private _activateRoute: ActivatedRoute,
    private _fb: FormBuilder, private examsService: ExamsService,
    private subjectsService:SubjectService , private professorService:ProfessorService,
    private toastr:ToastrService,
   ) { }
    title = "Add exam";
    subject: Subjects = new Subjects();
    subjectId :number;
    professorId:number;
    destroy$ = new Subject();
    professors = new Array<Professor>();
    subjects = new Array<Subjects>();
    exam = new Exam();
    id;
    form = this._fb.group({
      criteria: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      numberOfTasks: ['', Validators.required]
    });
    
    
    ngOnInit(): void {
      this.getData();
      
    }
    
    
    onSubmit(){
          let exam: Exam = {
            id:0,
            date: "02-05-2021",
            criteria:this.form.get('criteria').value,
            type:this.form.get('type').value,
            numberOfTasks: this.form.get('numberOfTasks').value as number,
           subjectID: this.exam.subjectID,
           professorID: this.exam.professorID,
           subject:null,
           professor:null
          }
            if(exam != null){
              this.examsService.addExam(exam)
                  .subscribe(
                    res => {
                      this.toastr.success('Save success.')
                    },
                    error=>{ this.toastr.error("Save error.")}
                  )
            }
    }
    
    
    getData() {
      this.professorService.getProfessors();
      this.subjectsService.getSubjects();
      
      this.professorService.professors
      .pipe(takeUntil(this.destroy$)
      )
      .subscribe(
        res=>{
          this.professors = res as Professor[]
        }
        )
        this.subjectsService.subjects
        .pipe(takeUntil(this.destroy$)
        )        
        .subscribe(
          res =>{
            this.subjects = res as Subjects[]
          }
          )
        }
        
        assignProfessor(professorID){
          this.exam.professorID = professorID;
        }

        assignSubject(subjectID ){
          this.exam.subjectID = subjectID;
        }


        ngOnDestroy(): void {
            this.destroy$.next();
            this.destroy$.complete();
        }
          
        
      }
      