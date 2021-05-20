const express = require('express');
const cors = require('cors');
require('dotenv').config();
//const db = require('./db/dbSequelize.js');
//const pool = require('./db/pool.js');
//const options = require('./db/optionsDB.js');
const morgan = require('morgan'); // console.log query info
const errorHandler = require('./common/middleware/errorHandler.js');
const NotFound = require('./common/errors/notFound.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const PORT = process.env.PORT;

db.authenticate()
    .then(() => {console.log('DB connected...')})
    .catch(er => console.log('Error: ', er));

app.use(morgan('dev'));
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);
app.use((req, res) => {
    throw new NotFound('Not found')
});
app.use(errorHandler);

pool.connect(options)
    .then(()=> {
        app.listen(PORT, ()=>{
            console.log(`Server has started on port ${PORT}...`)
        })
    })
    .catch(er => {
        console.log(er);
    })
