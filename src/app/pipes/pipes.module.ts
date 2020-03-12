import { NgModule } from '@angular/core';
import { TitlePipe } from './title.pipe';
import { SafePipe } from './safe.pipe';
import { ReversePipe } from './reverse.pipe';



@NgModule({
  declarations: [TitlePipe, SafePipe, ReversePipe],
  exports: [TitlePipe, SafePipe, ReversePipe]
})
export class PipesModule { }
