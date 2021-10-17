import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleformat1'
})
export class Roleformat1Pipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (value != undefined){
      const role = value.split('_');
      return role[1];
    }
    return '';
  }

}
