import {User} from './user';

export interface RouteDetails {
  _id: string;
  carModel: string;
  carMake: string;
  carNo: string;
  routPrice: number;
  currency: string
  dirN?: string | '';
  dirE?: string | '';
  freeSpace: number;
}
