import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialformat'
})
export class InitialformatPipe implements PipeTransform {

  transform(value: string): string {
    if (value.trim() == '') return '?';

    const names = value.split(' ');
    let initial = ''
    for (let i = 0; i < names.length; i++){
      initial += names[i].charAt(0);
    }
    return initial;
  }

}
