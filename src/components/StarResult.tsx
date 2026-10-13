import { isGood, type PairResult, type Stat } from "@/lib/lingshu";

type Tone = "good" | "bad" | "mute";

export function toneOf(star: string | null): Tone {
  if (!star || star === "ＸＸ") return "mute";
  return isGood(star) ? "good" : "bad";
}

const TEXT: Record<Tone, string> = {
  good: "text-good-deep",
  bad: "text-bad-deep",
  mute: "text-mute",
};
const TILE: Record<Tone, string> = {
  good: "bg-good-soft border-good/25",
  bad: "bg-bad-soft border-bad/25",
  mute: "bg-slate-50 border-slate-200",
};
const BAR: Record<Tone, string> = {
  good: "bg-gradient-to-r from-[#c4aefa] to-good-deep",
  bad: "bg-gradient-to-r from-[#9cc4f7] to-bad-deep",
  mute: "bg-mute",
};

export function PairStrip({ results }: { results: PairResult[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(4.25rem,1fr))] gap-2">
      {results.map((r, i) => {
        const tone = r.inherited ? "mute" : toneOf(r.effective);
        return (
          <div
            key={i}
            style={{ animationDelay: `${i * 35}ms` }}
            className={`animate-rise flex flex-col items-center rounded-2xl border py-2.5 ${TILE[tone]} ${
              r.inherited ? "border-dashed" : ""
            }`}
          >
            <span className={`font-num text-2xl font-black leading-none ${TEXT[toneOf(r.raw)]}`}>
              {r.pair}
            </span>
            <span className={`mt-1.5 text-xs font-bold ${r.inherited ? "italic text-mute" : TEXT[tone]}`}>
              {r.effective ?? "ＸＸ"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function StatBars({ stats }: { stats: Stat[] }) {
  return (
    <ul className="space-y-3">
      {stats.map((s, i) => {
        const tone = toneOf(s.star);
        return (
          <li key={s.star} className="animate-rise flex items-center gap-3" style={{ animationDelay: `${i * 60}ms` }}>
            <span className={`w-11 shrink-0 font-black ${TEXT[tone]}`}>{s.star}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-[width] duration-700 ${BAR[tone]}`}
                style={{ width: `${Math.max(s.percent * 100, 3)}%` }}
              />
            </div>
            <span className="font-num w-24 shrink-0 text-right text-sm font-bold text-mute-dark">
              {s.count} 個 · {(s.percent * 100).toFixed(1)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function TypeCard({ star, trait }: { star: string; trait?: string }) {
  const good = isGood(star);
  return (
    <div
      className={`animate-rise relative overflow-hidden rounded-3xl p-6 text-center sm:p-8 ${
        good
          ? "bg-gradient-to-br from-good-soft via-white to-[#f7f2ff]"
          : "bg-gradient-to-br from-bad-soft via-white to-[#f1f7ff]"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-4 -top-10 select-none text-[9rem] font-black leading-none opacity-[0.07] ${
          good ? "text-good-deep" : "text-bad-deep"
        }`}
      >
        {star}
      </span>
      <p className="text-sm font-bold tracking-[0.3em] text-mute-dark">你 是</p>
      <p className={`my-1 text-6xl font-black sm:text-7xl ${good ? "text-gradient-good" : "text-gradient-bad"}`}>
        {star}
      </p>
      <p className="text-sm font-bold tracking-[0.3em] text-mute-dark">型 的 人</p>
      {trait && <p className="mx-auto mt-4 max-w-md leading-relaxed text-foreground/80">{trait}</p>}
    </div>
  );
}

export function ResultNote() {
  return (
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 rounded-2xl bg-slate-50/80 px-4 py-3 text-xs leading-relaxed text-mute-dark sm:text-sm">
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded border border-dashed border-slate-300 bg-slate-50" />
        虛線框：由伏位延續前一組能量
      </span>
      <span>伏位延續前面的能量，生氣也會放大前面的能量</span>
      <span>比例需視數字強弱往下調整</span>
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="animate-rise rounded-2xl border border-pink/20 bg-pink-soft px-4 py-3 text-sm font-bold text-pink">
      {children}
    </p>
  );
}
