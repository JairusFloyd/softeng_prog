import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustsignupPage } from './custsignup.page';

const routes: Routes = [
  {
    path: '',
    component: CustsignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustsignupPageRoutingModule {}
