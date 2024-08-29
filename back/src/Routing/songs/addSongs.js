import { checkAuth } from '../../functions/db/apis/auth'
import { catchEvent, pDis } from '../../functions/db/apis/errorCatch'
import { pCLI } from '../../functions/db/client'

export async function addNewSong(app) {
  app.post('/api/songs/new', (req, res) => {
    const body = req.body
    const auth = req.headers.authorization.replace('Bearer ', '')

    const check = checkAuth(auth)

    if (check.status != 0) {
      console.log(body)

      const payload = pCLI.songs_data.create({
        data: body,
      })

      payload.then(() => pDis()).catch((e) => catchEvent(e))

      res.send({
        status: 1,
        message: 'song update!',
      })
    } else {
      res.json(check)
    }
  })
}
