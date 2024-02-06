export async function POST() {
  return Response.json({
    status: 200,
    body: {
      message: 'Logout successful',
    },
  })
}
