const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,title
        }
    });

    res.status(201).send({id, title});
});

app.post('/events', (req, res) => {
    console.log('received event from event bus', req.body.type);
    // const event = req.body;
    // if(event.type === 'PostCreated') {
    //     const {id, title} = event.postContent;
    //     posts[id] = {
    //         id, title
    //     };
    //     res.send(event.type);
    // };
    res.send({});
})

app.listen(4000, () => {
    console.log('v555');
    console.log('Listening on 4000');
});