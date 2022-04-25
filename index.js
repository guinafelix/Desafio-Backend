const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//user route
const userRouter = require('./routes/userRouter');
app.use('/api/user', userRouter);

//service order route
const serviceOrderRouter = require('./routes/serviceOrderRouter');
app.use('/api/service-order', serviceOrderRouter);

// open route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome'});
});


mongoose.connect(process.env.MONGODB_URL)
.then(() => {
        app.listen(3000, () => {
        console.log('Connected to MongoDB.')
    })
})
.catch((err) => console.log(err));

