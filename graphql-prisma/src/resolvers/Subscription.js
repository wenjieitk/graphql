const Subscription = {
    count: {
        subscribe(parent, args, {pubsub}, info) {
            setTimeout(() => {
                pubsub.publish('count', {count:1})
            }, 1);

            return pubsub.asyncIterator('count')
        }
    },

    comment: {
        subscribe(parent, { postId }, {db, pubsub}, info) {
            const post = db.posts.find((post) => post.id === postId)

            if(!post) 
                throw new Error('post not found');

            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },

    post: {
        subscribe(parent, { postId }, {db, pubsub}, info) {
            return pubsub.asyncIterator(`post`)
        }
    }
}

export {Subscription as default}