import { pCLI } from '../../functions/db/client'

export async function songHistory(app) {
  app.get('/api/songs/history', async (req, res) => {
    const data = await pCLI.songs_data.findMany({
      orderBy: {
        dateAdd: 'desc',
      },
    })

    let returnData = []

    if (returnData.length < data.length) {
      for (let i = 0; i < 5; i++) {
        returnData.push(data)
      }
    } else {
      returnData = data
    }

    res.send({
      status: 1,
      message: 'u got it bro!',
      payload: returnData,
    })
  })
}
