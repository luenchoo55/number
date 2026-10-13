// 東方靈數計算邏輯

export type StarName =
  | "生氣"
  | "天醫"
  | "延年"
  | "伏位"
  | "絕命"
  | "五鬼"
  | "六煞"
  | "禍害";

export const GOOD_STARS: StarName[] = ["生氣", "天醫", "延年", "伏位"];
export const BAD_STARS: StarName[] = ["絕命", "五鬼", "六煞", "禍害"];

const STAR_PAIRS: Record<StarName, string[]> = {
  生氣: ["14", "41", "67", "76", "39", "93", "28", "82"],
  天醫: ["13", "31", "68", "86", "49", "94", "27", "72"],
  延年: ["19", "91", "78", "87", "34", "43", "26", "62"],
  伏位: ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99"],
  絕命: ["12", "21", "69", "96", "48", "84", "37", "73"],
  五鬼: ["18", "81", "79", "97", "24", "42", "36", "63"],
  六煞: ["16", "61", "47", "74", "38", "83", "29", "92"],
  禍害: ["17", "71", "89", "98", "46", "64", "23", "32"],
};

const PAIR_TO_STAR: Record<string, StarName> = Object.fromEntries(
  (Object.keys(STAR_PAIRS) as StarName[]).flatMap((star) =>
    STAR_PAIRS[star].map((pair) => [pair, star]),
  ),
);

export function isGood(star: string) {
  return (GOOD_STARS as string[]).includes(star);
}

export function starOf(pair: string): StarName | null {
  return PAIR_TO_STAR[pair] ?? null;
}

/** 英文字母轉兩位數 (A=01 … Z=26)，其他非數字符號略過 */
export function normalizeInput(value: string): string {
  let out = "";
  for (const ch of value) {
    if (ch >= "0" && ch <= "9") {
      out += ch;
      continue;
    }
    const code = ch.toLowerCase().charCodeAt(0) - 96;
    if (code >= 1 && code <= 26) out += String(code).padStart(2, "0");
  }
  return out;
}

/** 頭尾的 5，以及緊鄰 0 的 5 視為 0 */
function applyFiveToZero(digits: string[]): string[] {
  const d = [...digits];
  for (let i = 0; i < d.length && d[i] === "5"; i++) d[i] = "0";
  for (let i = d.length - 1; i >= 0 && d[i] === "5"; i--) d[i] = "0";
  for (let i = 0; i < d.length; i++) {
    if (d[i] !== "5") continue;
    const prev = i > 0 ? d[i - 1] : null;
    let next = "0";
    for (let j = i + 1; j < d.length; j++) {
      if (d[j] !== "5") {
        next = d[j];
        break;
      }
    }
    if (prev === "0" || next === "0") d[i] = "0";
  }
  return d;
}

/** 0 化空：開頭的 0 取第一個非 0 數字，中間的 0 延續前一個數字 */
function applyZero(digits: string[]): string[] {
  const d = [...digits];
  const first = d.find((x) => x !== "0");
  if (first === undefined) return d;
  let last = first;
  for (let i = 0; i < d.length; i++) {
    if (d[i] === "0") d[i] = last;
    else last = d[i];
  }
  return d;
}

/** 5 過渡強化：中間的 5 展開為「前一碼、後一碼」交替 */
function expandFive(digits: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < digits.length; i++) {
    if (digits[i] !== "5") {
      out.push(digits[i]);
      continue;
    }
    const prev = digits[i - 1];
    let j = i;
    while (j < digits.length && digits[j] === "5") j++;
    const next = digits[j];
    const runs = j - i;
    for (let k = 0; k <= runs; k++) {
      if (k > 0) out.push(prev);
      if (k !== runs) out.push(next);
    }
    i = j - 1;
  }
  return out;
}

/** 數字串 → 兩兩一組的數字對 */
export function toPairs(numeric: string): string[] {
  if (numeric.length < 2) return [];
  const digits = expandFive(applyZero(applyFiveToZero(numeric.split(""))));
  const pairs: string[] = [];
  for (let i = 0; i < digits.length - 1; i++) pairs.push(digits[i] + digits[i + 1]);
  return pairs;
}

export type PairResult = {
  pair: string;
  /** 數字本身的磁場 */
  raw: StarName | null;
  /** 伏位延續前一個磁場後的實際能量 */
  effective: StarName | null;
  /** 是否由伏位延續而來 */
  inherited: boolean;
};

export function analyzePairs(pairs: string[]): PairResult[] {
  let prev: StarName = "伏位";
  return pairs.map((pair) => {
    const raw = starOf(pair);
    if (raw === "伏位") {
      return { pair, raw, effective: prev, inherited: prev !== "伏位" };
    }
    if (raw) prev = raw;
    return { pair, raw, effective: raw, inherited: false };
  });
}

export type Stat = { star: string; count: number; percent: number };

export function countStars(results: PairResult[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of results) {
    const key = r.effective ?? "ＸＸ";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export function toStats(counts: Record<string, number>): Stat[] {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .filter(([, c]) => c > 0)
    .map(([star, count]) => ({ star, count, percent: total ? count / total : 0 }))
    .sort((a, b) => b.count - a.count);
}

const STAGES = [
  "0~10歲",
  "11~15歲",
  "16~20歲",
  "21~25歲",
  "26~30歲",
  "31~35歲",
  "36~40歲",
  "41~45歲",
  "46~50歲",
  "51~70歲",
  "71~90歲",
  "91~110歲",
  "111~130歲",
];
const LATE_STAGES = [
  "51~60歲",
  "61~70歲",
  "71~80歲",
  "81~90歲",
  "91~100歲",
  "101~110歲",
  "111~120歲",
  "121~130歲",
];

export function stageOf(index: number, total: number): string {
  if (index > 8 && total > 10) return LATE_STAGES[index - 9] ?? "—";
  return STAGES[index] ?? "—";
}

/** 多組數字吉凶互抵：生氣+天醫+延年 化五鬼；天醫欺絕命；延年壓六煞；生氣補禍害 */
export function offsetGroups(groups: StarName[][]): Record<string, number> {
  const seqs = groups.map((g) => [...g]);
  const counts: Record<string, number> = {};
  for (const s of seqs) for (const n of s) counts[n] = (counts[n] ?? 0) + 1;

  let ghosts = counts["五鬼"] ?? 0;
  for (let g = 0; g < seqs.length && ghosts > 0; g++) {
    const s = seqs[g];
    for (let i = 0; i < s.length - 2 && ghosts > 0; i++) {
      if (s[i] === "生氣" && s[i + 1] === "天醫" && s[i + 2] === "延年") {
        s.splice(i, 3);
        counts["生氣"]--;
        counts["天醫"]--;
        counts["延年"]--;
        counts["五鬼"]--;
        ghosts--;
        i--;
      }
    }
  }

  const cures: [StarName, StarName][] = [
    ["禍害", "生氣"],
    ["六煞", "延年"],
    ["絕命", "天醫"],
  ];
  for (const [bad, good] of cures) {
    for (let g = 0; g < seqs.length && (counts[bad] ?? 0) > 0; g++) {
      const s = seqs[g];
      for (let i = 0; i < s.length && counts[bad] > 0; i++) {
        if (s[i] === good) {
          s.splice(i, 1);
          counts[good]--;
          counts[bad]--;
          i--;
        }
      }
    }
  }
  return counts;
}
