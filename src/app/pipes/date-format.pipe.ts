import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  override transform(value: any, ...args: any[]): any {
    const datePl = super.transform(value, 'medium');

    if(datePl !== null) {
      const dateTab = datePl.split(' ');
      let datePlForm = '';
      switch (dateTab[0]) {
        case 'Jan': dateTab[0] = '01'; break;
        case 'Feb': dateTab[0] = '02'; break;
        case 'Mar': dateTab[0] = '03'; break;
        case 'Apr': dateTab[0] = '04'; break;
        case 'May': dateTab[0] = '05'; break;
        case 'Jun': dateTab[0] = '06'; break;
        case 'Jul': dateTab[0] = '07'; break;
        case 'Aug': dateTab[0] = '08'; break;
        case 'Sep': dateTab[0] = '09'; break;
        case 'Oct': dateTab[0] = '10'; break;
        case 'Nov': dateTab[0] = '11'; break;
        case 'Dec': dateTab[0] = '12'; break;
      }
      if(parseInt(dateTab[1]) < 10) {
        datePlForm = '0' + dateTab[1] + '.' + dateTab[0] + '.' + dateTab[2];
      } else {
        datePlForm = dateTab[1] + '.' + dateTab[0] + '.' + dateTab[2];
      }
      datePlForm = datePlForm.replace(/,/g, '');
      let time = dateTab[3].split(":");
      let ampm = dateTab[4];
      if(ampm === 'PM') {
        if(time[0] === '12') datePlForm += ', 12:' + time[1];
        else datePlForm += ', ' + (parseInt(time[0]) + 12) + ':' + time[1];
      } else {
        if(time[0] === '12') datePlForm += ', 00:' + time[1];
        else if(parseInt(time[0]) < 10) datePlForm += ', 0' + time[0] + ':' + time[1];
        else datePlForm += ', ' + time[0] + ':' + time[1];
      }
      return datePlForm;
    }
  }
}