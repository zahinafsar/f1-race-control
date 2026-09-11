import { useEffect, useMemo, useState, type ReactNode } from "react";
import { addMilliseconds, format } from "date-fns";
import { trackPoints } from "../data/track-points";
import { RaceContext } from "./race-hook";
import { usePlayer } from "./player-hook";

export function RaceProvider({ children }: { children: ReactNode }) {
  const { players } = usePlayer();
  const [race, setRace] = useState([
    {
      progress: 0,
      lap: 16,
      currentLap: new Date(2026, 5, 15, 14, 1, 10),
      bestLap: "1:23.05",
      topSpeed: 287,
    },
    {
      progress: 20,
      lap: 17,
      currentLap: new Date(2026, 5, 15, 14, 1, 15),
      bestLap: "1:23.41",
      topSpeed: 279,
    },
    {
      progress: 40,
      lap: 18,
      currentLap: new Date(2026, 5, 15, 14, 1, 20),
      bestLap: "1:24.02",
      topSpeed: 274,
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRace((prev) =>
        prev.map((car) => ({
          ...car,
          progress: (car.progress + 1) % trackPoints.length,
          currentLap: addMilliseconds(car.currentLap, 100),
        })),
      );
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const value = useMemo(() => {
    return {
      circuit: "Hockenheim, DE",
      stats: race.map((car, index) => {
        const point = Math.floor(car.progress);
        const [x, y] = trackPoints[point];

        return {
          player: players[index].id,
          rank: `P${index + 1}`,
          lap: `${car.lap}/67`,
          topSpeed: `${car.topSpeed} km/h`,
          currentLap: format(car.currentLap, "m:ss.SS"),
          bestLap: car.bestLap,
          x,
          y,
        };
      }),
    };
  }, [race, players]);

  return <RaceContext value={value}>{children}</RaceContext>;
}
