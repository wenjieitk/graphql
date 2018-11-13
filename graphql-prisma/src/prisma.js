import {Prisma} from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query.users(null, '{id name email posts { id title}}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 1))
// })



// prisma.query.comments(null, '{id text author{id name} post{id body author{email}}}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 1))
// });



// prisma.mutation.createPost({
//     data:{
//         title: "new post 101",
//         published: true,
//         body: "this is new post 101",
//         author: {
//             connect: {
//                 id: "cjoe145cs001o0961tzf0axad"
//             }
//         }
//     }
// },'{id title body published}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 1))
//     return prisma.query.users(null, '{id name email posts { id title}}')
// }).then((data) => {
//     console.log('usersssss\n' + JSON.stringify(data, undefined, 1))
// });



// prisma.exists.Comment({
//     id:"cjoe2r0r5002k0961ggbnz7on",
//     text: "this is comment one",
//     author: {
//         id:"cjoe145cs001o0961tzf0axad"
//     }
// }).then((exists) => {
//     console.log(exists)
// })



const createPostForUser = async(authorId, data) => {
    const userExists = await prisma.exists.User({id:authorId});
    if(!userExists) throw new Error('User not found');

    const post = await prisma.mutation.createPost({
        data:{
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    },'{ author {name email posts {id title published body}}}');

    return post;
}

// createPostForUser('cjoe10xvo001d0961frr5tj8v',{
//     title: "test for async",
//     body: "see if async is work",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 1))
// }).catch((error) => {
//     console.error(error.message)
// })



// prisma.mutation.updatePost({
//     where: {
//         id: "cjof6pqrr00540961bpe8nms8"
//     },
//     data: {
//         title: "update mutation",
//         body:"how i roll",
//         published: false
//     }
// },'{id body published title}').then((data) => {
//     return prisma.query.posts(null,'{id title body published}')
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 1))
// });



const updatePostForUser = async(postId, data) => {
    const postExists = await prisma.exists.Post({id:postId});
    if(!postExists) throw new Error('Post not found');

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    },'{author {id name email posts {id title body published}}}');
    
    return post
}

// updatePostForUser("cjof6p97f005009614kmt3oax",{published: false,body:"update async", title:"updated async"}).then((user) => {
//     console.log(JSON.stringify(user, undefined, 1))
// }).catch((error) => {
//     console.error(error.message)
// });