const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image');


const db = knex({
  
  client: 'pg',
  connection: {
    host : 'dpg-cf7qnmarrk0e2aqtbqig-a',
    user : 'fase_recognition_user',
    password : 'XcBhDlNOKg2wkwDoaQ3HLPTYhQ6VxRDH',
    database : 'fase_recognition_database'
  }
});


const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})
