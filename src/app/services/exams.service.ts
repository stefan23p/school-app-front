import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Exam } from "../models/exam";

@Injectable({
    providedIn: 'root'
})

export class ExamsService {

   private apiUrl: string = environment.apiUrl;
    private dataStore: {
        exams: Exam[]
    } = {
            exams: [],
        }

    private _exams = new BehaviorSubject<Exam[]>([]);
    public exams = this._exams.asObservable();

    constructor(private http: HttpClient) {
    }

    getExams() {
        return this.http.get<Exam[]>(this.apiUrl + '/exams/getAll').subscribe(res => {
            this.dataStore.exams = res;
            this._exams.next(Object.assign({}, this.dataStore).exams);
        });
    }

    addExam(exam:Exam){
        return this.http.post(this.apiUrl + '/exams/addExam',JSON.stringify(exam));
    }

    deleteExam(id:number){
        return this.http.delete<number>(this.apiUrl +`/exams/delete/${id}`)
                    .pipe( finalize(() =>{
                        this.getExams()
                    }))
    }
}