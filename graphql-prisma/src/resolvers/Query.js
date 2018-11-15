import getUserId from "../utils/getUserId";

const Query = {
    users(parent, args, {prisma}, info){
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                },{
                    email_contains: args.query
                }]//query:"@input"
            }
        }

        return prisma.query.users(opArgs,info)
    },

    async me(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);

        return prisma.query.user({
            where: {
                id: userId
            }
        })
    },

    posts(parent, args, {prisma}, info){
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                },{
                    body_contains: args.query
                }]//query:"@input"
            }
        }

        return prisma.query.posts(opArgs,info)
    },

    async post(parent, args, {prisma, request}, info) {
        const userId = getUserId(request, false);

        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                },{
                    author: {
                        id: userId
                    }
                }]
            }
        }, info)

        if(posts.length === 0) 
            throw new Error('Post Not Found')

        return posts[0];
    },

    comments(parent, args, {prisma}, info){
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                text_contains: args.query
            }
        }
        return prisma.query.comments(opArgs,info)
    }
}

export {Query as default};