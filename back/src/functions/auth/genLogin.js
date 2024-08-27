export function LoginLink() {
  const redirect_url = `https://discord.com/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=identify+email&redirect_uri=${process.env.REDIRECT_URI}&prompt=consent`

  return redirect_url
}
