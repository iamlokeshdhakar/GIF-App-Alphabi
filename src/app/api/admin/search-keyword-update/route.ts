import DailyStats from '@/modal/dailyStatsSchema'

export async function PATCH(req: Request) {
  try {
    const res = await DailyStats.findOneAndUpdate(
      { date: new Date().toISOString().split('T')[0] },
      { $inc: { keywordSearches: 1 } },
      { upsert: true },
    )

    return Response.json({ message: 'Search count updated' })
  } catch (error) {
    console.log('Error updating search count', error)
    return Response.json({ message: 'Error updating search count' }, { status: 500 })
  }
}
