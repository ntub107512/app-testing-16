import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAr } from './my-ar';

@NgModule({
  declarations: [
    MyAr,
  ],
  imports: [
    IonicPageModule.forChild(MyAr),
  ],
})
export class MyArModule {}
