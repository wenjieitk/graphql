const User = {
    posts(parent, args, {db}, info) {
        return db.posts.filter((post) => {
            return post.author === parent.id // return data of users in Query
        })
    },
    comments(parent, args, {db}, info) {
        return db.comments.filter((comment) => {
            return comment.author === parent.id // return data of users in Query
        })
    }
}

export {User as default}