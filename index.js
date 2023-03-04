require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');


const app = express();

// middleware
app.use(express.json())


app.use("/api/v1/auth", require('./routes/authRoute'))

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port 8000');
    });
}).catch((err) => {
    console.log(err);
})