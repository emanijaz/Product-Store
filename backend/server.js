const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const errorMiddleware = require('./middleware/error')

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

// handling uncaught exception
process.on("Uncaught Exception", (err)=> {
    console.log(`Error: ${err}`)
    console.log("Uncaught exception")
    process.exit(1)
})

dotenv.config({path: "backend/config/config.env"})
const uri = `${process.env.ATLAS_URL}`;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo db connection established successfully!');


    const productRoutes = require('./routes/productRoute');
    const userRoutes = require('./routes/userRoute');

    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use(errorMiddleware);


    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});

module.exports = app; // Export the app for testing
