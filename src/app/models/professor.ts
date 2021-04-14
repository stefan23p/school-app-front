import { ProfessorSubject } from "./professor-subject";

export class Professor{
    professorID:number;
    name:string;
    lastName:string;
    address:string;
    subjects: ProfessorSubject[] = [];
    newSubjectsToChange:ProfessorSubject[] =[];
}