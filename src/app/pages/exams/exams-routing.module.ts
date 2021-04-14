import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { ExamsComponent } from './exams.component';


const routes: Routes = [
            {
             path: '',
             component: ExamsComponent
            },
            {
                path:'add',
                component:ActionComponent
            }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamsRoutingModule {
}
