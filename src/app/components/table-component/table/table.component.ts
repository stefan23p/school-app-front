import { Component, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column, TableData } from '../../models/table-data-model';
import * as cloneDeep from 'lodash/cloneDeep'; 
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'vex-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableData: TableData;
  @Output() actionData: any;
  displayColumns: string[];
  columns: Column[];
  dataSource: MatTableDataSource<any>;
  originalData: any;
  filteredData: any;
  actions: any[];
  totalNumber = 0;
  formControl: FormControl = new FormControl('', null);
  destroy$: Subject<void>;
  constructor() { }

  ngOnInit(): void {
   this.configureTable();
   this.configureForm();
  }

  public getColumnData(columnData: any, propertyName: string){
    return columnData[propertyName];
  }

  public selectAction(columnData: any, actionType: string){
    this.actionData.emit({
      columnData,
      actionType
    })
  }

  private configureTable(){
    this.dataSource = this.tableData?.dataSource;
    this.filteredData = this.dataSource.data;
    this.displayColumns = this.tableData?.displayColumns;
    this.columns = cloneDeep(this.tableData?.columns);

    if(this.tableData?.displayColumns.includes('actions')){
      const index = this.columns.findIndex(c => c.name === 'actions');
      this.actions = this.columns[index].actions;
    }
    this.totalNumber = this.dataSource.data.length;
  }

  private configureForm(){
    this.formControl.valueChanges.subscribe(
      filter => {
        this.filterTable(filter);
      }
    )
  }

  private filterTable(filter){
    const fltr = filter.trim().toLowerCase();
    const filteredArray = this.filteredData.filter(obj => obj.type.toLowerCase().includes(fltr));
    this.dataSource.data = filteredArray;
  }
  
}
