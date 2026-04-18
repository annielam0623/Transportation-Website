import { NextRequest, NextResponse } from "next/server";
import { generateCharterQuote } from "@/lib/charter/quote";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const quote = generateCharterQuote(body);

    return NextResponse.json({
      success: true,
      quote
    });

  } catch (error) {
    console.error("Charter quote error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate charter quote."
      },
      { status: 500 }
    );
  }
}