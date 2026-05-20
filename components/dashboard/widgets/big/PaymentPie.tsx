import * as mock from "@/components/dashboard/data/mock";
import { PanelHeader } from "@/components/dashboard/primitives";
import { BigPanel } from "@/components/dashboard/primitives/layouts";

const SIZE = 160;
const R = 72;

/** Point on the circle for an angle measured clockwise from 12 o'clock. */
function polar(deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [SIZE / 2 + R * Math.cos(a), SIZE / 2 + R * Math.sin(a)];
}

function wedge(startDeg: number, endDeg: number): string {
  const [sx, sy] = polar(startDeg);
  const [ex, ey] = polar(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${SIZE / 2} ${SIZE / 2} L ${sx} ${sy} A ${R} ${R} 0 ${large} 1 ${ex} ${ey} Z`;
}

export default function PaymentPie() {
  const data = mock.paymentMix;
  const total = data.slices.reduce((sum, s) => sum + s.value, 0) || 1;

  let acc = 0;

  return (
    <BigPanel className="max-h-[420px]">
      <PanelHeader title={data.title} meta={data.meta} />

      <div className="flex flex-1 items-center gap-5 px-2">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[160px] shrink-0">
          {data.slices.map((s) => {
            const start = (acc / total) * 360;
            acc += s.value;
            const end = (acc / total) * 360;
            return <path key={s.label} d={wedge(start, end)} fill={s.color} stroke="var(--color-cosmic-black)" strokeWidth={1.5} />;
          })}
        </svg>

        <ul className="m-0 p-0 list-none flex flex-col gap-2.5 flex-1 min-w-0">
          {data.slices.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
              <span className="text-soft-white/72 truncate flex-1">{s.label}</span>
              <span className="text-soft-white/92 tabular-nums">{Math.round((s.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </BigPanel>
  );
}
