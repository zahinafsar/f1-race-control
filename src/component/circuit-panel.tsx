import rivalOne from "../assets/race-control/rival-one.svg";
import rivalTwo from "../assets/race-control/rival-two.svg";
import rivalThree from "../assets/race-control/rival-three.svg";
import germanyFlag from "../assets/race-control/germany-flag.png";
import { trackPoints } from "../data/track-points";
import { useRace } from "../context/race-hook";
import { usePlayer } from "../context/player-hook";

const markers = [rivalOne, rivalTwo, rivalThree];

export function CircuitPanel() {
  const { circuit, stats } = useRace();
  const { player } = usePlayer();
  const current = stats.find((stat) => stat.player === player.id) ?? stats[0];
  const details = [
    { label: "Lap", value: current.lap },
    { label: "Top Speed", value: current.topSpeed },
    { label: "Current Lap", value: current.currentLap },
    { label: "Best Lap", value: current.bestLap },
  ];

  return (
    <div className="h-80 min-h-0 bg-panel-deep xl:h-full">
      <div className="flex h-full">
        <div className="w-28 shrink-0 overflow-y-auto bg-panel p-4 sm:w-32">
          <div className="mb-4 flex h-9 w-10 items-center justify-center bg-accent text-base font-extrabold">
            {current.rank}
          </div>
          <div className="space-y-3 font-extrabold">
            {details.map((detail) => (
              <div key={detail.label}>
                <div className="text-xs leading-tight">{detail.label}</div>
                <div className="mt-1 text-base leading-none text-accent">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="mb-3 flex shrink-0 items-center justify-end gap-2 text-xs font-extrabold">
            <span>{circuit}</span>
            <img
              src={germanyFlag}
              width={14}
              height={9}
              className="h-2 w-3 shrink-0"
            />
          </div>
          <div className="min-h-0 flex-1">
            <svg viewBox="0 0 280 280" className="h-full w-full">
              <path
                d={`${trackPoints.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ")} Z`}
                fill="none"
                strokeWidth={2}
                strokeLinejoin="round"
                className="stroke-accent"
              />
              {stats.map((stat, index) => {
                const isSelected = stat.player === current.player;

                return (
                  <g
                    key={stat.player}
                    style={{
                      transform: `translate(${stat.x}px, ${stat.y}px)`,
                      transition: "transform 100ms linear",
                    }}
                  >
                    {isSelected ? (
                      <circle r={6} className="fill-accent animate-ping" />
                    ) : null}
                    <image
                      href={markers[index]}
                      x={-5}
                      y={ -6}
                      width={10}
                      height={12}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
