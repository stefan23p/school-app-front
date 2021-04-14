import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { SubjectComponent } from './subject.component';


const routes: Routes = [
            {
             path: '',
             component: SubjectComponent
            }
            ,
            {
                path:'view/:id',
                component:ActionComponent,
                data:{
                    action:'view'
                }
            },
            {
                path:'edit/:id',
                component:ActionComponent,
                data:{
                    action:'edit'
                }
            },
            {
                path:'add',
                component:ActionComponent,
                data:{
                    action:'add'
                }
            }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubjectRoutingModule {
}
