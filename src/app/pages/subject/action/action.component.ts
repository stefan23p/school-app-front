import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subjects } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'vex-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})

export class ActionComponent implements OnInit,OnDestroy {

  constructor(private _activateRoute: ActivatedRoute,
    private _fb: FormBuilder, private subjectService: SubjectService,
    private toast: ToastrService 
    ) { }
    
    title: string;
    subject: Subjects = new Subjects();
    destroy$ = new Subject();
    subjects = [];
    id;
    form = this._fb.group({
      name: ['', Validators.required],
      semester: ['', Validators.required]
    });
    
    
    isDisabled = false;
    
    ngOnInit(): void {
      
      if (this._activateRoute.snapshot.data['action'] == "edit") {
        this.id = this._activateRoute.snapshot.paramMap.get('id');
        this.title = 'Edit subject';
        this.getData(this.id);
      }
      else if (this._activateRoute.snapshot.data['action'] == "view") {
        this.id = this._activateRoute.snapshot.paramMap.get('id');
        this.title = 'View subject';
        this.isDisabled = true;
        this.getData(this.id);
        this.form.disable();
      }
      else if (this._activateRoute.snapshot.data['action'] == "add") {
        this.title = 'Add subject';
        this.isDisabled = false;
        this.id = 0;
      }
      
    }
    
    
    getData(id: any) {
      this.subjectService.getSubjectById(id)
      .pipe(
        takeUntil(this.destroy$)
        )
        .subscribe(
          res => {
            this.subject = res as Subjects;
            this.form.setValue(
              {
                name: this.subject.name,
                semester: this.subject.semester
              }
              )
            });
          }
          
          onSubmit() {
            let subject: Subjects = {
              subjectID: this.id,
              name: this.form.get('name').value,
              semester: this.form.get('semester').value,
              professors: null
            }
            if (subject != null) {
              this.subjectService.addSubject(subject)
              .pipe(
                takeUntil(this.destroy$)
                )
                .subscribe(
                  res => {
                    this.toast.success('Save success.')
                  },
                  error => this.toast.error('Save error')
                  );
                    }
                    else {
                      return;
                    }
                  }

                  ngOnDestroy(): void {
                    this.destroy$.next();
                    this.destroy$.complete();
                  }
                }
                