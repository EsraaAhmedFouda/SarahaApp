import express from 'express'
import path from 'node:path'
import bootstrap from './src/app.controller.js'
import dotenv from 'dotenv';

dotenv.config({path:path.join("./src/config/.env.dev")});

const app = express()
const port = process.env.PORT
bootstrap(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))