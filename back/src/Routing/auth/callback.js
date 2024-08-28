import axios from 'axios'

import { AuthDataFetch } from '../../functions/auth/fetchData'
import { Salting } from '../../functions/auth/authRandomSalt'
import { createAuth } from '../../functions/db/apis/auth'
import { catchEvent, pDis } from '../../functions/db/apis/errorCatch'

export async function authCallback(app) {
  app.get('/api/auth/callback', async (req, res) => {
    const authCode = req.query.code

    if (
      typeof authCode === 'string' &&
      typeof process.env.CLIENT_ID === 'string' &&
      typeof process.env.CLIENT_SECRET === 'string' &&
      typeof process.env.REDIRECT_URI === 'string'
    ) {
      const resp = await axios
        .post(
          'https://discord.com/api/oauth2/token',
          new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: process.env.REDIRECT_URI,
            code: authCode,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .catch((e) => {
          console.log(e)
          res.redirect(`${process.env.FE_URL}`)
        })

      if (resp.data != undefined) {
        let session =
          typeof resp.data.access_token === 'string'
            ? resp.data.access_token
            : ''
        let sessionData = await AuthDataFetch(session)

        if (sessionData.id == process.env.OWNER_ID) {
          let finalSalt = Salting(sessionData.id)
          let expired = new Date().getTime() + 3600000

          await createAuth(finalSalt, expired)
            .then(async () => await pDis())
            .catch(async (e) => await catchEvent(e))

          res.redirect(
            `${process.env.FE_URL}/auth/callback?salt=${finalSalt}&expired=${expired}`
          )
        } else {
          res.json({
            status: 0,
            message: 'who are you then?',
          })
        }
      } else {
        res.redirect(`${process.env.FE_URL}`)
      }
    } else {
      res.send('blank body')
    }
  })
}
