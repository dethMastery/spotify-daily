import { pCLI } from '../../functions/db/client'

export async function songHistory(app) {
  app.get('/api/songs/history', async (req, res) => {
    const data = await pCLI.songs_data.findMany({
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
