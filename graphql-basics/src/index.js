import {GraphQLServer} from 'graphql-yoga';

//type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!,
        name: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return `this is 1st query`
        },
        name() {
            return `wen jie`
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() =>{
    console.log("server is up!")
})