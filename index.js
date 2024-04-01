import express from 'express'
import {db} from './dbs/db.js'
import dotenv from 'dotenv'

const app = express()

db()

app.use(express.json());

dotenv.config();

const port = process.env.PORT

app.get('/', (req,res) => {
    res.send('Welcome to the server')
})

app.listen (port, () => console.log("Express server has started on port " + port))