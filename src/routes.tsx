import { lazy } from 'react';
const Auth = lazy(() => import('pages/Auth'));
const BikeList = lazy(() => import('pages/Bikes/BikeList'));
const BikeDetails = lazy(() => import('pages/Bikes/BikeDetails'));

interface routeObject {
  url: string;
  component: React.FC<any>;
  exact?: boolean;
}

export const publicRoutes: routeObject[] = [
  {
    url: '/',
    component: Auth,
    exact: true
  },
];

export const privateRoutes: routeObject[] = [
  {
    url: '/bikes',
    component: BikeList,
    exact: true
  },
  {
    url: '/bikes/:bikeId',
    component: BikeDetails,
    exact: false
  },
];
