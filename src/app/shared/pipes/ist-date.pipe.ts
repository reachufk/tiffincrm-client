import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'istDate',
})
export class IstDatePipe implements PipeTransform {

  constructor(private datePipe:DatePipe){}
  transform(value: any): any {
    return this.datePipe.transform(value, 'yyyy-MM-dd,HH:mm:ss', 'IST');
  }

}
