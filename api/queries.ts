import {gql, useQuery} from '@apollo/client';

const GET_ROUTES = gql`
  query Routes {
  routes {
    id
    hero {
      name
      description
      picture
    }
    title
    description
    distance
    difficulty
    facilities
    lat
    lng
    points {
      title
      description
      lat
      lng
    }
  }
}
`;

const GET_ROUTES_BY_ID = (id: string) => {
    return gql`
  query Routes {
  route(input: { id: "${id}" }) {
        title
        description
        distance
        difficulty
        points {
            title
            description
            lat
            lng
        }
    }
}
`;
}


export {GET_ROUTES, GET_ROUTES_BY_ID}