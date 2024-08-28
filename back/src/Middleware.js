import session from 'express-session'
import bodyParser from 'body-parser'

export function Middleware(app, exp) {
  const sessionConfig = {
    secret: 'xinAMQSetup',
    resave: false,
    saveUninitialized: true,
    maxAge: 3600,
  }

  app.use(session(sessionConfig))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
}
