import { Professor } from "./professor";
import { Subjects } from "./subject";

export class ProfessorSubject{
    professor_Id:number;
    professor:Professor = new Professor();
    subject_Id:number;
    subject:Subjects = new Subjects();
}