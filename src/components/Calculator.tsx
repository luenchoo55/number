"use client";

import { useMemo, useState } from "react";
import {
  analyzePairs,
  countStars,
  normalizeInput,
  offsetGroups,
  stageOf,
  toPairs,
  toStats,
  type StarName,
} from "@/lib/lingshu";
import { TRAITS } from "@/lib/chart-data";
import PairExplain from "./PairExplain";
import { Empty, PairStrip, ResultNote, StatBars, TypeCard, toneOf } from "./StarResult";

const TABS = [
  { key: "id", label: "身分證字號", sub: "人格類型・人生大運", icon: "ID" },
  { key: "any", label: "單組數字", sub: "手機・車牌・住址", icon: "#" },
  { key: "multi", label: "多組合併", sub: "吉凶互相抵銷", icon: "+" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export default function Calculator() {
  const [tab, setTab] = useState<TabKey>("id");
  return (
    <div className="card rounded-[2rem] p-3 sm:p-4">
      <div className="grid grid-cols-3 gap-1.5 rounded-[1.4rem] bg-good-soft/70 p-1.5" role="tablist">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={`flex items-center justify-center gap-2.5 rounded-2xl px-2 py-2.5 transition-all sm:py-3 ${
                active
                  ? "bg-white text-good-deep shadow-[0_6px_20px_-8px_rgb(125_85_227/0.45)]"
                  : "text-mute-dark hover:bg-white/60"
              }`}
            >
              <span
                className={`font-num hidden h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black sm:grid ${
                  active ? "bg-gradient-to-br from-good to-good-deep text-white" : "bg-white/70 text-mute"
                }`}
              >
                {t.icon}
              </span>
              <span className="text-left">
                <span className="block text-sm font-black sm:text-lg">{t.label}</span>
                <span className="hidden text-xs text-mute sm:block">{t.sub}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div key={tab} className="animate-rise px-2 pb-4 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
        {tab === "id" && <IdPanel />}
        {tab === "any" && <AnyPanel />}
        {tab === "multi" && <MultiPanel />}
      </div>
    </div>
  );
}

function InputRow({
  value,
  onChange,
  onSubmit,
  placeholder,
  button,
  examples,
  onClear,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v?: string) => void;
  placeholder: string;
  button: string;
  examples?: string[];
  /** 有值時代表已算完，按鈕變成「清除」 */
  onClear?: () => void;
}) {
  return (
    <div>
      <form
        className="flex gap-2 rounded-[1.4rem] border-2 border-line bg-white p-1.5 transition focus-within:border-good focus-within:shadow-[0_0_0_5px_rgb(160_124_240/0.12)]"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="font-num min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xl font-bold tracking-wider text-foreground outline-none placeholder:font-sans placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-mute sm:text-2xl sm:placeholder:text-base"
        />
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 rounded-2xl border-2 border-pink/40 bg-pink-soft px-5 text-base font-black text-pink transition hover:-translate-y-0.5 hover:border-pink active:translate-y-0 sm:px-8 sm:text-lg"
          >
            清除
          </button>
        ) : (
          <button
            type="submit"
            className="shrink-0 rounded-2xl bg-gradient-to-br from-[#f47bb8] to-pink px-5 text-base font-black text-white shadow-[0_8px_20px_-8px_rgb(236_79_158/0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgb(236_79_158/0.7)] active:translate-y-0 sm:px-8 sm:text-lg"
          >
            {button}
          </button>
        )}
      </form>
      {examples && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-mute">
          <span>試試看：</span>
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                onChange(ex);
                onSubmit(ex);
              }}
              className="font-num rounded-full border border-line bg-white px-3 py-1 font-bold text-mute-dark transition hover:border-good hover:text-good-deep"
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm leading-relaxed text-mute-dark sm:text-base">{children}</p>;
}

function Heading({ children, extra }: { children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="mb-4 mt-10 flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="flex items-center gap-2.5 text-xl font-black text-foreground">
        <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-good to-pink" />
        {children}
      </h3>
      {extra}
    </div>
  );
}

function UsedNumber({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-xs text-mute sm:text-sm">
      {label}
      <span className="font-num ml-2 rounded-lg bg-slate-100 px-2 py-0.5 font-bold tracking-wider text-mute-dark">
        {value}
      </span>
    </span>
  );
}

const ERROR = "請輸入 2 碼以上的英數字";

/* 分析一：身分證字號 */
function IdPanel() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const result = useMemo(() => {
    if (submitted === null) return null;
    const full = normalizeInput(submitted);
    // 人格類型不看開頭的 0
    const overall = full.startsWith("0") ? full.slice(1) : full;
    const overallRes = analyzePairs(toPairs(overall));
    if (overallRes.length === 0) return { error: true as const };
    const stats = toStats(countStars(overallRes));
    const yearly = analyzePairs(toPairs(full));
    return { error: false as const, full, overall, overallRes, stats, yearly };
  }, [submitted]);

  return (
    <div>
      <Hint>英文字母依 A=01、B=02 … Z=26 轉換，例如 A 開頭會變成 01。</Hint>
      <InputRow
        value={input}
        onChange={setInput}
        onSubmit={(v) => setSubmitted(v ?? input)}
        onClear={
          submitted !== null && input === submitted
            ? () => {
                setInput("");
                setSubmitted(null);
              }
            : undefined
        }
        placeholder="輸入身分證字號"
        button="計算"
        examples={["A123456789"]}
      />
      {result?.error && <div className="mt-6"><Empty>{ERROR}</Empty></div>}
      {result && !result.error && (
        <>
          <Heading extra={<UsedNumber label="使用（不看開頭 0）" value={result.overall} />}>人格類型</Heading>
          <TypeCard star={result.stats[0].star} trait={TRAITS[result.stats[0].star]} />
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <PairStrip results={result.overallRes} />
            <StatBars stats={result.stats} />
          </div>
          <ResultNote />

          <Heading extra={<UsedNumber label="大運使用" value={result.full} />}>人生大運</Heading>
          <ol className="relative grid gap-2 sm:grid-cols-2">
            {result.yearly.map((r, i) => {
              const tone = r.inherited ? "mute" : toneOf(r.effective);
              return (
                <li
                  key={i}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="animate-rise flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-2.5"
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      tone === "good" ? "bg-good" : tone === "bad" ? "bg-bad" : "bg-mute"
                    }`}
                  />
                  <span className="font-num w-24 shrink-0 text-sm font-bold text-mute-dark">
                    {stageOf(i, result.yearly.length)}
                  </span>
                  <span className="font-num text-xl font-black text-foreground">{r.pair}</span>
                  <span
                    className={`ml-auto rounded-full px-3 py-0.5 text-sm font-black ${
                      tone === "good"
                        ? "bg-good-soft text-good-deep"
                        : tone === "bad"
                          ? "bg-bad-soft text-bad-deep"
                          : "bg-slate-100 italic text-mute"
                    }`}
                  >
                    {r.effective ?? "ＸＸ"}
                  </span>
                </li>
              );
            })}
          </ol>

          <Heading>數字解說</Heading>
          <PairExplain results={result.yearly} />
        </>
      )}
    </div>
  );
}

/* 分析二：單組數字 */
function AnyPanel() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const result = useMemo(() => {
    if (submitted === null) return null;
    const numeric = normalizeInput(submitted);
    const res = analyzePairs(toPairs(numeric));
    if (res.length === 0) return { error: true as const };
    return { error: false as const, numeric, res, stats: toStats(countStars(res)) };
  }, [submitted]);

  return (
    <div>
      <Hint>
        手機、車牌、住址都可以。英文會轉成兩位數，其他符號自動略過；地址請用半形數字，例如「重慶南路1段122號」。
      </Hint>
      <InputRow
        value={input}
        onChange={setInput}
        onSubmit={(v) => setSubmitted(v ?? input)}
        onClear={
          submitted !== null && input === submitted
            ? () => {
                setInput("");
                setSubmitted(null);
              }
            : undefined
        }
        placeholder="輸入一串英數字"
        button="計算"
        examples={["0912345678", "ABC-1234"]}
      />
      {result?.error && <div className="mt-6"><Empty>{ERROR}</Empty></div>}
      {result && !result.error && (
        <>
          <Heading extra={<UsedNumber label="計算數字" value={result.numeric} />}>分析結果</Heading>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <PairStrip results={result.res} />
            <StatBars stats={result.stats} />
          </div>
          <ResultNote />

          <Heading>數字解說</Heading>
          <PairExplain results={result.res} />
        </>
      )}
    </div>
  );
}

/* 分析三：多組數字 */
type Entry = { id: number; text: string; hidden: boolean };

function MultiPanel() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState(false);
  const [nextId, setNextId] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);

  const add = (v?: string) => {
    const text = v ?? input;
    if (toPairs(normalizeInput(text)).length === 0) {
      setError(true);
      return;
    }
    setError(false);
    setEntries((e) => [...e, { id: nextId, text, hidden: false }]);
    setNextId((n) => n + 1);
    setInput("");
  };

  const active = entries.filter((e) => !e.hidden);
  const analysed = active.map((e) => ({
    ...e,
    res: analyzePairs(toPairs(normalizeInput(e.text))),
  }));
  const groups = analysed.map((a) =>
    a.res.map((r) => r.effective).filter((s): s is StarName => s !== null),
  );
  const stats = toStats(offsetGroups(groups));

  const copy = async (e: Entry) => {
    try {
      await navigator.clipboard.writeText(e.text);
      setCopied(e.id);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  return (
    <div>
      <Hint>把身分證、手機、車牌、住址等一組一組加進來，依化解口訣互相抵銷後，看最後留下哪些磁場。</Hint>
      <InputRow value={input} onChange={setInput} onSubmit={add} placeholder="輸入一組數字後按新增" button="新增" />
      {error && <div className="mt-4"><Empty>{ERROR}</Empty></div>}

      {entries.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {entries.map((e) => (
            <li
              key={e.id}
              className={`animate-rise flex items-center gap-1 rounded-full border py-1 pl-4 pr-1 transition ${
                e.hidden ? "border-slate-200 bg-slate-50" : "border-good/30 bg-good-soft"
              }`}
            >
              <span
                className={`font-num mr-1 break-all font-bold ${
                  e.hidden ? "text-mute line-through" : "text-good-deep"
                }`}
              >
                {e.text}
              </span>
              <ChipBtn
                label={e.hidden ? "顯示" : "隱藏"}
                onClick={() =>
                  setEntries((list) => list.map((x) => (x.id === e.id ? { ...x, hidden: !x.hidden } : x)))
                }
              >
                {e.hidden ? <EyeIcon /> : <EyeOffIcon />}
              </ChipBtn>
              <ChipBtn label="複製" onClick={() => copy(e)}>
                {copied === e.id ? <CheckIcon /> : <CopyIcon />}
              </ChipBtn>
              <ChipBtn label="刪除" danger onClick={() => setEntries((list) => list.filter((x) => x.id !== e.id))}>
                <CloseIcon />
              </ChipBtn>
            </li>
          ))}
        </ul>
      )}

      {analysed.length > 0 && (
        <>
          <Heading>抵銷後小結</Heading>
          {stats.length === 0 ? (
            <div className="animate-rise rounded-3xl bg-gradient-to-br from-good-soft to-pink-soft p-6 text-center text-xl font-black text-good-deep">
              吉數與凶數全部抵銷
            </div>
          ) : (
            <div className="rounded-3xl border border-line bg-white p-5">
              <StatBars stats={stats} />
            </div>
          )}
          <Heading>各組明細</Heading>
          <div className="space-y-5">
            {analysed.map((a) => (
              <div key={a.id}>
                <p className="font-num mb-2 text-sm font-bold text-mute-dark">{a.text}</p>
                <PairStrip results={a.res} />
              </div>
            ))}
          </div>

          <Heading>數字解說</Heading>
          <PairExplain results={analysed.flatMap((a) => a.res)} />
        </>
      )}
    </div>
  );
}

function ChipBtn({
  children,
  onClick,
  label,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`grid h-7 w-7 place-items-center rounded-full transition ${
        danger ? "text-pink hover:bg-pink/10" : "text-mute-dark hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

const iconProps = {
  width: 15,
  height: 15,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const EyeIcon = () => (
  <svg {...iconProps}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg {...iconProps}>
    <path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3.2M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M2 2l20 20" />
  </svg>
);
const CopyIcon = () => (
  <svg {...iconProps}>
    <rect x="9" y="9" width="12" height="12" rx="2.5" />
    <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
  </svg>
);
const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="M5 12.5 10 17l9-10" />
  </svg>
);
const CloseIcon = () => (
  <svg {...iconProps}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
