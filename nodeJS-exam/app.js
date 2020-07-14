require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const adRoutes = require('./routes/ad.route')
const userRoutes = require('./routes/user.route')

const express = require('express');
const app = express();


app.use(express.json());

app.use(adRoutes);
app.use(userRoutes);

app.use((req, res) => {
    const error = new Error('Route not exist');
    res.status(404);
    res.send('404: Not Found');
});


app.listen(4400, () => console.log('server started!'));