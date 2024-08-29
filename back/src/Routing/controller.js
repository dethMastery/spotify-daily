import { authController } from './auth/controller'
import { songController } from './songs/controller'

export async function mainController(app) {
  await authController(app)
  await songController(app)
}
