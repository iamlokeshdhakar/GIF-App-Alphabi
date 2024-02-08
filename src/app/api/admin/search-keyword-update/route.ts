import DailyStats from '@/modal/dailyStatsSchema'
import User from '@/modal/userSchema'

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    const res = await DailyStats.findOneAndUpdate(
      { date: new Date().toISOString().split('T')[0] },
      { $inc: { keywordSearches: 1 } },
      { upsert: true },
    )

    await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { searchCount: 1 } },
      { upsert: false, new: false },
    )

    return Response.json({ message: 'Search count updated' })
  } catch (error) {
    console.log('Error updating search count', error)
    return Response.json({ message: 'Error updating search count' }, { status: 500 })
  }
}
