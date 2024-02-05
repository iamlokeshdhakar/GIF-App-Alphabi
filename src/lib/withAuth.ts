import { Router } from 'next/router'
import { auth } from './auth'
import { redirect } from 'next/navigation'
export function withAuth(handler: any) {
  return async (req: any, res: any) => {
    const user = auth(req)
    if (!user) {
      redirect('/login')
    }

    req.user = user

    return handler(req, res)
  }
}
