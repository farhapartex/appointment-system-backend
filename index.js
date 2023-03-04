require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const { authTokenMiddleware } = require('./middlewares/auth');


const app = express();

// middleware
app.use(express.json())


app.use("/api/v1/auth", require('./routes/authRoute'))
app.use("/api/v1/appointment", authTokenMiddleware, require('./routes/appointmentRoute'))

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port 8000');
    });
}).catch((err) => {
    console.log(err);
})