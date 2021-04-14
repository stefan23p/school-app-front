import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';

const routes: Routes = [
  {path:'' ,redirectTo:'professor',pathMatch:'full'},
  {
    path: '' ,
    component: CustomLayoutComponent,
    children: [
      {path:'professor', loadChildren:() => import('./pages/professor/professor.module').then(m => m.ProfessorModule)},
      {path:'subject', loadChildren:() => import('./pages/subject/subject.module').then(m => m.SubjectModule)},
      {path:'exams', loadChildren:() => import('./pages/exams/exams.module').then(m =>m.ExamsModule)}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
