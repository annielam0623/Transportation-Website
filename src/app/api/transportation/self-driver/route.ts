export async function POST() {
  return Response.json(
    {
      success: false,
      message: "Hire-driver estimate is not available yet.",
    },
    { status: 501 }
  )
}