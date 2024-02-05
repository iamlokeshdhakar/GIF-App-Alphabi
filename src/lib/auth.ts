import { verify } from 'jsonwebtoken'

export function auth(req: any) {
  const { token } = req.cookies

  if (!token) {
    return null
  }

  try {
    const user = verify(token, process.env.JWT_SECRET!)
    return user
  } catch (error) {
    return null
  }
}
