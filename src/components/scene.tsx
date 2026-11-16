/**
 * The app's Karakoram ridges with a sky above them, built as separate layers so each can move on
 * its own (dawn rising on load, parallax on scroll). Decorative only.
 */

export type Tone = 'dawn' | 'day' | 'dusk' | 'gold' | 'night';

/** Each trip has its own time of day. */
export const TRIP_TONES: Record<string, Tone> = { 'full-skardu': 'gold', 'airport-hotel': 'dawn', shigar: 'day', 'skardu-khaplu': 'dusk', deosai: 'night' };

const FAR = 'M0 115 L148 92 L288 102 L443 55 L554 77 L724 6 L857 46 L967 34 L1108 71 L1248 52 L1440 83 V340 H0Z';
const MID = 'M0 162 L222 136 L384 148 L591 117 L775 145 L923 129 L1108 153 L1292 137 L1440 147 V340 H0Z';
const FRONT = 'M0 205 L258 187 L480 197 L738 177 L997 195 L1218 186 L1440 195 V340 H0Z';

// fixed star field (deterministic, so server and client render the same)
const STARS = (() => {
  let s = 7;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 70 }, () => ({ x: r() * 1440, y: r() * 420, size: r() < 0.12 ? 1.6 : 0.9, o: 0.25 + r() * 0.55 }));
})();

function Ridge({ d, layer }: { d: string; layer: 'far' | 'mid' | 'front' }) {
  return (
    <div className={`scene__layer scene__layer--${layer}`}>
      <svg className="scene__ridge" viewBox="0 0 1440 340" preserveAspectRatio="none">
        <path d={d} />
      </svg>
    </div>
  );
}

/** Sky, glow, stars and the far and middle ridges. Pass `front={false}` to place the front ridge yourself. */
export function Scene({ tone = 'dawn', stars = false, front = true, className = '' }: { tone?: Tone; stars?: boolean; front?: boolean; className?: string }) {
  return (
    <div className={`scene scene--${tone} ${className}`} aria-hidden>
      <div className="scene__sky" />
      {stars ? (
        <div className="scene__layer scene__layer--stars">
          <svg className="scene__stars" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMin slice">
            {STARS.map((st, i) => <circle key={i} cx={st.x.toFixed(1)} cy={st.y.toFixed(1)} r={st.size} opacity={st.o.toFixed(2)} />)}
          </svg>
        </div>
      ) : null}
      <div className="scene__layer scene__layer--glow"><div className="scene__glow" /></div>
      <Ridge d={FAR} layer="far" />
      <Ridge d={MID} layer="mid" />
      {front ? <Ridge d={FRONT} layer="front" /> : null}
    </div>
  );
}

/** The front ridge on its own, for laying it over something (the hero phone rises from behind it). */
export function FrontRidge() {
  return (
    <div className="scene scene--overlay" aria-hidden>
      <Ridge d={FRONT} layer="front" />
    </div>
  );
}

/*
 * Each trip's route drawn in gold over its own sky. More stops means a longer trip, so the cards
 * read as a set: a single hop for the transfer, a loop for a day trip, a chain of stops for a tour.
 * Coordinates are a 400 x 300 sketch, not a map.
 */
type Route = { d: string; stops: [number, number][] };
const ROUTES: Record<string, Route> = {
  'airport-hotel': { d: 'M48 176 C 130 60, 250 60, 340 128', stops: [[48, 176], [340, 128]] },
  shigar: { d: 'M60 182 C 120 96, 250 70, 322 108 C 280 166, 170 196, 60 182', stops: [[60, 182], [322, 108]] },
  'skardu-khaplu': { d: 'M44 184 C 96 120, 140 104, 172 112 C 230 126, 270 160, 352 120', stops: [[44, 184], [172, 112], [352, 120]] },
  'full-skardu': { d: 'M36 196 C 70 150, 90 128, 112 126 C 150 124, 160 166, 196 160 C 236 154, 240 86, 276 82 C 316 78, 330 120, 360 128', stops: [[36, 196], [112, 126], [196, 160], [276, 82], [360, 128]] },
  deosai: { d: 'M56 196 L 104 170 L 82 150 L 140 130 L 116 112 L 176 98 C 230 92, 290 96, 348 94', stops: [[56, 196], [348, 94]] },
};

/** `fit="meet"` keeps the whole route visible in wide, short frames. */
export function TripArt({ slug, fit = 'slice' }: { slug: string; fit?: 'slice' | 'meet' }) {
  const r = ROUTES[slug];
  return (
    <div className="trip-art" aria-hidden>
      <Scene tone={TRIP_TONES[slug] ?? 'dawn'} stars={slug === 'deosai'} />
      {r ? (
        <svg className="trip-art__route" viewBox="0 0 400 300" preserveAspectRatio={`xMidYMid ${fit}`}>
          <path className="trip-art__line" d={r.d} pathLength={1} />
          {r.stops.map(([x, y], n) => (
            <circle key={n} className={n === r.stops.length - 1 ? 'trip-art__stop trip-art__stop--end' : 'trip-art__stop'} cx={x} cy={y} r={n === r.stops.length - 1 ? 6 : 4.5} />
          ))}
        </svg>
      ) : null}
    </div>
  );
}

