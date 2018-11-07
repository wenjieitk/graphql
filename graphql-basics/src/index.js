import {GraphQLServer} from 'graphql-yoga';
import uuid from 'uuid/v4';

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
    id: 'p1',
    title: 'title 1',
    body: 'body 1',
    published: false,
    author:'1'
},{
    id: 'p2',
    title: 'title 2',
    body: 'body 2',
    published: false,
    author:'1'
},{
    id: 'p3',
    title: 'title 3',
    body: 'body 3',
    published: true,
    author:'2'
}]

const comments = [{
    id: 'c1',
    text: 'text 1',
    author:'1',
    post:'p1'
},{
    id: 'c2',
    text: 'text 2',
    author:'2',
    post:'p2'
},{
    id: 'c3',
    text: 'text 3',
    author:'3',
    post:'p3'
},{
    id: 'c4',
    text: 'text 4',
    author:'1',
    post:'p1'
}]

// scalar types - String, Boolean, Int, Float, ID
//type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    ### API
    type Mutation {
        createUser(data: CreateUserInput): User!
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    ### input schema
    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!, 
        body: String!, 
        published: Boolean!, 
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: String!
        post: String!
    }


    ### data schema
    type User {
        id: ID!
        name: String!
        age: Int!
        email: String!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        comments(parent, args, ctx, info){
            return comments
        },
        post() {
            return {
                id:'3434',
                title: 'postt',
                body: 'bodyy',
                published: false
            }
        },
    },

    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.find((user) => {
                return user.email === args.data.email
            });
            if(emailTaken) {
                throw new Error('Email is taken.')
            }
            const user = {
                id: uuid(),
                ...args.data
            }
            users.push(user);
            return user;
        },

        createPost(parent, args, ctx, info){
            const userExists = users.find((user) => user.id === args.data.author)
            if(!userExists){
                throw new Error('user not found');
            }
            const post = {
                id: uuid(),
                ...args.data
            }
            posts.push(post)
            return post;
        },

        createComment(parent, args, ctx, info){
            const userAndPostExist = users.find((user) => user.id === args.data.author) && posts.find((post) => post.id === args.data.post);
            if(!userAndPostExist){
                throw new Error('post or user not found');
            }
            const comment = {
                id: uuid(),
                ...args.data
            }
            comments.push(comment)
            return comment;
        }
    },

    // the function to identify the author
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author // return data of posts in Query
            });
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id // return data of users in Query
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id // return data of users in Query
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id // return data of users in Query
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author // return data of comments in Query
            }); 
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post // // return data of comments in Query
            }); 
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