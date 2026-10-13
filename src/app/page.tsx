import Calculator from "@/components/Calculator";
import { AVOID, BUTTERFLY, CHART, CURES, FOUR_DIGITS, SPECIALS, YIN_YANG } from "@/lib/chart-data";

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

const NAV = [
  { href: "#calc", label: "計算機" },
  { href: "#cure", label: "化解口訣" },
  { href: "#chart", label: "八星對照" },
  { href: "#special", label: "特殊數字" },
  { href: "#caution", label: "不好的數字" },
];

const FLOATING = [
  { n: "14", c: "text-good", pos: "left-[6%] top-[18%]", size: "text-6xl", delay: "0s" },
  { n: "68", c: "text-good", pos: "right-[10%] top-[8%]", size: "text-7xl", delay: "-2s" },
  { n: "19", c: "text-good", pos: "right-[30%] bottom-[6%]", size: "text-5xl", delay: "-4s" },
  { n: "37", c: "text-bad", pos: "left-[38%] top-[2%]", size: "text-5xl", delay: "-6s" },
  { n: "24", c: "text-bad", pos: "right-[4%] bottom-[22%]", size: "text-6xl", delay: "-3s" },
  { n: "89", c: "text-pink", pos: "left-[22%] bottom-[2%]", size: "text-4xl", delay: "-5s" },
];

export default function Home() {
  return (
    <>
      {/* 導覽列 */}
      <nav className="sticky top-0 z-30 border-b border-line/70 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
          <a href="#" className="mr-2 flex shrink-0 items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-good to-good-deep text-sm font-black text-white">
              數
            </span>
            <span className="hidden font-black tracking-wider text-mute-dark sm:inline">東方靈數</span>
          </a>
          <div className="-mr-4 flex min-w-0 gap-0.5 overflow-x-auto pr-4 [scrollbar-width:none] sm:mr-0 sm:gap-1 sm:pr-0">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-bold text-mute-dark transition hover:bg-good-soft hover:text-good-deep sm:px-4 sm:text-sm"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        {/* 主視覺 */}
        <header className="relative py-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
            {FLOATING.map((f) => (
              <span
                key={f.n}
                style={{ animationDelay: f.delay }}
                className={`font-num animate-float absolute font-black opacity-[0.13] ${f.c} ${f.pos} ${f.size}`}
              >
                {f.n}
              </span>
            ))}
          </div>
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-bold text-good-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-pink" />
                數字易經・好命密碼
              </p>
              <h1 className="text-gradient-title text-[5.5rem] font-black leading-[0.92] tracking-tight sm:text-[9.5rem]">
                東方
                <br />
                靈數
              </h1>
            </div>
            <div className="max-w-md sm:pb-3 sm:text-right">
              <p className="text-2xl font-black sm:text-3xl">
                <span className="text-gradient-good">數字磁場</span>
                <span className="text-mute-dark">計算機</span>
              </p>
              <p className="mt-3 leading-relaxed text-mute-dark">
                輸入身分證字號、手機、車牌或住址，拆解出八星能量。
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 sm:justify-end">
                {CHART.map((r) => (
                  <span
                    key={r.star}
                    className={`rounded-full px-2.5 py-0.5 text-sm font-black ${
                      r.good ? "bg-good-soft text-good-deep" : "bg-bad-soft text-bad-deep"
                    }`}
                  >
                    {r.star}
                  </span>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-mute sm:justify-end">
                <LockIcon />
                全部在瀏覽器內計算，不會上傳任何資料
              </p>
            </div>
          </div>
        </header>

        <section id="calc">
          <Calculator />
        </section>

        {/* 化解口訣 */}
        <section id="cure" className="mt-24">
          <SectionTitle en="Remedies">數字化解口訣</SectionTitle>
          <div className="card overflow-hidden rounded-[2rem]">
            <p className="bg-gradient-to-r from-good-soft via-white to-bad-soft px-6 py-6 text-center text-xl font-black leading-relaxed sm:text-3xl">
              {[
                ["天醫", "欺", "絕命"],
                ["延年", "壓", "六煞"],
                ["生氣", "補", "禍害"],
                ["生氣天醫延年", "壓", "五鬼"],
              ].map(([g, v, b], i) => (
                <span key={b} className="inline-block whitespace-nowrap">
                  {i > 0 && <span className="mx-1 text-line sm:mx-2">・</span>}
                  <span className="text-gradient-good">{g}</span>
                  <span className="mx-0.5 text-mute">{v}</span>
                  <span className="text-gradient-bad">{b}</span>
                </span>
              ))}
            </p>
            <div className="grid gap-px bg-line sm:grid-cols-3">
              {CURES.map((c) => (
                <div key={c.bad} className="bg-white p-5 sm:p-6">
                  <p className="text-sm font-bold text-mute-dark">
                    遇到 <span className="rounded-md bg-bad-soft px-1.5 py-0.5 text-bad-deep">{c.bad}</span>　用{" "}
                    <span className="rounded-md bg-good-soft px-1.5 py-0.5 text-good-deep">{c.good}</span> 化解
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.nums.map((n) => (
                      <span
                        key={n}
                        className="font-num rounded-xl bg-gradient-to-br from-good to-good-deep px-2.5 py-1 text-lg font-black text-white"
                      >
                        {n}
                      </span>
                    ))}
                    {c.more.map((n) => (
                      <span
                        key={n}
                        className="font-num rounded-xl border border-good/30 px-2.5 py-1 text-lg font-black text-good"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mute-dark">
            建議先從實心的數字開始使用。「生氣＋天醫＋延年」化五鬼時順序不可變；不確定補出什麼，可用上方「多組合併」驗證。
          </p>
        </section>

        {/* 八星對照表 */}
        <section id="chart" className="mt-24">
          <SectionTitle en="Eight Stars">八星數字對照表</SectionTitle>
          <div className="flex gap-5">
            <div className="grid min-w-0 flex-1 gap-3">
              {CHART.map((row, idx) => (
                <div key={row.star}>
                  {idx === 4 && (
                    <div className="my-3 flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-mute">
                      <span className="h-px flex-1 bg-line" />四 凶 星<span className="h-px flex-1 bg-line" />
                    </div>
                  )}
                  {idx === 0 && (
                    <div className="mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-mute">
                      <span className="h-px flex-1 bg-line" />四 吉 星<span className="h-px flex-1 bg-line" />
                    </div>
                  )}
                  <div className="card group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-5 transition hover:-translate-y-0.5 lg:flex-row lg:items-center lg:gap-6">
                    <span
                      className={`absolute inset-y-0 left-0 w-1.5 ${
                        row.good ? "bg-gradient-to-b from-good to-good-deep" : "bg-gradient-to-b from-bad to-bad-deep"
                      }`}
                    />
                    <div className="flex items-start gap-3 pl-2 lg:w-80 lg:shrink-0">
                      <span
                        className={`shrink-0 whitespace-nowrap text-5xl font-black leading-none ${
                          row.good ? "text-gradient-good" : "text-gradient-bad"
                        }`}
                      >
                        {row.star}
                      </span>
                      <div>
                        <p className={`font-black ${row.good ? "text-good-deep" : "text-bad-deep"}`}>{row.title}</p>
                        {row.desc && <p className="text-sm leading-snug text-mute-dark">{row.desc}</p>}
                      </div>
                    </div>
                    <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
                      {row.pairs.map((p, i) => (
                        <div
                          key={i}
                          className={`flex flex-col items-center justify-center rounded-2xl px-1 py-2.5 text-center ${
                            p.muted ? "bg-slate-50" : row.good ? "bg-good-soft/70" : "bg-bad-soft/70"
                          }`}
                        >
                          <span
                            className={`font-num text-3xl font-black leading-tight sm:text-4xl ${
                              p.muted ? "text-mute" : row.good ? "text-good" : "text-bad"
                            }`}
                          >
                            {p.nums[0]} {p.nums[1]}
                          </span>
                          {p.note && (
                            <span
                              className={`mt-0.5 text-xs font-bold ${
                                p.muted ? "text-mute" : row.good ? "text-good-deep/80" : "text-bad-deep/80"
                              }`}
                            >
                              {p.note}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1.5 px-5 text-xs text-mute lg:hidden">{row.trait}</p>
                </div>
              ))}
            </div>
            {/* A–Z 對照 */}
            <aside className="hidden shrink-0 sm:block">
              <div className="sticky top-20">
                <p className="mb-2 text-center text-xs font-bold tracking-widest text-mute">英文對照</p>
                <div className="card flex overflow-hidden rounded-2xl">
                  <div className="flex flex-col bg-gradient-to-b from-[#b8c0c5] to-mute px-2 py-2">
                    {LETTERS.map((l) => (
                      <span key={l} className="font-num text-center text-base font-black leading-[1.6] text-white">
                        {l}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col px-2 py-2">
                    {LETTERS.map((l, i) => (
                      <span key={l} className="font-num text-center text-base font-bold leading-[1.6] text-mute">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
          {/* 手機版 A–Z */}
          <div className="mt-6 grid grid-cols-6 gap-1.5 sm:hidden">
            {LETTERS.map((l, i) => (
              <div key={l} className="card flex overflow-hidden rounded-lg text-center text-sm">
                <span className="font-num flex-1 bg-mute py-0.5 font-black text-white">{l}</span>
                <span className="font-num flex-1 py-0.5 font-bold text-mute">{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 特殊數字 */}
        <section id="special" className="mt-24">
          <SectionTitle en="Special Numbers">特殊數字組合</SectionTitle>
          <div className="grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-6">
              <div className="pink-card col-span-2 flex gap-4 rounded-3xl bg-gradient-to-br from-pink-soft to-white p-5 sm:col-span-4">
                <span className="text-xl font-black leading-tight tracking-widest text-pink [writing-mode:vertical-rl]">
                  蝴蝶雙飛
                </span>
                <div className="flex flex-1 flex-col justify-around gap-4">
                  {BUTTERFLY.map((b) => (
                    <div key={b.nums} className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                      <span className="font-num text-gradient-pink shrink-0 text-3xl font-black">{b.nums}</span>
                      <div>
                        <p className="font-black text-pink">{b.title}</p>
                        <p className="text-sm text-pink/70">{b.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pink-card col-span-2 flex flex-col justify-around gap-5 rounded-3xl bg-gradient-to-b from-pink-soft to-white p-5 sm:row-span-2">
                {YIN_YANG.map((s, i) => (
                  <div key={s.num}>
                    {i > 0 && <div className="mx-auto mb-5 h-px w-2/3 bg-pink/20" />}
                    <PinkContent {...s} />
                  </div>
                ))}
              </div>
              {SPECIALS.map((s) => (
                <div
                  key={s.num}
                  className="pink-card col-span-1 flex items-center justify-center rounded-3xl bg-white p-4 sm:col-span-2"
                >
                  <PinkContent {...s} />
                </div>
              ))}
            </div>

          {/* 四碼組合 */}
          <div className="mt-10 mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-pink/70">
            <span className="h-px flex-1 bg-pink/20" />四 碼 組 合<span className="h-px flex-1 bg-pink/20" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {FOUR_DIGITS.map((s, i) => (
              <div
                key={s.num}
                className={`pink-card flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-pink-soft to-white p-4 text-center ${
                  i === FOUR_DIGITS.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <p className="font-num text-gradient-pink text-4xl font-black leading-tight tracking-wide">{s.num}</p>
                <p className="mt-0.5 font-black leading-snug text-pink">{s.title}</p>
                {s.parts && (
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
                    {s.parts.map(([n, star], j) => {
                      const good = CHART.find((r) => r.star === star)?.good;
                      return (
                        <span key={j} className="flex items-center gap-1">
                          {j > 0 && <span className="text-xs font-bold text-pink/50">+</span>}
                          <span
                            className={`rounded-lg px-1.5 py-0.5 text-xs font-bold ${
                              good ? "bg-good-soft text-good-deep" : "bg-bad-soft text-bad-deep"
                            }`}
                          >
                            <span className="font-num">{n}</span>
                            {star}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
                {s.note && <p className="mt-1 text-sm leading-snug text-pink/70">{s.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* 不好的數字組合 */}
        <section id="caution" className="mt-24">
          <SectionTitle en="Caution">不好的數字組合</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card flex items-center gap-4 rounded-3xl p-5">
              <span className="font-num text-gradient-title text-8xl font-black leading-none">5</span>
              <div>
                <p className="text-xl font-black text-mute-dark">過渡強化</p>
                <p className="text-sm text-mute-dark">變成前面後的數字</p>
                <p className="font-num mt-1 text-sm font-bold text-good-deep">1153 → 1313</p>
              </div>
            </div>
            <div className="card flex items-center gap-4 rounded-3xl p-5">
              <span className="font-num text-gradient-title text-8xl font-black leading-none">0</span>
              <div>
                <p className="text-xl font-black text-mute-dark">會化空</p>
                <p className="text-sm text-mute-dark">變成前面的數字，在第一個就是變成最後一碼</p>
                <p className="font-num mt-1 text-sm font-bold text-good-deep">104 → 114　093 → 393</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#8f999f] to-[#6f787e] p-5 text-white">
              <p className="text-sm font-bold tracking-widest text-white/70">不好的數字為神明使用</p>
              {AVOID.map((a) => (
                <div key={a.num} className="mt-3 flex items-center gap-3">
                  <span className="font-num shrink-0 text-4xl font-black leading-none">{a.num}</span>
                  <span className="text-sm leading-snug text-white/85">{a.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-24 border-t border-line py-10 text-center">
          <p className="text-gradient-title text-2xl font-black">東方靈數</p>
          <p className="mt-2 text-sm text-mute">數字能量僅供參考與娛樂，請理性看待。</p>
        </footer>
      </main>
    </>
  );
}

function SectionTitle({ children, en }: { children: React.ReactNode; en: string }) {
  return (
    <div className="mb-6">
      <p className="font-num text-xs font-black uppercase tracking-[0.35em] text-pink">{en}</p>
      <h2 className="mt-1 text-3xl font-black text-foreground sm:text-4xl">{children}</h2>
    </div>
  );
}

function PinkContent({ num, title, note }: { num: string; title: string; note?: string }) {
  return (
    <div className="text-center">
      <p className="font-num text-gradient-pink text-4xl font-black leading-tight">{num}</p>
      <p className="mt-0.5 font-black leading-snug text-pink">{title}</p>
      {note && <p className="mt-0.5 text-sm text-pink/70">{note}</p>}
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <rect x="4" y="11" width="16" height="10" rx="2.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
