import {RouteDetails} from './route-details';
import {User} from './user';

export interface Routes {
  _id: string;
  travelDate: Date;
  cityFrom: string;
  cityTo: string;
  rating: number;
  routeDetails: RouteDetails[];
  user: User[];
}
