import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EmployeeComponent } from './employee.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [

  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        children: [
          {
            path: 'add',
            component: FormComponent
          },
          {
            path: 'update/:id/:index',
            component: FormComponent
          }
        ]
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
