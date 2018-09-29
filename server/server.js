const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
axios = require('axios');
massive = require('massive');
require('dotenv').config();


const { SERVER_PORT, CONNECTION } = process.env;

app.use( express.static( `${__dirname}/../build` ) );
//top level middleware
// app.use((req, res, next) => {
//     let{ user_id}=req.query;
//     if (user_id) {
//         next();
//     } else {
//         res.status(403).send('you are not a teacher');
//     }
// });
app.use(bodyParser.json())


app.post('/api/userpost', (req, res) => {
    const dbSet = req.app.get('db');
         
        dbSet.post_user([req.body.user_role, req.body.user_names])
            .then((response) => res.status(200).send( response))
            .catch(err => {
                res.status(500).send({ errorMessage: 'Oops, an error occured' })
                console.log(err);
            })
    })
    app.put('/api/userput', (req, res) => {
        const dbSet = req.app.get('db');
            dbSet.edit_user([req.query.user_id, req.body.user_role, req.body.user_names])
                .then((response) => res.status(200).send(response))
                .catch(err => {
                    res.status(500).send({ errorMessage: 'Oops, an error in update occured' })
                    console.log(err);
                })
        })

        // app.put('/api/userput', (req, res, next) => {
        //     let {user_id}=req.query;
        //     console.log('this is an id', user_id)
        //     res.status(200).send('proceed to edit')
        //     next()
        // },
        //      (req, res) =>{
            
        //     const dbSet = req.app.get('db');
        //         dbSet.edit_user([req.query.user_id, req.body.user_role, req.body.user_names])
        //             .then((response) => res.status(200).send(response))
        //             .catch(err => {
        //                 res.status(500).send({ errorMessage: 'Oops, an error in update occured' })
        //                 console.log(err);
        //             })
        //     })
    app.delete('/api/userdelete', (req, res) => {
        const dbSet = req.app.get('db');
            dbSet.delete_user(req.query.user_id)
                .then((response) => res.status(200).send(response))
                .catch(err => {
                    res.status(500).send({ errorMessage: 'Oops, an error in delete occured' })
                    console.log(err);
                })
        })
        app.get('/api/user/:id', async (req, res) => {
            const dbSet = req.app.get('db')
            let {id} = req.params;
            let user = await dbSet.get_user(id).catch(err => {
                res.status(500).send({ errorMessage: 'Oops, an error occured' })
                console.log(err);
            })
         
            res.status(200).send(user)
         })
        app.get('/api/users', async (req, res) => {
            const dbSet = req.app.get('db')         
            let user = await dbSet.get_users().catch(err => {
                res.status(500).send({ errorMessage: 'Oops, an error occured' })
                console.log(err);
            })
         
            res.status(200).send(user)
         })
         











massive(CONNECTION).then(dbSet => {
    app.set('db', dbSet)
})

app.listen(SERVER_PORT, () => {
    console.log(`listening on port: ${SERVER_PORT}`);

})
