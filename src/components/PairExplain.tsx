import { pairInfo, TRAITS } from "@/lib/chart-data";
import type { PairResult } from "@/lib/lingshu";

export default function PairExplain({ results }: { results: PairResult[] }) {
  // 依出現順序列出不重複的數字對
  const seen = new Map<string, number>();
  for (const r of results) seen.set(r.pair, (seen.get(r.pair) ?? 0) + 1);
  const pairs = [...seen.entries()];

  const stars = [...new Set(pairs.map(([p]) => pairInfo(p)?.star).filter(Boolean))] as string[];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {pairs.map(([pair, count], i) => {
          const info = pairInfo(pair);
          const tone = !info ? "mute" : info.muted ? "mute" : info.good ? "good" : "bad";
          const reversed = pair[0] !== pair[1] ? pair[1] + pair[0] : null;
          return (
            <div
              key={pair}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`animate-rise flex gap-4 rounded-3xl border p-4 ${
                tone === "good"
                  ? "border-good/20 bg-good-soft/60"
                  : tone === "bad"
                    ? "border-bad/20 bg-bad-soft/60"
                    : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-white py-2">
                <span
                  className={`font-num text-3xl font-black leading-none ${
                    tone === "good" ? "text-good" : tone === "bad" ? "text-bad" : "text-mute"
                  }`}
                >
                  {pair}
                </span>
                {reversed && <span className="font-num mt-1 text-xs font-bold text-mute">同 {reversed}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {info ? (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-black text-white ${
                        info.good ? "bg-gradient-to-r from-good to-good-deep" : "bg-gradient-to-r from-bad to-bad-deep"
                      }`}
                    >
                      {info.star}
                    </span>
                  ) : (
                    <span className="rounded-full bg-mute px-2.5 py-0.5 text-xs font-black text-white">無對應</span>
                  )}
                  {count > 1 && <span className="text-xs font-bold text-mute-dark">出現 {count} 次</span>}
                </div>
                {info?.note && (
                  <p
                    className={`mt-1.5 font-black ${
                      tone === "good" ? "text-good-deep" : tone === "bad" ? "text-bad-deep" : "text-mute-dark"
                    }`}
                  >
                    {info.note}
                  </p>
                )}
                {info?.detail && info.detail !== info.note && (
                  <p className="mt-1 text-sm leading-relaxed text-mute-dark">{info.detail}</p>
                )}
                {!info && <p className="mt-1.5 text-sm text-mute-dark">這組數字不屬於八星磁場</p>}
              </div>
            </div>
          );
        })}
      </div>

      {stars.length > 0 && (
        <div className="mt-4 rounded-3xl border border-line bg-white p-5">
          <p className="mb-3 text-sm font-bold text-mute-dark">出現的磁場特質</p>
          <ul className="space-y-2">
            {stars.map((s) => {
              const good = pairInfo(pairs.find(([p]) => pairInfo(p)?.star === s)![0])!.good;
              return (
                <li key={s} className="flex gap-3 text-sm leading-relaxed">
                  <span className={`w-10 shrink-0 font-black ${good ? "text-good-deep" : "text-bad-deep"}`}>{s}</span>
                  <span className="text-foreground/80">{TRAITS[s]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
