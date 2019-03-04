import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDataPage } from './list-data';

@NgModule({
  declarations: [
    ListDataPage,
  ],
  imports: [
    IonicPageModule.forChild(ListDataPage),
  ],
})
export class ListDataPageModule {}
