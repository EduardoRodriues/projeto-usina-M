import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contatoPipe'
})
export class ContatoPipePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');

    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return value;
  }

}
