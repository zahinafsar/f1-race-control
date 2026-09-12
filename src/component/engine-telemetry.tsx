import { Disc3, Fuel, Gauge, Thermometer, type LucideIcon } from "lucide-react";
import { carLimits, useCar, type CarMetricId } from "../context/car-hook";

const metricDetails: Record<CarMetricId, { label: string; unit: string; icon: LucideIcon }> = {
  rpm: { label: "RPM", unit: "", icon: Gauge },
  engine: { label: "ENGINE TEMP", unit: " C", icon: Thermometer },
  fuel: { label: "FUEL", unit: "%", icon: Fuel },
  brakes: { label: "BRAKE TEMP", unit: " C", icon: Disc3 },
};

export function EngineTelemetry() {
  const { metrics } = useCar();

  return (
    <div className="flex h-36 flex-col justify-between bg-panel p-4">
      {(Object.keys(metricDetails) as CarMetricId[]).map((id) => {
        const details = metricDetails[id];
        const MetricIcon = details.icon;
        const fill = metrics[id];

        return (
          <div key={id}>
            <div className="mb-1 flex justify-between text-xs leading-none font-black text-accent">
              <span className="flex items-center gap-1.5">
                <MetricIcon className="size-3.5 shrink-0" strokeWidth={2.5} />
                {details.label}
              </span>
              <span>
                {Math.round((fill / 100) * carLimits[id])}
                {details.unit}
              </span>
            </div>
            <div className="h-1 bg-accent/30">
              <div
                className={`h-full rounded-r-full transition-[width] duration-1000 ease-linear bg-linear-to-r from-green-700 via-yellow-300 to-red-500`}
                style={{ width: `${fill}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
