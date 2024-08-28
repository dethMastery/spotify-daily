import { mainController } from './Routing/controller'

export async function Routes(app) {
  await mainController(app)
}
