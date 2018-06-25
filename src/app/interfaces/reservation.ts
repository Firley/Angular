import {Routes} from './routes';
import {User} from './user';

export interface Reservation {
  _id: string;
  route: Routes[];
  user: User[];
}
