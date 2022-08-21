import { StringUnitLength } from "luxon";
import { ProfessorSubject } from "./professor-subject";

export class Professor{
    professorID:number;
    name:string;
    lastName:string;
    address:string;
    email?: string;
    consultations?: string;
    officeNumber?: number;
    subjects: ProfessorSubject[] = [];
    newSubjectsToChange:ProfessorSubject[] =[];
}