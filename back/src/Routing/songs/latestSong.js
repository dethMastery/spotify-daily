import { pCLI } from '../../functions/db/client'

export async function latestSong(app) {
  app.get('/api/songs/latest', async (req, res) => {
    const data = await pCLI.songs_data.findFirst({
      orderBy: {
        dateAdd: 'desc',
      },
    })

    res.send({
      status: 1,
      message: 'u got it bro!',
      payload: data,
    })
  })
}
