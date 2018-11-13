const Query = {
    users(parent, args, {prisma}, info){
        return prisma.query.users(null,info)

        // if(!args.query) {
        //     return db.users
        // }

        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // });
    },
    posts(parent, args, {prisma}, info){
        return prisma.query.posts(null,info)

        // if(!args.query) {
        //     return db.posts
        // }

        // return db.posts.filter((post) => {
        //     return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
        // });
    },
    comments(parent, args, {prisma}, info){
        return prisma.query.comments(null,info)

        // return db.comments
    }
}

export {Query as default};