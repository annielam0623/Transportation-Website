type Props = {
  result: {
    vehicleType: string;
    pricingMode: string;
    estimatedTotal: number;
    currency: string;
    remarks?: string[];
  };
};

export default function CharterQuoteResult({ result }: Props) {
    const mode =
        result.pricingMode === "per_day"
            ? "day"
            : result.pricingMode === "per_hour"
                ? "hour"
                : "";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{result.vehicleType}</h3>
          <p className="text-sm text-gray-500">
               {mode === "day" ? "Daily Rate" : "Hourly Rate"}
           </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: result.currency,
                          maximumFractionDigits: 0,
                      }).format(result.estimatedTotal)} / {mode}
          </div>
        </div>
      </div>

      {result.remarks?.length ? (
        <ul className="mt-3 list-disc pl-5 text-sm text-gray-600">
          {result.remarks.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}