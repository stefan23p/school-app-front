import { Component, OnInit } from '@angular/core';
import { FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentTypeEnum } from 'src/app/common/enums/component-type.enum';
import { Professor } from 'src/app/models/professor';
import { ProfessorSubject } from 'src/app/models/professor-subject';
import { Subjects } from 'src/app/models/subject';
import { ProfessorService } from 'src/app/services/professor.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'vex-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit  {
  title:string;
  professor:Professor = new Professor();
  newSubjects = new Array<ProfessorSubject>();
  availableSbjs= new Array<ProfessorSubject>();
  availableSubjects = new Array<Subjects>();
  destroy$ = new Subject();
  showSubjects = true;
  professorSubjects = new Array<Subjects>();
  id;
  form 
  componentType;
  // componentTypeEnum = ComponentTypeEnum;
  availableSubj = false;       
  isDisabled =false;
  isAdd = false;


  constructor(private professorService: ProfessorService, private _activateRoute: ActivatedRoute,
              private _fb: FormBuilder, private subjectService:SubjectService,
              private toast:ToastrService
              ) { }
    

    ngOnInit(): void {
      this.configureForm();
      if(this._activateRoute.snapshot.data['action'] == "edit")
      {
        this.componentType = ComponentTypeEnum.Edit;
        this.id = this._activateRoute.snapshot.paramMap.get('id') ;
        this.title = 'Edit professor';
        this.getData(this.id);
       
      }
      else if(this._activateRoute.snapshot.data['action'] == "view")
      {
        this.componentType = ComponentTypeEnum.View;
        this.id = this._activateRoute.snapshot.paramMap.get('id');
          this.title = 'View professor';
          this.isDisabled =true;
          this.getData(this.id);
          this.form.disable();
      }
      else if(this._activateRoute.snapshot.data['action'] == "add")
      {
        this.componentType = ComponentTypeEnum.Add;
        this.availableSubj = true;
        this.title = 'Add professor';
        this.getSubjects();
        this.isAdd = true;

      }
      
    }

  private configureForm(){
    this.form =  this._fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      consultations: ['', Validators.required],
      officeNumber: ['', Validators.required]
       });
  }

  public onSubmit(){
        let professor: Professor = {
            professorID: this.id,
            name: this.form.get('name').value,
            lastName: this.form.get('lastName').value,
            address: this.form.get('address').value,
            subjects:[],
            newSubjectsToChange: this.newSubjects
          }
            if(this.professor != null){
              this.professorService.addProfessor(professor)
                    .pipe(
                      takeUntil(this.destroy$)
                    )
                      .subscribe(
                        res =>{
                          this.toast.success("Save success.")
                        }
                        ,error => this.toast.error('Save error'));
                      }
                      else
                      {
                        return;
                      }
  }

 private getData(id:any){
    this.professorService.getProfessorById(id)
            .pipe(
              takeUntil(this.destroy$)
                  )
                  .subscribe(
                    res   =>{
                      
                        this.professor = res as Professor;
                        this.getProfessorsSubjects(this.professor.subjects);
                        this.form.setValue(
                          {
                            name: this.professor.name,
                            lastName: this.professor.lastName,
                            address: this.professor.address,
                            email: this.professor.email,
                            consultations: this.professor.consultations,
                            officeNumber: this.professor.officeNumber
                          }
                        )
                    });
    }

   private getSubjects(){
      this.subjectService.subjects
      .pipe(
        takeUntil(this.destroy$)
            ).subscribe(
              res =>{
                this.availableSubjects = res.filter(subject => !this.professorSubjects.includes(subject));
              }
            )
      this.subjectService.getSubjects();
            }

   public addSubject(subject: Subjects){
       if(this.professorSubjects.includes(subject)){
          return;
       }
       else
       {
         this.professorSubjects.push(subject);
         this.availableSubjects = this.availableSubjects.filter(e => e !== subject );
        this.newSubjects.push(
          {
             professor_Id: this.professor.professorID,
             professor: null,
             subject: null,
             subject_Id:subject.subjectID
          }
        )
       }
    }

    public removeSubject(subject: Subjects){
      const index = this.professorSubjects.indexOf(subject);
      this.professorSubjects.splice(index, 1);
      this.availableSubjects.push(subject);
    }
    

    getProfessorsSubjects(data:ProfessorSubject[]){
      this.professorSubjects = data.map(s => s.subject);
    }
    getavailableSubjects(data:ProfessorSubject[]){
      this.availableSubjects = data.map(a => a.subject);
    }

}
