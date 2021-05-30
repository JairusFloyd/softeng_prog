import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverSettingsPageRoutingModule } from './popover-settings-routing.module';

import { PopoverSettingsPage } from './popover-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverSettingsPageRoutingModule
  ],
  declarations: [PopoverSettingsPage]
})
export class PopoverSettingsPageModule {}
