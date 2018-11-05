import {GraphQLServer} from 'graphql-yoga';

// Dummy Data
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

const posts = [{
    id: '123',
    title: 'title 1',
    body: 'body 1',
    published: false,
    author:'1'
},{
    id: '1234',
    title: 'title 2',
    body: 'body 2',
    published: false,
    author:'1'
},{
    id: '12345',
    title: 'title 3',
    body: 'body 3',
    published: true,
    author:'2'
}]

// scalar types - String, Boolean, Int, Float, ID
//type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        age: Int!
        email: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
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
        posts(parent, args, ctx, info){
            if(!args.query) {
                return posts
            }

            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            });
        },
        post() {
            return {
                id:'3434',
                title: 'postt',
                body: 'bodyy',
                published: false
            }
        }
    },
    // the function to identify the author
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author // return data of posts in Query
            });
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id // return data of users in Query
            })
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