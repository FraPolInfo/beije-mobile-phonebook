import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobilepipe'
})
export class MobilePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    if(!value || value.length < 10) return value;

    const mobileNumber = value.slice(value.length-10)

    const prefix = value.slice(0, value.length-10)

    const numberFormatted = []

    for( var i = 0; i < mobileNumber.length; i++) {
        if((i+1) % 3 === 0) {
            numberFormatted.push(mobileNumber[i] + ' ')
        } else numberFormatted.push(mobileNumber[i])
    }

    return '+' + prefix + ' ' + numberFormatted.join('')
  }

}