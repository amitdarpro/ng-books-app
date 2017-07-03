import { Pipe, PipeTransform } from '@angular/core';
import { BookValidatorService } from "app/services/book-validator.service";

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {
  constructor(private bookValidatorService: BookValidatorService) { }
  
  public transform(input:string): string {
    if (!input) {
      return '';
    }
    else {
      input = this.bookValidatorService.removeNoneEngChars(input);
      input = this.bookValidatorService.removeSpacesChars(input);
      input = this.bookValidatorService.getTitleCase(input);
      return input;            
    }
  }
}