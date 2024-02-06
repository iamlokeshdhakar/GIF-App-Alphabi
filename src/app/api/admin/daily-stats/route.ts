import DailyStats from '@/modal/dailyStatsSchema'

export async function GET() {
  try {
    const res = await DailyStats.aggregate([{ $sort: { date: -1 } }, { $limit: 5 }])
    if (!res) return Response.json({ status: 404, message: 'No stats found' })
    return Response.json(res)
  } catch (error) {
    console.log(error)
    return Response.json({ status: 500, message: 'Internal Server Error' })
  }
}
