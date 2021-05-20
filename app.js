const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./pool.js');
const options = require('./optionsDB.js');
const chatRouter = require('./routes/chatRouter.js');
const userRouter = require('./routes/userRouter.js');
const morgan = require('morgan'); // console.log query info
const errorHandler = require('./common/middleware/errorHandler.js');
const NotFound = require('./common/errors/notFound.js');
const authDTO = require('./common/DTOs/authDTO.js');
const validator = require('express-joi-validation').createValidator({});
const authMiddleWare = require('./common/middleware/authMiddleWare.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const PORT = process.env.PORT;
const HOST = process.env.HOST;



app.use(morgan('dev'));
app.use('/chat', chatRouter);
app.use('/auth', validator.headers(authDTO), authMiddleWare, userRouter);

//app.use('/user', orderRouter);
// app.use('/admin', adminRouter);
app.use((req, res) => {
    throw new NotFound('Not found')
});
app.use(errorHandler);

pool.connect(options)
    .then(()=> {
        app.listen(PORT, ()=>{
            console.log(`Server has started on http://${HOST}:${PORT}...`)
        })
    })
    .catch(er => {
        console.log(er);
    })
