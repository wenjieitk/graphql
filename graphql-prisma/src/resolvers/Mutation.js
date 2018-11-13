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

    updateUser(parent, {id, data}, {db}, info) {
        const user = db.users.find((user) => user.id === id);

        if(!user) throw new Error('User not found')

        if(typeof data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === data.email);

            if(emailTaken) throw new Error('email taken')

            user.email = data.email;
        }

        if(typeof data.name === 'string') {
            user.name = data.name
        }

        if(typeof data.age !== 'undefined') {
            user.age = data.age
        }

        return user;
    },

    createPost(parent, args, {db, pubsub}, info){
        const userExists = db.users.find((user) => user.id === args.data.author)

        if(!userExists){
            throw new Error('user not found');
        }

        const post = {
            id: uuid(),
            ...args.data
        }

        db.posts.push(post);

        if(args.data.published) {
            pubsub.publish(`post`, {
                post: {
                    mutation: `CREATED`,
                    data: post
                }
            })
        }

        return post;
    },

    updatePost(parent, {id, data}, {db, pubsub}, info){
        const post = db.posts.find( post => post.id === id);
        const originalPost = {...post};

        if(!post) throw new Error('Post not found')

        if(typeof data.title === 'string') {
            const titleTaken = db.posts.find((post) => post.title === data.title);

            if(titleTaken) throw new Error('title taken')

            post.title = data.title;
        }

        if(typeof data.body === 'string') {
            post.body = data.body
        }

        if(typeof data.published === 'boolean') {
            post.published = data.published;

            if(originalPost.published && !post.published){
                pubsub.publish('post', {
                    post: {
                        mutation: `DELETED`,
                        data: originalPost
                    }
                })

            }else if(!originalPost.published && post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            }
        } else if(post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }

        return post;
    },

    deletePost(parent, args, {db, pubsub}, info) {
        const postIndex = db.posts.findIndex(post => post.id === args.id);

        if(postIndex < 0) throw new Error('Post not found');

        const [post] = db.posts.splice(postIndex, 1);

        db.comments = db.comments.filter((comment) => comment.post !== args.id);

        if(post.published) {
            pubsub.publish('post', {
                post: {
                    mutation:`Deleted`,
                    data: post
                }
            })
        }

        return post;
    },

    createComment(parent, args, {db, pubsub}, info){
        const userAndPostExist = db.users.find((user) => user.id === args.data.author) && db.posts.find((post) => post.id === args.data.post);

        if(!userAndPostExist){
            throw new Error('post or user not found');
        }

        const comment = {
            id: uuid(),
            ...args.data
        }

        db.comments.push(comment);

        pubsub.publish(`comment ${args.data.post}`,{
            comment: {
                mutation: `CREATED`,
                data: comment
            }
        })

        return comment;
    },

    deleteComment(parent, args, {db, pubsub}, info){
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

        if(commentIndex < 0) throw new Error('comment not found');

        const [deletedComment] = db.comments.splice(commentIndex, 1);

        pubsub.publish(`comment ${deletedComment.post}`,{
            comment: {
                mutation: `DELETED`,
                data: deletedComment
            }
        })

        return deletedComment;
    },

    updateComment(parent, {id, data}, {db,pubsub}, info){
        const comment = db.comments.find( comment => comment.id === id)

        if(!comment) throw new Error('Comment not found')

        if(typeof data.text === 'string') {
            comment.text = data.text
        }

        pubsub.publish(`comment ${comment.post}`,{
            comment: {
                mutation: `UPDATED`,
                data: comment
            }
        })

        return comment;
    },
}

export {Mutation as default}; 