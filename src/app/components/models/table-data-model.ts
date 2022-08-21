import { MatTableDataSource } from "@angular/material/table";

export class TableData{
    dataSource: MatTableDataSource<any>;
    displayColumns: string[];
    columns:Column[]
} 


export class Column {
    name: string;
    title: string;
    actions: [{
        type: string,
        icon: string
    }]
}