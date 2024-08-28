import { pCLI } from '../client'

export async function createAuth(salt, expired) {
  const search = await pCLI.auth_key.findFirst({
    where: {
      authKey: salt,
    },
  })

  let create
  let returnData

  if (search == undefined) {
    create = await pCLI.auth_key.create({
      data: {
        authKey: salt,
        expiredTime: expired,
      },
    })
  }

  if (create != undefined) {
    returnData = {
      message: 'data added!',
      payload: create,
    }
  } else {
    returnData = {
      message: 'blank body',
    }
  }

  return returnData
}

export async function checkAuth(salt) {
  const search = await pCLI.auth_key.findFirst({
    where: {
      authKey: salt,
    },
  })

  if (search != undefined) {
    if (search.expiredTime <= new Date().getTime()) {
      await pCLI.auth_key.delete({
        where: {
          id: search.id,
        },
      })

      return {
        status: 0,
        message: 'key expired',
      }
    } else {
      return {
        status: 1,
        message: 'hello from the server :3',
      }
    }
  } else {
    return {
      status: 0,
      message: 'no key valid',
    }
  }
}
