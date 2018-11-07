const users = [{
    id: '1',
    name: 'Jie',
    email: 'test@gmail.com',
    age: 27
},{
    id: '2',
    name: 'wen',
    email: 'test2@gmail.com',
    age: 28
},{
    id: '3',
    name: 'sing',
    email: 'test3@gmail.com',
    age: 29
}]

const posts = [{
    id: 'p1',
    title: 'title 1',
    body: 'body 1',
    published: false,
    author:'1'
},{
    id: 'p2',
    title: 'title 2',
    body: 'body 2',
    published: false,
    author:'2'
},{
    id: 'p3',
    title: 'title 3',
    body: 'body 3',
    published: true,
    author:'3'
}]

const comments = [{
    id: 'c1',
    text: 'text 1',
    author:'1',
    post:'p1'
},{
    id: 'c2',
    text: 'text 2',
    author:'2',
    post:'p2'
},{
    id: 'c3',
    text: 'text 3',
    author:'3',
    post:'p3'
},{
    id: 'c4',
    text: 'text 4',
    author:'3',
    post:'p3'
}]

const db = [
    users,
    posts,
    comments
]

export {
    db as default
}