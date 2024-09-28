import { gql, useQuery } from '@apollo/client';

const GET_ROUTES = gql`
  query Routes {
  routes {
    id
    title
    description
    icon
    distance
    difficulty
    lat
    lng
  }
}
`;


export {GET_ROUTES}