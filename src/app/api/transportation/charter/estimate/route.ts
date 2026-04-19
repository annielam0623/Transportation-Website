import { NextRequest, NextResponse } from "next/server";
import { generateCharterQuote } from "@/lib/transportation/charter/quote";
import { CharterQuoteInput } from "@/lib/transportation/charter/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CharterQuoteInput;

    if (!body.serviceType) {
      return NextResponse.json(
        { success: false, error: "serviceType is required" },
        { status: 400 }
      );
    }

    if (!body.tripDate) {
      return NextResponse.json(
        { success: false, error: "tripDate is required" },
        { status: 400 }
      );
    }

    const quote = generateCharterQuote({
      serviceType: body.serviceType,
      pickupLocation: body.pickupLocation ?? "",
      dropoffLocation: body.dropoffLocation ?? "",
      tripDate: body.tripDate,
      pickupTime: body.pickupTime ?? "",
      passengerCount: body.passengerCount ?? 1,
      luggageCount: body.luggageCount ?? 0,
      airportType: body.airportType,
      estimatedServiceHours: body.estimatedServiceHours,
    });

    return NextResponse.json({ success: true, quote });
  } catch (err) {
    console.error("[charter/estimate] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}