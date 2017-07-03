import { Pipe, PipeTransform }  from '@angular/core';

@Pipe({
  name: 'prependLabel'
})
export class PrependLabelPipe implements PipeTransform {
  transform(input: string, prepend: string): string {
    if(!input) {
      return '';
    }
    else {
      return prepend + input;
    }    
  }
}