import { NextRequest, NextResponse } from "next/server";
import { generateLasVegasQuote } from "@/lib/transportation/charter/cities/las-vegas/quote";
import { CharterQuoteInput } from "@/lib/transportation/charter/types";

type CityKey = "las-vegas" | "los-angeles" | "san-francisco" | "phoenix";

function getQuoteGenerator(cityKey: CityKey) {
  switch (cityKey) {
    case "las-vegas":
      return generateLasVegasQuote;
    // 将来加：
    // case "los-angeles": return generateLosAngelesQuote;
    default:
      return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CharterQuoteInput & { cityKey?: CityKey };

    if (!body.serviceType) {
      return NextResponse.json(
        { success: false, error: "serviceType is required" },
        { status: 400 }
      );
    }

    const cityKey = body.cityKey ?? "las-vegas";
    const generateQuote = getQuoteGenerator(cityKey);

    if (!generateQuote) {
      return NextResponse.json(
        { success: false, error: `City "${cityKey}" is not supported yet` },
        { status: 400 }
      );
    }

    const quote = generateQuote({
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