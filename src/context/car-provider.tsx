import { useEffect, useMemo, useState, type ReactNode } from "react";
import { tyreLayout } from "../data/race-data";
import { getTyreCondition } from "../data/tyre-condition";
import { CarContext, carLimits } from "./car-hook";
import { usePlayer } from "./player-hook";
import { random } from "../lib/utils";

function readings() {
  return {
    rpm: random(6000, 6000),
    engineTemp: random(100, 30),
    fuel: random(55, 30),
    brakeTemp: random(420, 480),
    tyres: {
      fl: {
        temp: random(100, 3).toFixed(1),
        pressure: random(1.2, 0.04).toFixed(2),
      },
      fr: {
        temp: random(105, 3).toFixed(1),
        pressure: random(1.21, 0.04).toFixed(2),
      },
      rl: {
        temp: random(95, 3).toFixed(1),
        pressure: random(1.18, 0.04).toFixed(2),
      },
      rr: {
        temp: random(95, 3).toFixed(1),
        pressure: random(1.19, 0.04).toFixed(2),
      },
    },
  };
}

export function CarProvider({ children }: { children: ReactNode }) {
  const { player } = usePlayer();
  const [carData, setCarData] = useState(readings);

  useEffect(() => {
    const timer = setInterval(() => setCarData(readings()), 500);
    return () => clearInterval(timer);
  }, []);

  const value = useMemo(
    () => ({
      image: player.car.image,
      tyres: tyreLayout.map((tyre) => {
        const temperature = carData.tyres[tyre.id].temp;
        const pressure = carData.tyres[tyre.id].pressure;

        return {
          ...tyre,
          temperature,
          pressure,
          condition: getTyreCondition(temperature, pressure),
        };
      }),
      metrics: {
        rpm: (carData.rpm / carLimits.rpm) * 100,
        engine: (carData.engineTemp / carLimits.engine) * 100,
        fuel: (carData.fuel / carLimits.fuel) * 100,
        brakes: (carData.brakeTemp / carLimits.brakes) * 100,
      },
    }),
    [player, carData],
  );

  return <CarContext value={value}>{children}</CarContext>;
}
