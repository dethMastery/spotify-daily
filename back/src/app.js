import express from 'express'
import * as dot from 'dotenv'
import ezServe from 'ez-serve'

import { Routes } from './Routes'
import { Middleware } from './Middleware'

const app = express()
dot.config()

const PORT = process.env.PORT

Middleware(app, express)
Routes(app)
ezServe(app, PORT)
