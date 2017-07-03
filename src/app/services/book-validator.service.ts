export class BookValidatorService {
  
  removeNoneEngChars(input: string): string {
    return input.replace(/[^a-zA-Z ]/g, "");
  }

  isEnglishCharsOnly(input: string): boolean {
    if (/[^a-zA-Z ]/g.test(input)) {
      return true
    }
    return false;
  }

  removeSpacesChars(input: string): string {
    return input.replace(/ +/g, ' ').replace(/^\s+|\s+$/g,'');
  }

  getTitleCase(input): string {
    return input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));    
  }

  isValidDate(date): boolean {
      var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
      if (matches == null) return false;
      var d = parseInt(matches[2]);
      var m = parseInt(matches[1])-1;
      var y = parseInt(matches[3]);
      var composedDate = new Date(y, m, d);
      return composedDate.getDate() === d && composedDate.getMonth() === m && composedDate.getFullYear() === y;
  }

  isEqual(str1: string, str2: string): boolean {
    if (this.removeSpacesChars(str1).toLowerCase() === this.removeSpacesChars(str2).toLowerCase()) {
      return true;
    }
    return false;
  }

  getStrictString(input: string): string {
    return this.removeSpacesChars(input).toLowerCase();
  }
}
