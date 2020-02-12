import { NgModule } from '@angular/core';
import { TitlePipe } from './title.pipe';
import { SafePipe } from './safe.pipe';



@NgModule({
  declarations: [TitlePipe, SafePipe],
  exports: [TitlePipe, SafePipe]
})
export class PipesModule { }
