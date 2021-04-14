import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { IconModule } from "@visurel/iconify-angular";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";
import { SubjectRoutingModule } from "./subject-routing.module";
import { SubjectComponent } from "./subject.component";
import { ActionComponent } from './action/action.component';

@NgModule({
    declarations:[SubjectComponent, ActionComponent],
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
      SubjectRoutingModule,
      MatToolbarModule,
      MatInputModule,
      MatListModule,
      MatIconModule,
      BreadcrumbsModule
    ]
  })
  export class SubjectModule { }