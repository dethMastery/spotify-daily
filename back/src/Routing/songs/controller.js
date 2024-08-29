import { addNewSong } from './addSongs'

export async function songController(app) {
  await addNewSong(app)
}
