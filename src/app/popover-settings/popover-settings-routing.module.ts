import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverSettingsPage } from './popover-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverSettingsPageRoutingModule {}
