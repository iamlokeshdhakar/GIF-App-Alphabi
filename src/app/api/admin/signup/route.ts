import { connectMongoDB } from '@/utils/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import Admin from '@/modal/adminSchema'

export async function POST(req: Request) {
  try {
    await connectMongoDB()

    const { email, password } = await req.json()

    const exitUser = await Admin.findOne({ email })

    if (exitUser) {
      return NextResponse.json({ message: 'Admin already exist' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await Admin.create({ email, password: hashedPassword })

    const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    return NextResponse.json({
      message: 'Admin created successfully',
      jsonToken: token,
      admin: user,
    })
  } catch (error: any) {
    console.log(error.message)
    return Response.json({
      message: 'Something went wrong',
      error: error.message,
    })
  }
}
