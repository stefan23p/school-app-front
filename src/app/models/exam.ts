import { DateTime } from "luxon";
import { Professor } from "./professor";
import { Subjects } from "./subject";

export class Exam{
    id:number;
    criteria:string;
    numberOfTasks:number;
    type:string;
    date:string;
    professor:Professor;
    subject:Subjects;
    professorID:number;
    subjectID:number;

}