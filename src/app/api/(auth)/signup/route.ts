import User from '@/modal/userSchema'
import { connectMongoDB } from '@/utils/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import DailyStats from '@/modal/dailyStatsSchema'

export async function POST(req: Request) {
  try {
    await connectMongoDB()

    const { fullname, email, password } = await req.json()

    const exitUser = await User.findOne({ email })

    if (exitUser) {
      return NextResponse.json({ message: 'User already exist' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ fullname, email, password: hashedPassword })

    if (user) {
      const res = await DailyStats.findOneAndUpdate(
        { date: new Date() },
        { $inc: { userRegistrations: 1 } },
        { upsert: true, new: true },
      )
    }

    const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    return NextResponse.json({ message: 'User created successfully', jsonToken: token, user })
  } catch (error: any) {
    return Response.json({
      message: 'Something went wrong',
      error: error.message,
    })
  }
}
