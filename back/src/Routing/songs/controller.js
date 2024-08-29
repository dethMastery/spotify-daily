import { addNewSong } from './addSongs'
import { latestSong } from './latestSong'

export async function songController(app) {
  await addNewSong(app)
  await latestSong(app)
}
