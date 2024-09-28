import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://treasures-of-poland.up.railway.app/graphql',
    cache: new InMemoryCache()
});

export { client };