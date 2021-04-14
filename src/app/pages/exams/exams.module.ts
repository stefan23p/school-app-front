import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { ExamsRoutingModule } from './exams-routing.module';
import { ExamsComponent } from './exams.component';
import { ActionComponent } from './action/action.component';
@NgModule({
  declarations:[ExamsComponent, ActionComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    IconModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    PageLayoutModule,
    SecondaryToolbarModule,
    MatProgressSpinnerModule,
    ExamsRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    BreadcrumbsModule,
  ]
})
export class ExamsModule { }
