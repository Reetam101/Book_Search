const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path')
const dotenv = require('dotenv');

const app = express()

dotenv.config({ 
    path: './config/config.env'
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(morgan("dev"))
app.engine('.hbs', exphbs({ 
    defaultLayout: 'main', 
    extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to ${port}`));
