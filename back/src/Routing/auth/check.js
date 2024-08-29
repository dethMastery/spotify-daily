import { pCLI } from '../../functions/db/client'
import { pDis, catchEvent } from '../../functions/db/apis/errorCatch'

export async function authCheck(app) {
  app.get('/api/auth/check', async (req, res) => {
    let header = req.headers

    if (header.authorization != undefined) {
      const search = await pCLI.auth_key.findFirst({
        where: {
          authKey: header.authorization.replace('Bearer ', ''),
        },
      })

      if (search != null) {
        res.json({
          status: 1,
          message: 'hello from server :3',
        })
      } else {
        res.json({
          status: 0,
          message: 'key not auth',
        })
      }
    } else {
      res.json({
        status: 0,
        message: 'blank header',
      })
    }
  })
}
