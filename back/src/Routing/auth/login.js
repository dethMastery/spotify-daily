import { LoginLink } from '../../functions/auth/genLogin'

export async function authLogin(app) {
  app.get('/api/auth/login', (req, res) => {
    res.redirect(LoginLink())
  })
}
