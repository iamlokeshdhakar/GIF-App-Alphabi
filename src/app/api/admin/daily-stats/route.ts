import DailyStats from '@/modal/dailyStatsSchema'
import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    await connectMongoDB()

    if (startDate && endDate) {
      const res = await DailyStats.find({ date: { $gte: startDate, $lte: endDate } }).sort({
        date: 1,
      })
      if (res.length === 0) {
        return Response.json({ status: 404, message: 'No data found' })
      }
      return Response.json(res)
    } else {
      const res = await DailyStats.aggregate([{ $sort: { date: -1 } }, { $limit: 5 }])
      if (res.length === 0) {
        return Response.json({ status: 404, message: 'No data found' })
      }
      return Response.json(res)
    }
  } catch (error) {
    return Response.json({ status: 500, message: 'Internal Server Error' })
  }
}
