import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { finalize } from "rxjs/operators";
import { environment } from '../../../src/environments/environment';
import { ProfessorSubject } from "../models/professor-subject";
import { Subjects } from "../models/subject";

@Injectable({
    providedIn: 'root'
})

export class SubjectService {

    private apiUrl:string = environment.apiUrl;
    private dataStore: {
        subject: Subjects,
        subjects: Subjects[]
    } = {
        subject: new Subjects(),
        subjects: [],
        }

        private _subjects = new BehaviorSubject<Subjects[]>([]);
        public subjects = this._subjects.asObservable();

    constructor(private http: HttpClient){  
}

getSubjects(){
     this.http.get<Subjects[]>(this.apiUrl + '/subject/getAll').subscribe(res=>{
        this.dataStore.subjects =res;
        this._subjects.next(Object.assign({},this.dataStore).subjects);
    });

}
    getSubjectById(id){
        return this.http.get<Subjects>(this.apiUrl +`/subject/${id}`);
    }

    addSubject( subject:Subjects){
        return this.http.post<number>(this.apiUrl + "/subject/addSubject",JSON.stringify(subject))
    }

    deleteSubject(id:any){
        return this.http.delete(this.apiUrl + `/subject/delete/${id}`)
        .pipe(
            (finalize(
                () => this.getSubjects()
                ))
        );
    }
   
}
