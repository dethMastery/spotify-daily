import { pCLI } from '../client'

export async function pDis() {
  await pCLI.$disconnect()
}

export async function catchEvent(e) {
  console.error(e)
  await pCLI.$disconnect()
}
