export async function AuthDataFetch(token) {
  const site = await fetch('https://discord.com/api/v9/users/@me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  const response = await site.json()

  return response
}
