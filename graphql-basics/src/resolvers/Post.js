const Post =  {
    author(parent, args, {db}, info) {
        return db.users.find((user) => {
            return user.id === parent.author // return data of posts in Query
        });
    },
    comments(parent, args, {db}, info) {
        return db.comments.filter((comment) => {
            return comment.post === parent.id // return data of users in Query
        })
    }
}

export { Post as default}