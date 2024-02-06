import DailyStats from '@/modal/dailyStatsSchema'

export async function GET() {
  const res = await DailyStats.find()
  if (!res) return Response.json({ status: 404, message: 'No stats found' })
  return Response.json(res)
}
