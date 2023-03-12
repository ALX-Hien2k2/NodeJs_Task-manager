const express = require('express')
const dotenv = require('dotenv');
const cors = require("cors");

const connectToDatabase = require('./config/database');
const tasks = require('./routes/tasksRoute')

const app = express()

// Setup
dotenv.config();
const PORT = process.env.SERVER_PORT
const notFound = require('./middlewares/not-found')

// middlewares
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"))
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)


// Connect to database
connectToDatabase()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`Server started onn port ${PORT}`)
        );
    });