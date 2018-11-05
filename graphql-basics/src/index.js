import {GraphQLServer} from 'graphql-yoga';

//type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
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
        greeting(parent, args, ctx, info) {
            return `Hello ${args.name}, you are ${args.position}!`
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0
            }

            return args.numbers.reduce((total, num) => {
                if(num)
                    return total+num
                else
                    return total
            },0)
        },
        grades(parent, args, ctx, info) {
            return [99,80,93]
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