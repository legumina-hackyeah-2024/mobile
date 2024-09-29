import { gql, useQuery } from '@apollo/client';

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


const SUBMIT_ANSWER = gql`
  mutation Answer($routeId: String!, $pointIdx: Int!, $answerIdx: Int!) {
    answer(input: { routeId: $routeId, pointIdx: $pointIdx, answerIdx: $answerIdx }) {
      progressOfRoute(input: { routeId: $routeId }) {
        routeId
        status
        currentPointIdx
        currentPoint {
          title
          description
          lat
          lng
          question
          answers
        }
      }
    }
  }
`;

const PROFILE = gql`
  query UserMe {
    userMe {
      username
      badges {
        picture
      }
      friends {
        username
      }
    }
  }
`;

const GET_USER_ME = (routeId: string) => {
  return gql`
query UserMe {
    userMe {
        badges {
            id
            picture
        }
        progressOfRoute(input: { routeId: "${routeId}" }) {
            routeId
            status
            currentPointIdx
            currentPoint {
                title
                description
                lat
                lng
                question
                answers
            }
        }
        completedRoutes {
            routeId
            route {
                title
            }
            completedAt
        }
    }
}
`;
}

const HEROES = gql`
  query Heros {
    heros {
      id
      name
      description
      picture
      excerpt
    }
  }
`;


export { GET_ROUTES, GET_ROUTES_BY_ID, SUBMIT_ANSWER, GET_USER_ME, HEROES, PROFILE as USERNAME }