import { useWeather } from "../context/weather-hook";

export function WeatherStrip() {
  const weatherMetrics = useWeather();

  return (
    <div className="mt-4 shrink-0 bg-panel-deep p-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {weatherMetrics.map((metric) => (
          <div
            key={metric.label}
            className="flex min-h-12 min-w-0 flex-col justify-center bg-accent/20 px-3 py-2"
          >
            <div className="text-xs leading-tight font-black text-white/60">
              {metric.label}
            </div>
            <div className="text-base leading-tight font-black">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
