import * as mock from "@/components/dashboard/data/mock";
import { PanelHeader } from "@/components/dashboard/primitives";
import { BigPanel } from "@/components/dashboard/primitives/layouts";

const SIZE = 160;
const R = 60;
const STROKE = 20;
const C = 2 * Math.PI * R;

export default function CustomerMixDonut() {
  const data = mock.customerMix;
  const total = data.slices.reduce((sum, s) => sum + s.value, 0) || 1;

  let acc = 0;

  return (
    <BigPanel className="max-h-[420px]">
      <PanelHeader title={data.title} meta={data.meta} />

      <div className="flex flex-1 items-center gap-5 px-2">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[160px] shrink-0">
          <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="rgb(245 246 248 / 0.06)" strokeWidth={STROKE} />
          {data.slices.map((s) => {
            const len = (s.value / total) * C;
            const offset = -acc;
            acc += len;
            return (
              <circle
                key={s.label}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth={STROKE}
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                strokeLinecap="butt"
              />
            );
          })}
          {data.centerLabel && (
            <>
              <text x="50%" y="47%" textAnchor="middle" className="tabular-nums" fill="rgb(245 246 248 / 0.92)" fontSize="22">
                {data.centerLabel}
              </text>
              {data.centerSub && (
                <text x="50%" y="62%" textAnchor="middle" fill="rgb(245 246 248 / 0.5)" fontSize="11">
                  {data.centerSub}
                </text>
              )}
            </>
          )}
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
