import uuid from 'uuid/v4';


const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.find((user) => {
            return user.email === args.data.email
        });
        if(emailTaken) {
            throw new Error('Email is taken.')
        }
        const user = {
            id: uuid(),
            ...args.data
        }
        db.users.push(user);
        return user;
    },

    deleteUser(parent, args, {db}, info) {
        const userIndex = db.users.findIndex((user) => {
            return user.id === args.id
        });

        if(userIndex < 0) throw new Error('User not found');

        const deletedUsers = db.users.splice(userIndex, 1);

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id;

            if(match) {
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match
        });

        db.comments = db.comments.filter((comment) => comment.author !== args.id);

        return deletedUsers[0];
    },

    createPost(parent, args, {db}, info){
        const userExists = db.users.find((user) => user.id === args.data.author)

        if(!userExists){
            throw new Error('user not found');
        }

        const post = {
            id: uuid(),
            ...args.data
        }

        db.posts.push(post)
        return post;
    },

    deletePost(parent, args, {db}, info) {
        const postIndex = db.posts.findIndex(post => post.id === args.id);

        if(postIndex < 0) throw new Error('Post not found');

        const deletedPosts = db.posts.splice(postIndex, 1);

        db.comments = db.comments.filter((comment) => comment.post !== args.id);

        return deletedPosts[0];
    },

    createComment(parent, args, {db}, info){
        const userAndPostExist = db.users.find((user) => user.id === args.data.author) && db.posts.find((post) => post.id === args.data.post);

        if(!userAndPostExist){
            throw new Error('post or user not found');
        }

        const comment = {
            id: uuid(),
            ...args.data
        }

        db.comments.push(comment)
        return comment;
    },

    deleteComment(parent, args, {db}, info){
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

        if(commentIndex < 0) throw new Error('comment not found');

        const deletedComments = db.comments.splice(commentIndex, 1);

        return deletedComments[0];
    }
}

export {Mutation as default}; 