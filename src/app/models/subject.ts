import { Professor } from "./professor";

export class Subjects{
    subjectID:number;
    name:string;
    semester:number;
    professors:Professor[] = [];
    
}