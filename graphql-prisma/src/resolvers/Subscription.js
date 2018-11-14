const Subscription = {
    // count: {
    //     subscribe(parent, args, {pubsub}, info) {
    //         setTimeout(() => {
    //             pubsub.publish('count', {count:1})
    //         }, 1);

    //         return pubsub.asyncIterator('count')
    //     }
    // },

    comment: {
        subscribe(parent, { postId }, {prisma}, info) {
            // return prisma.subscription.comment(null, info);
            return prisma.subscription.comment({
                where:{
                    node:{
                        post:{
                            id:postId
                        }
                    }
                }
            }, info);
        }
    },

    post: {
        subscribe(parent, { published }, {prisma}, info) {
            // return prisma.subscription.post(null, info);
            return prisma.subscription.post({
                where:{
                    node:{
                        published:true
                    }
                }
            }, info);
        }
    }
}

export {Subscription as default}