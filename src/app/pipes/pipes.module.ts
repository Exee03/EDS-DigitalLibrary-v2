import { NgModule } from '@angular/core';
import { TitlePipe } from './title.pipe';



@NgModule({
  declarations: [TitlePipe],
  exports: [TitlePipe]
})
export class PipesModule { }
