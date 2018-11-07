const Query = {
    users(parent, args, {db}, info){
        if(!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
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
    posts(parent, args, {db}, info){
        if(!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
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
}

export {Query as default};