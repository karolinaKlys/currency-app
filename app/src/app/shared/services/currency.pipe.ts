import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'currencyDisplayPipe'})
export class CurrencyDisplayPipe implements PipeTransform {
  currencyMap = new Map([
    ['AUD', '₳'],
    ['BGN', 'лв'],
    ['BRL', 'R$'],
  ]);

  transform(code: string): string {
    // @ts-ignore
    console.log(code);
    console.log(this.currencyMap.get(code));
    const symbol = this.currencyMap.get(code);
    if (symbol) {
      return this.currencyMap.get(code)!;
    } else {
      return code;
    }
  }
}

