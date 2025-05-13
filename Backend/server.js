const express = require('express')
const app = express();
const cors = require('cors');

const db = require('./db');



const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req,res) {
    res.send('Server Started')
})

//Person Router
const personRouter = require('./routers/personRouter');
app.use('/person',personRouter)

app.listen(3000, () => {
    console.log('Server started on port 3000');
});