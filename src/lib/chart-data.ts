// 內容取自「東方靈數」風格參考圖

export type ChartPair = { nums: [string, string]; note?: string; muted?: boolean };
export type ChartRow = {
  star: string;
  good: boolean;
  title: string;
  desc?: string;
  trait: string;
  pairs: ChartPair[];
};

export const CHART: ChartRow[] = [
  {
    star: "生氣",
    trait: "帶貴人、谷底翻身、逆轉勝",
    good: true,
    title: "貴人",
    desc: "用太多容易懶惰 變胖",
    pairs: [
      { nums: ["14", "41"], note: "功成名就、逆轉勝" },
      { nums: ["67", "76"], note: "多用會貴人轉小人", muted: true },
      { nums: ["39", "93"], note: "自己人爭產" },
      { nums: ["28", "82"], note: "不動產" },
    ],
  },
  {
    star: "天醫",
    trait: "大財運，天生有人送錢",
    good: true,
    title: "大財富",
    desc: "用太多會心血管疾病、變胖",
    pairs: [
      { nums: ["13", "31"], note: "王公貴族 心血管疾病" },
      { nums: ["68", "86"], note: "帶權的財富 地方勢力" },
      { nums: ["49", "94"], note: "奇效 需善良 要修行" },
      { nums: ["27", "72"], note: "不動產 猶豫不決" },
    ],
  },
  {
    star: "延年",
    trait: "守責任、身體健康、守財，適合創業當老闆",
    good: true,
    title: "守財 健康 創業",
    desc: "用太多會變鐵公雞",
    pairs: [
      { nums: ["19", "91"], note: "帝王數" },
      { nums: ["78", "87"] },
      { nums: ["43", "34"], note: "為善破財", muted: true },
      { nums: ["26", "62"] },
    ],
  },
  {
    star: "伏位",
    trait: "蹲著等待時機，會延續並加倍前一組數字的能量（例：3111 加倍天醫）",
    good: true,
    title: "潛伏、等待時機",
    pairs: [
      { nums: ["11", "22"] },
      { nums: ["33", "44"] },
      { nums: ["66", "77"] },
      { nums: ["88", "99"] },
    ],
  },
  {
    star: "絕命",
    trait: "脾氣硬、容易有意外與大起大落",
    good: false,
    title: "波動、意外",
    desc: "我命由我不由天、大哥大姐",
    pairs: [
      { nums: ["12", "21"], note: "意外" },
      { nums: ["69", "96"] },
      { nums: ["48", "84"] },
      { nums: ["37", "73"], note: "筋骨問題" },
    ],
  },
  {
    star: "五鬼",
    trait: "怪事多，容易失眠、焦慮、精神困擾",
    good: false,
    title: "怪事、精神困擾",
    desc: "需要奇思異想的行業、創意、業務",
    pairs: [
      { nums: ["18", "81"], note: "大破財", muted: true },
      { nums: ["79", "97"], note: "喜歡去酒局" },
      { nums: ["24", "42"], note: "兩個女人容易爭執" },
      { nums: ["36", "63"] },
    ],
  },
  {
    star: "六煞",
    trait: "猶豫不決、選擇障礙、停滯不前，易有爛桃花",
    good: false,
    title: "矛盾、爛桃花",
    desc: "適合美業",
    pairs: [
      { nums: ["16", "61"], note: "美女 文筆桃花 靈感" },
      { nums: ["47", "74"], note: "天馬行空" },
      { nums: ["38", "83"], note: "與觀音有緣 易玉石俱焚" },
      { nums: ["29", "92"] },
    ],
  },
  {
    star: "禍害",
    trait: "口舌是非、管不住嘴；後面接吉數可化解",
    good: false,
    title: "口舌",
    desc: "適合嘴巴的行業：餐飲、業務、自媒體、律師、外交",
    pairs: [
      { nums: ["17", "71"], note: "俊男 不動產" },
      { nums: ["89", "98"], note: "喜慶 聚餐" },
      { nums: ["46", "64"] },
      { nums: ["23", "32"], note: "口舌強辯 律師外交" },
    ],
  },
];

export type SpecialNumber = { num: string; title: string; note?: string; wide?: boolean };

export const BUTTERFLY = [
  { nums: "313 414 919", title: "快速有錢飛起來（大老闆）", note: "大老闆用以免撐不起來" },
  { nums: "626 828 868", title: "快速有錢飛起來（上班族）", note: "以免空轉創業前三個月用" },
];

export const YIN_YANG: SpecialNumber[] = [
  { num: "149", title: "純陽之數 天庫 男性氣質", note: "陽剛 正財" },
  { num: "928", title: "極陰之數 地庫 女性氣質", note: "正財偏財 要做善事" },
];

export const SPECIALS: SpecialNumber[] = [
  { num: "419", title: "招貴人", note: "人緣有了 事情就順了" },
  { num: "286", title: "貴人", note: "小確幸 不用發大財" },
  { num: "986", title: "靈魂伴侶", note: "單身很久想找到真愛" },
  { num: "913", title: "平常公務員 一般上班族", note: "要有正職", wide: true },
  { num: "786", title: "健康 中小企業 迷惘新鮮人", note: "78有責任心 自律 去學新技能", wide: true },
  { num: "613", title: "女藝人 作家 編劇 畫畫", note: "花瓶 招桃花 感情充沛" },
  { num: "731", title: "退休沒事幹", note: "沒辦法拿去賭/投資 60歲後再用", wide: true },
  { num: "491", title: "幫助別人找到生命意義", note: "慈善單位 退休後內心空洞用", wide: true },
  { num: "713", title: "男藝人 時尚 口才 音樂", note: "喜歡打理自己" },
  { num: "319", title: "看起來很有錢 但存不了", note: "銀行賬戶就好 車牌手機不要用", wide: true },
  { num: "191", title: "身心平安 出入平安", note: "帝王數" },
  { num: "619", title: "求內心平靜用", note: "愛想太多的人" },
  { num: "369", title: "公務員升官", note: "其他行業不行" },
  { num: "413", title: "求子", note: "招有錢貴人" },
  { num: "168", title: "考試面試樣樣順利", note: "考生升級" },
  { num: "213", title: "創業家 行動力", note: "讓想做的變成正向的事業" },
  { num: "268", title: "婚姻", note: "需要錢 但上有老下有小要照顧" },
];

export const AVOID = [
  { num: "145", note: "絕對不要用！一切化為塵土 只適合出家人" },
  { num: "719", note: "一直罵人，嘴不停" },
];

export const CURES = [
  { good: "天醫", verb: "欺", bad: "絕命", nums: ["13", "31", "68", "86"], more: ["49", "94", "27", "72"] },
  { good: "延年", verb: "壓", bad: "六煞", nums: ["19", "91", "78", "87"], more: ["34", "43", "26", "62"] },
  { good: "生氣", verb: "補", bad: "禍害", nums: ["14", "41", "67", "76"], more: ["39", "93", "28", "82"] },
];

export const TRAITS: Record<string, string> = Object.fromEntries(CHART.map((r) => [r.star, r.trait]));

export type FourDigit = { num: string; title: string; note?: string; parts?: [string, string][] };

export const FOUR_DIGITS: FourDigit[] = [
  { num: "3928", title: "媒體業適合", parts: [["39", "生氣"], ["92", "六煞"], ["28", "生氣"]] },
  { num: "1928", title: "賺到錢", parts: [["19", "延年"], ["92", "六煞"], ["28", "生氣"]] },
  { num: "8213", title: "超強企業家 走鋼索的人", parts: [["82", "生氣"], ["21", "絕命"], ["13", "天醫"]] },
  { num: "9319", title: "想要好數字 改運的人", note: "格局大之人使用" },
  { num: "1498", title: "創業業務", note: "創業業務 靠人緣賺錢 很要社交不然會很累" },
];

// 各數字對的詳細說明（整理自「東方靈數分享版」試算表）
const PAIR_DETAIL: Record<string, string> = {
  "14": "功成名就，帶貴人",
  "67": "用多了容易貴人轉小人",
  "39": "帶貴人、容易有錢，但易有自己人爭產",
  "28": "土地財，容易有自己得來的不動產",
  "13": "財運超旺，天生有人送錢；但容易有心血管疾病",
  "68": "有名聲、有權力，地方角頭",
  "49": "有奇效，只適合善良的人使用；德不配位會直接反轉",
  "27": "容易得到別人的祖產或不動產，但容易有選擇障礙",
  "19": "帝王數",
  "78": "也不錯",
  "34": "天生帶破財",
  "26": "沒什麼特別",
  "12": "容易有莫名其妙的意外",
  "69": "還好",
  "48": "還好",
  "37": "筋骨不好，容易痠痛",
  "79": "愛去酒局，酒國英雄",
  "24": "容易有婆媳之爭",
  "36": "也還好",
  "16": "楚楚可憐的漂亮女生，文采好、有文筆桃花",
  "47": "天馬行空，愛說大家覺得做不到的事",
  "38": "與觀音有緣；平常很能忍，被逼到極限會玉石俱焚",
  "29": "沒什麼威脅性，平平的",
  "17": "多為俊男美女，容易得到不動產或祖產",
  "89": "有喜慶的意思，歡樂豐滿",
  "46": "純禍害",
  "23": "容易跟人對尬而且吵不贏，適合律師",
};

export type PairInfo = { star: string; good: boolean; note?: string; detail?: string; muted?: boolean };

const PAIR_INFO: Record<string, PairInfo> = {};
for (const row of CHART) {
  for (const p of row.pairs) {
    for (const n of p.nums) {
      if (row.star === "伏位") continue;
      PAIR_INFO[n] = {
        star: row.star,
        good: row.good,
        note: p.note,
        muted: p.muted,
        detail: PAIR_DETAIL[n] ?? PAIR_DETAIL[n[1] + n[0]],
      };
    }
  }
}

export function pairInfo(pair: string): PairInfo | null {
  if (PAIR_INFO[pair]) return PAIR_INFO[pair];
  if (pair[0] === pair[1]) return { star: "伏位", good: true, detail: TRAITS["伏位"] };
  return null;
}
