export async function POST() {
  return Response.json(
    {
      success: false,
      message: "Self-drive estimate is not available yet.",
    },
    { status: 501 }
  )
}