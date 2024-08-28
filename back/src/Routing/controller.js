import { authController } from './auth/controller'

export async function mainController(app) {
  await authController(app)
}
