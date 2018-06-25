import {Routes} from './routes';

export const USER_ROUTES_MOCK: Routes[] = [
  {
    _id: '5ae979ec8b12883b00001c07',
    travelDate: new Date(),
    cityFrom: 'Gdańsk',
    cityTo: 'Warszawa',
    rating: 3,
    user: [{
      _id: '5232efafaf',
      login: 'Krzysztof',
      userEmail: 'test@test.com',
      userPhone: '000-000-000'
    }],
    routeDetails: [{
      _id: '5aed6949874aa85a000083c8',

      carModel: 'Skoda',
      carMake: 'Octavia',
      carNo: 'GDA20235',
      routPrice: 150.50,
      currency: 'PLN',
      freeSpace: 3
    }]
  },
  {
    _id: '5ae979ec8b12883b00001c08',
    travelDate: new Date(),
    cityFrom: 'Gdańsk',
    cityTo: 'Olsztyn',
    rating: 2,
    user: [{
      _id: '5232efafaf',
      login: 'Krzysztof',
      userEmail: 'test@test.com',
      userPhone: '000-000-000'
    }],
    routeDetails: [{
      _id: '5aed6949874aa85a000083c8',
      carModel: 'Skoda',
      carMake: 'Octavia',
      carNo: 'GDA20235',
      routPrice: 133.00,
      currency: 'PLN',
      freeSpace: 1
    }]
  },
  {
    _id: '5ae979ec8b12883b00001c09',
    travelDate: new Date(),
    cityFrom: 'Kraków',
    cityTo: 'Wrocław',
    rating: 1,
    user: [{
      _id: '5232efafaf',
      login: 'Krzysztof',
      userEmail: 'test@test.com',
      userPhone: '000-000-000'
    }],
    routeDetails: [{
      _id: '5aed6949874aa85a000083c8',
      carModel: 'Skoda',
      carMake: 'Octavia',
      carNo: 'GDA20235',
      routPrice: 120.00,
      currency: 'PLN',
      freeSpace: 4
    }]
  }
];
