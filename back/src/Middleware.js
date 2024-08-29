import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'

export function Middleware(app, exp) {
  const sessionConfig = {
    secret: 'dethzCONFIGunLimitedServices',
    resave: false,
    saveUninitialized: true,
    maxAge: 3600,
  }

  const corsConfig = {
    origin: `${process.env.FE_URL}`,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors(corsConfig))

  app.use(session(sessionConfig))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
}
