import { FilterInterface } from '@app/shared/interfaces/FilterInterface';
import * as moment from "moment";
export class FilterFactura implements FilterInterface {
  search: string = '';
  orderBy: string = '';
  typeOrderBy: string = 'DESC';
  typeFilter: string = '';
  typeDocument: string = '';
  startDate: Date;
  endDate: Date;
  userId: string = '' ;
  lojaId: string = '' ;
  constructor() {
    var CurrentDate = new Date();
    var lastDayMonth = moment(new Date(CurrentDate.getFullYear(), CurrentDate.getMonth() + 1, 0)).format('DD');
    this.startDate = new Date(
      CurrentDate.getFullYear() + '-' + (CurrentDate.getMonth() + 1) + '-01'
    );
    this.endDate = new Date(
      CurrentDate.getFullYear() +
        '-' +
        (CurrentDate.getMonth() + 1) +
        '-' +
        lastDayMonth
    );
  }
}
