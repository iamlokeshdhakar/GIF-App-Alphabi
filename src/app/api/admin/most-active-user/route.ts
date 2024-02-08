import User from '@/modal/userSchema'

export async function GET() {
  const topUsers = await User.aggregate([
    {
      $project: {
        fullname: 1,
        searchCount: 1,
        likeCount: 1,
      },
    },
    {
      $sort: {
        searchCount: -1,
        likeCount: -1,
      },
    },
    {
      $limit: 5,
    },
  ]).exec()

  return Response.json(topUsers)
}
