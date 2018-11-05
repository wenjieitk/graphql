import {GraphQLServer} from 'graphql-yoga';

// Demo User Data
const users = [{
    id: '1',
    name: 'Jie',
    email: 'test@gmail.com',
    age: 27
},{
    id: '2',
    name: 'wen',
    email: 'test2@gmail.com',
    age: 28
},{
    id: '3',
    name: 'sing',
    email: 'test3@gmail.com',
    age: 29
}]

// scalar types - String, Boolean, Int, Float, ID
//type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        age: Int!
        email: String!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info){
            if(!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            });
        },
        me() {
            return {
                id: '123abc',
                name: 'Jie',
                email: 'test@gmail.com',
                age: 28
            }
        },
        post() {
            return {
                id: '029',
                title: 'graphql',
                body: '',
                published: false
            }
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