import { addNewSong } from './addSongs'
import { latestSong } from './latestSong'
import { songHistory } from './listHistory'

export async function songController(app) {
  await addNewSong(app)
  await latestSong(app)
  await songHistory(app)
}
