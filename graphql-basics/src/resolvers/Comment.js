const Comment = {
    author(parent, args, {db}, info) {
        return db.users.find((user) => {
            return user.id === parent.author // return data of comments in Query
        }); 
    },
    post(parent, args, {db}, info) {
        return db.posts.find((post) => {
            return post.id === parent.post // // return data of comments in Query
        }); 
    }
}

export { Comment as default}