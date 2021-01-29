import {Rate} from './rate';

export interface NbpModel {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];
}
