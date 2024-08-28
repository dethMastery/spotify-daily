import { authCallback } from './callback'
import { authCheck } from './check'
import { authLogin } from './login'

export async function authController(app) {
  await authLogin(app)
  await authCallback(app)
  await authCheck(app)
}
