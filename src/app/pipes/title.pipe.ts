import { Pipe, PipeTransform } from '@angular/core';
import { Content } from '../models/content';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(contents: Content[], text: string): Content[] {
    if ( text.length === 0) { return null; }
    text = text.toLocaleLowerCase();
    return contents.filter(content => {
      return content.title.toLocaleLowerCase().includes(text);
    });
  }

}
