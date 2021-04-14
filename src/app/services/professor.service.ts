import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { environment } from '../../../src/environments/environment';
import { Professor } from "../models/professor";

@Injectable({
    providedIn: 'root'
})

export class ProfessorService {

   private apiUrl = environment.apiUrl;
    private dataStore: {
        professor: Professor,
        professors: Professor[]
    } = {
            professor: new Professor(),
            professors: [],
        }

    private _professors = new BehaviorSubject<Professor[]>([]);
    public professors = this._professors.asObservable();

    constructor(private http: HttpClient) { }

    getProfessors(): void {
        this.http.get<Professor[]>(this.apiUrl + '/professor/getAll')
                .subscribe(res => {
                    this.dataStore.professors = res;
                    this._professors.next(Object.assign({}, this.dataStore).professors)
                });
    }

    addProfessor(professor: Professor) {
        return this.http.post<number>(this.apiUrl + '/professor/addProfessor', JSON.stringify(professor));
    }

    getProfessorById(id: any): Observable<Professor> {
        return this.http.get<Professor>(this.apiUrl + `/professor/${id}`);
    }

   

    deleteProfessor(id: number): Observable<any> {
        return this.http.delete(this.apiUrl + `/professor/delete/${id}`)
            .pipe(finalize(
                () => {
                    this.getProfessors();
                }
            ));
    }
}