import uuid from 'uuid/v4';


const Mutation = {

    async createUser(parent, args, {prisma}, info) {
        const emailTaken = await prisma.exists.User({
            email: args.data.email
        })

        if(emailTaken) throw new Error('Email Taken')

        return prisma.mutation.createUser({
            data: args.data
        },info)
    },

    async deleteUser(parent, args, {prisma}, info) {
        const userExists = await prisma.exists.User({
            id: args.id
        }) 

        if(!userExists) throw new Error('user not found')

        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },

    updateUser(parent, args, {prisma}, info) {
        return prisma.mutation.updateUser({
            where: {
                id:args.id
            },
            data: args.data
        },info)
    },

    async createPost(parent, args, {prisma}, info){
        return prisma.mutation.createPost({
            data: {
                title:args.data.title,
                body:args.data.body,
                published:args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        },info)
    },

    async updatePost(parent, args, {prisma}, info){
        return prisma.mutation.updatePost({
            where: {
                id:args.id
            },
            data: args.data
        },info)
    },

    async deletePost(parent, args, {prisma}, info) {
        const postExists = await prisma.exists.Post({
            id: args.id
        }) 

        if(!postExists) throw new Error('Post not found')

        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },

    async createComment(parent, args, {prisma}, info){
        return prisma.mutation.createComment({
            data: {
                text:args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        },info)
    },

    async deleteComment(parent, args, {prisma}, info){
        const commentExists = await prisma.exists.Comment({
            id: args.id
        }) 

        if(!commentExists) throw new Error('Comment not found')

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },

    updateComment(parent, args, {prisma}, info){
        return prisma.mutation.updateComment({
            where: {
                id:args.id
            },
            data: args.data
        },info)
    }
}

export {Mutation as default}; 