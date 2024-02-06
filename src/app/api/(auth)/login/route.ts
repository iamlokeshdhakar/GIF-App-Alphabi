import User from '@/modal/userSchema'
import bcrypt from 'bcrypt'
import { connectMongoDB } from '@/utils/db'
import { sign } from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    await connectMongoDB()

    const { email, password } = await req.json()

    const user = await User.findOne({ email })

    if (!user) {
      return Response.json({ message: 'User not found' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return Response.json({ message: 'Invalid credentials' })
    }

    const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    return Response.json({
      message: 'User logged in successfully',
      jsonToken: token,
      user,
    })
  } catch (error: any) {
    console.log(error.message)

    return Response.json({
      message: 'Error logging in',
      error: error.message,
    })
  }
}
