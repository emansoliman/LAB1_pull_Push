
/////long

// const express = require('express')
// const cors = require('cors')
// const app = express()
// app.use(express.json())
// app.use(cors())

// const subscribes = {};

// app.get('/massages/subscribe', (req, res) => {
//     const id = Math.ceil(Math.random() * 10000);
//     console.log(id);
//     subscribes[id] = res;
//     req.on('close', () => {
//         console.log(id, "closeeeeeed");
//         delete subscribes[id];
//     })

// });

// app.post('/massages', (req, res) => {
//     console.log(req.body);
//     Object.entries(subscribes).forEach(([id, response]) => {
//         response.json(req.body);
//         delete subscribes[id];
//     });
//     res.status(204).end();
// })


// // connect to server 
// app.listen(3000, (err) => {
//     if (err) return console.log(err);
//     console.log("server start successfully on port 3001")

// }
// )

const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const subscribers = {};
const messages = [];

app.post('/messages', (req, res) => {
    messages.push(req.body);
    res.status(204).end();
})

app.get('/messages', (req, res) => {
    console.log(+req.headers['previous-datetime']);
    if (+req.headers['previous-datetime'] === 0) {
        res.json(messages);
    } else {
        if (messages.length > 0) {
            let previousTime = +req.headers['previous-datetime']
            let newMessages = [];
            newMessages = messages.filter((message) => message.currentDateTime > (previousTime));
            res.json(newMessages);
        } else {
            res.json([]);
        }
    }
})

app.get('/messages/subscribe', (req, res) => {
    const id = Math.ceil(Math.random() * 1000);
    subscribers[id] = res;
    req.on('close', () => {
        delete subscribers[id];
    })
});

app.post('/message', (req, res) => {
    // console.log(req.body);
    Object.entries(subscribers).forEach(([id, response]) => {
        response.json(req.body);
        delete subscribers[id];
    });
    res.status(204).end();
})

// connect to server 
app.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log("server start successfully on port 3000")

}
)