//load module
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose')

//-------external calling----
const keys = require('./config/keys');

//initialize app
const app = express();

//-------rendering part------
app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));

app.set('view engine', 'handlebars')

//set public folder static
app.use(express.static('public'));

//connect to remote database
mongoose.connect(keys.MongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to Remote Database...')
}).catch((err) => {
    console.log(err);
});

//set port
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('home'); 
});//home router homepage

app.get('/about', (req, res) => {
    res.render('about')
});

//nodemon: npx nodemon js

app.listen(port, ()=>{
    console.log('Server is running on port ', port)
});