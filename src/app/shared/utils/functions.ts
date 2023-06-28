import * as moment from 'moment';
export function formatedDate(date: any) {
  return moment(date).format('LL');
}
