import { gql } from '@apollo/client';

export const GET_VEHICLES_QUERY = gql`
  query {
    vehicles {
      is_reserved
      is_disabled
      bike_id
      lat
      lon
      vehicle_type
    }
  }
`;

export const GET_A_VEHICLE_QUERY = gql`
  query getAVehicle($id: String!) {
    vehicle(id: $id) {
      is_reserved
      is_disabled
      bike_id
      lat
      lon
      vehicle_type
    }
  }
`;

export const SEARCH_VEHICLES = gql`
  query searchVehicles($id: String!) {
    searchVehicles(id: $id) {
      is_reserved
      is_disabled
      bike_id
      lat
      lon
      vehicle_type
    }
  }
`;
