import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const VERSION = "20260607-voicevox-v1";
const DEFAULT_ENGINE = "http://127.0.0.1:50021";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const voiceRoot = path.join(appRoot, "assets", "audio", "voice");
const manifestPath = path.join(voiceRoot, "voice_manifest.json");

const args = new Set(process.argv.slice(2));
const manifestOnly = args.has("--manifest-only");
const force = args.has("--force");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Math.max(1, Number(limitArg.split("=")[1])) : null;
const idsArg = process.argv.find((arg) => arg.startsWith("--ids="));
const selectedIds = idsArg ? new Set(idsArg.slice("--ids=".length).split(",").map((id) => id.trim()).filter(Boolean)) : null;
const engineArg = process.argv.find((arg) => arg.startsWith("--engine="));
const engineBase = engineArg ? engineArg.slice("--engine=".length) : DEFAULT_ENGINE;

const SPEAKER_ROLES = {
  miyu: [
    { name: "春日部つむぎ", style: "ノーマル" },
    { name: "四国めたん", style: "ノーマル" },
  ],
  kazuki: [
    { name: "白上虎太郎", style: "ふつう" },
    { name: "玄野武宏", style: "ノーマル" },
  ],
  itsuki: [
    { name: "ずんだもん", style: "ノーマル" },
    { name: "春日部つむぎ", style: "ノーマル" },
  ],
  narrator: [
    { name: "四国めたん", style: "ノーマル" },
    { name: "もち子さん", style: "ノーマル" },
  ],
  support: [
    { name: "雨晴はう", style: "ノーマル" },
    { name: "冥鳴ひまり", style: "ノーマル" },
  ],
  boss: [
    { name: "青山龍星", style: "ノーマル" },
    { name: "波音リツ", style: "ノーマル" },
  ],
};

const CHARACTER_LINES = {
  miyu: {
    select: ["みゆ、いくよ！", "いちご、いっぱい集めよう！", "まかせて、がんばるね！"],
    start: ["出発だよ！", "温室へ、しゅっぱつ！", "いちご大冒険、スタート！"],
    jump: ["えいっ！", "ぴょん！", "とどくかな！"],
    dash: ["いそげいそげ！", "ビューン！", "追い風だよ！"],
    throw: ["いちごショット！", "それっ！", "当たって！"],
    berry: ["やった、いちご！", "ひとつゲット！", "いい感じ！"],
    combo: ["コンボだよ！", "どんどんいこう！", "リズムいいね！"],
    heal: ["ラーメンで回復！", "元気出たよ！", "あったまるね！"],
    power: ["スター、きらきら！", "今なら平気！", "無敵だよ！"],
    bomb: ["みんなで、ボム！", "ストロベリーボム！", "三人でいくよ！"],
    damage: ["いてっ、でも平気！", "あぶなかった！", "まだいけるよ！"],
    clear: ["ステージクリア！", "やったね！", "次の温室へ行こう！"],
    gameover: ["少し休んで、もう一回！", "次はきっと行けるよ！", "チェックポイントから行こう！"],
  },
  kazuki: {
    select: ["かずき、走るよ！", "スピードならまかせて！", "すばやく行こう！"],
    start: ["一気に行くよ！", "走って突破だ！", "スタートダッシュ！"],
    jump: ["ほっ！", "ジャンプ！", "飛びこえるよ！"],
    dash: ["加速するよ！", "もっと速く！", "抜けた！"],
    throw: ["いちご、投げるよ！", "そこだ！", "ショット！"],
    berry: ["いちご取った！", "ナイス収穫！", "次も取ろう！"],
    combo: ["コンボ続いてる！", "流れがいいよ！", "このまま行こう！"],
    heal: ["ラーメン助かる！", "回復できた！", "よし、元気！"],
    power: ["スター来た！", "今なら突っ切れる！", "無敵で行くよ！"],
    bomb: ["三人で突破！", "ボム、発動！", "一気に片づけるよ！"],
    damage: ["うわっ、平気！", "まだ走れる！", "立て直すよ！"],
    clear: ["クリア成功！", "走り切った！", "次もこの調子！"],
    gameover: ["作戦を変えよう！", "次はタイミングを見るよ！", "もう一回走ろう！"],
  },
  itsuki: {
    select: ["いつき、ジャンプするよ！", "高く飛ぶよ！", "元気に行こう！"],
    start: ["ぼくも行く！", "ぴょんぴょん進もう！", "冒険スタート！"],
    jump: ["ぴょーん！", "高く飛ぶよ！", "よいしょ！"],
    dash: ["急ぐよ！", "がんばって走る！", "すいすい行くよ！"],
    throw: ["いちご、ぽいっ！", "えいっ！", "当たれー！"],
    berry: ["いちご見つけた！", "取れたよ！", "うれしい！"],
    combo: ["つながった！", "もっと集めよう！", "調子いいよ！"],
    heal: ["ラーメンだ！", "元気もりもり！", "回復したよ！"],
    power: ["スターだ！", "きらきらだよ！", "強くなった！"],
    bomb: ["みんな、集まって！", "ボムいくよ！", "三人なら強いよ！"],
    damage: ["わっ、びっくり！", "まだ大丈夫！", "落ち着いて行くよ！"],
    clear: ["クリアできた！", "やったやった！", "次も飛びこえよう！"],
    gameover: ["ちょっと休憩！", "次はうまく飛ぶよ！", "もう一回やってみよう！"],
  },
};

const EVENT_DEFAULTS = {
  "character.select": { priority: 3, cooldownSec: 1.4, weight: 1 },
  "character.start": { priority: 4, cooldownSec: 3.5, weight: 1 },
  "action.jump": { priority: 1, cooldownSec: 5.5, weight: 0.16 },
  "action.dash": { priority: 1, cooldownSec: 6.5, weight: 0.14 },
  "action.throw": { priority: 1, cooldownSec: 5.5, weight: 0.16 },
  "item.berry": { priority: 1, cooldownSec: 6.0, weight: 0.15 },
  "item.combo": { priority: 2, cooldownSec: 4.0, weight: 0.4 },
  "item.heal": { priority: 5, cooldownSec: 2.0, weight: 1 },
  "item.power": { priority: 5, cooldownSec: 2.0, weight: 1 },
  "bomb.activate": { priority: 8, cooldownSec: 8.0, weight: 1 },
  "player.damage": { priority: 5, cooldownSec: 4.0, weight: 0.75 },
  "stage.clear": { priority: 7, cooldownSec: 5.0, weight: 1 },
  "game.over": { priority: 8, cooldownSec: 5.0, weight: 1 },
  "ui.title": { priority: 2, cooldownSec: 25.0, weight: 1 },
  "stage.start": { priority: 6, cooldownSec: 3.0, weight: 1 },
  "boss.appear": { priority: 6, cooldownSec: 7.0, weight: 1 },
  "boss.defeat": { priority: 7, cooldownSec: 5.0, weight: 1 },
  "rush.start": { priority: 6, cooldownSec: 4.0, weight: 1 },
  "rush.end": { priority: 7, cooldownSec: 4.0, weight: 1 },
  "goal.blocked": { priority: 4, cooldownSec: 6.0, weight: 0.6 },
  "final.clear": { priority: 9, cooldownSec: 10.0, weight: 1 },
  "ui.mode": { priority: 2, cooldownSec: 1.8, weight: 0.55 },
  "ui.voice": { priority: 2, cooldownSec: 1.0, weight: 1 },
};

const STAGES = [
  "あさつゆ温室",
  "水の温室",
  "夕やけ庭",
  "ハチのトンネル",
  "にじ雲ガーデン",
  "ランタン迷路",
  "泡の運河",
  "氷の温室",
  "どんぐりリフト",
  "星の城",
];

const SYSTEM_LINES = [
  ...["みんなのいちご大冒険！", "いちご園へようこそ！", "今日はだれと冒険する？", "音が出るよ、準備してね！"].map((text, i) =>
    systemLine("ui.title", "narrator", "system/title", `ui_title_${i + 1}`, text)
  ),
  systemLine("ui.mode", "narrator", "system/ui", "ui_mode_campaign_1", "十ステージ冒険だよ。"),
  systemLine("ui.mode", "narrator", "system/ui", "ui_mode_rush_1", "いちごラッシュに挑戦だよ。"),
  systemLine("ui.voice", "support", "system/ui", "ui_voice_on_1", "ボイス、オン。"),
  systemLine("ui.voice", "support", "system/ui", "ui_voice_on_2", "声もいっしょに楽しんでね。"),
  ...STAGES.map((name, i) =>
    systemLine("stage.start", "narrator", "system/stage", `stage_${String(i + 1).padStart(2, "0")}_intro_1`, `ステージ${i + 1}、${name}。`)
  ),
  ...[
    "ボスが近いよ、気をつけて。",
    "強敵出現。落ち着いていこう。",
    "攻撃のタイミングを見よう。",
    "ここが勝負どころだよ。",
    "あせらず、すき間を見て。",
  ].map((text, i) => systemLine("boss.appear", i === 0 ? "boss" : "narrator", "system/boss", `boss_appear_${i + 1}`, text)),
  ...[
    "ボス撃破！",
    "やった、道が開いたよ。",
    "強敵クリア。ゴールへ進もう。",
    "ナイスファイト！",
  ].map((text, i) => systemLine("boss.defeat", "narrator", "system/boss", `boss_defeat_${i + 1}`, text)),
  systemLine("rush.start", "narrator", "system/rush", "rush_start_1", "ラッシュ開始。走り続けよう。"),
  systemLine("rush.start", "support", "system/rush", "rush_start_2", "どこまで行けるかな。"),
  systemLine("rush.end", "support", "system/rush", "rush_end_1", "ラッシュ終了。おつかれさま。"),
  systemLine("rush.end", "narrator", "system/rush", "rush_end_2", "記録を確認しよう。"),
  systemLine("goal.blocked", "support", "system/goal", "goal_blocked_1", "いちごをもう少し集めよう。"),
  systemLine("goal.blocked", "narrator", "system/goal", "goal_blocked_2", "ボスと収穫を確認してね。"),
  systemLine("final.clear", "narrator", "system/final", "final_clear_1", "全ステージクリア。おめでとう！"),
  systemLine("final.clear", "support", "system/final", "final_clear_2", "三人で、走りきったね。"),
  systemLine("final.clear", "miyu", "system/final", "final_clear_3", "いちごトレイ、きらきらいっぱい！"),
  systemLine("final.clear", "kazuki", "system/final", "final_clear_4", "最高の冒険だったね！"),
];

const EVENT_NAME_MAP = {
  select: "character.select",
  start: "character.start",
  jump: "action.jump",
  dash: "action.dash",
  throw: "action.throw",
  berry: "item.berry",
  combo: "item.combo",
  heal: "item.heal",
  power: "item.power",
  bomb: "bomb.activate",
  damage: "player.damage",
  clear: "stage.clear",
  gameover: "game.over",
};

function createPlan() {
  const lines = [];
  for (const [characterId, groups] of Object.entries(CHARACTER_LINES)) {
    for (const [group, texts] of Object.entries(groups)) {
      const event = EVENT_NAME_MAP[group];
      texts.forEach((text, index) => {
        const stem = `${characterId}_${group}_${String(index + 1).padStart(2, "0")}`;
        lines.push({
          id: stem,
          event,
          characterId,
          role: characterId,
          category: `${characterId}/${group}`,
          file: `assets/audio/voice/${characterId}/${group}/${stem}.wav`,
          text,
          ...paramsFor(event, index),
        });
      });
    }
  }
  lines.push(...SYSTEM_LINES);
  return lines.map((line) => ({
    ...line,
    speakerName: null,
    speakerStyle: null,
    speakerId: null,
    durationSec: null,
    peak: null,
    generated: false,
  }));
}

function systemLine(event, role, category, stem, text) {
  return {
    id: stem,
    event,
    characterId: role === "miyu" || role === "kazuki" || role === "itsuki" ? role : "system",
    role,
    category,
    file: `assets/audio/voice/${category}/${stem}.wav`,
    text,
    ...paramsFor(event, 0),
  };
}

function paramsFor(event, index) {
  const base = EVENT_DEFAULTS[event] ?? { priority: 2, cooldownSec: 3, weight: 0.5 };
  const speed = [1.0, 0.96, 1.04][index % 3] ?? 1.0;
  const intonation = [0.96, 1.0, 0.92][index % 3] ?? 0.96;
  return {
    priority: base.priority,
    cooldownSec: base.cooldownSec,
    weight: base.weight,
    speedScale: speed,
    pitchScale: 0,
    intonationScale: intonation,
    volumeScale: event.includes("damage") || event.includes("game") ? 0.86 : 0.92,
    prePhonemeLength: 0.06,
    postPhonemeLength: 0.08,
  };
}

function apiUrl(pathname, params = {}) {
  const base = engineBase.endsWith("/") ? engineBase : `${engineBase}/`;
  const url = new URL(pathname.replace(/^\//, ""), base);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
  }
  return response.json();
}

async function fetchBuffer(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function resolveSpeakers(speakers) {
  const resolved = {};
  for (const [role, candidates] of Object.entries(SPEAKER_ROLES)) {
    for (const candidate of candidates) {
      const speaker = speakers.find((entry) => entry.name === candidate.name);
      if (!speaker) {
        continue;
      }
      const style = speaker.styles.find((entry) => entry.name === candidate.style)
        ?? speaker.styles.find((entry) => entry.name.includes(candidate.style))
        ?? speaker.styles[0];
      if (style) {
        resolved[role] = {
          speakerName: speaker.name,
          speakerStyle: style.name,
          speakerId: style.id,
        };
        break;
      }
    }
  }
  return resolved;
}

async function synthesizeLine(line, speaker) {
  const query = await fetchJson(apiUrl("audio_query", { text: line.text, speaker: speaker.speakerId }), { method: "POST" });
  query.speedScale = line.speedScale;
  query.pitchScale = line.pitchScale;
  query.intonationScale = line.intonationScale;
  query.volumeScale = line.volumeScale;
  query.prePhonemeLength = line.prePhonemeLength;
  query.postPhonemeLength = line.postPhonemeLength;

  const wav = await fetchBuffer(apiUrl("synthesis", { speaker: speaker.speakerId }), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  return wav;
}

function readWavStats(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") {
    throw new Error("not a RIFF/WAVE file");
  }
  let offset = 12;
  let channels = 1;
  let sampleRate = 24000;
  let bitsPerSample = 16;
  let dataOffset = null;
  let dataSize = null;
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (id === "fmt ") {
      channels = buffer.readUInt16LE(start + 2);
      sampleRate = buffer.readUInt32LE(start + 4);
      bitsPerSample = buffer.readUInt16LE(start + 14);
    } else if (id === "data") {
      dataOffset = start;
      dataSize = size;
    }
    offset = start + size + (size % 2);
  }
  if (dataOffset == null || dataSize == null) {
    throw new Error("missing data chunk");
  }
  const bytesPerSecond = sampleRate * channels * (bitsPerSample / 8);
  let peak = 0;
  if (bitsPerSample === 16) {
    for (let i = dataOffset; i + 1 < dataOffset + dataSize; i += 2) {
      peak = Math.max(peak, Math.abs(buffer.readInt16LE(i)) / 32768);
    }
  }
  return {
    durationSec: Number((dataSize / bytesPerSecond).toFixed(3)),
    peak: Number(peak.toFixed(4)),
  };
}

async function writeManifest(data) {
  await mkdir(voiceRoot, { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function main() {
  const planned = createPlan();
  if (manifestOnly) {
    await writeManifest({
      version: VERSION,
      generatedAt: new Date().toISOString(),
      engine: null,
      status: "manifest-only",
      note: "VOICEVOX Engineが起動していない状態で作成した計画manifestです。WAV生成後はclipsに実ファイル情報が入ります。",
      clips: [],
      plannedClips: planned,
    });
    console.log(`planned ${planned.length} voice clips -> ${manifestPath}`);
    return;
  }

  const version = await fetchJson(apiUrl("version"));
  const speakers = await fetchJson(apiUrl("speakers"));
  const resolved = resolveSpeakers(speakers);
  const missingRoles = [...new Set(planned.map((line) => line.role))]
    .filter((role) => !resolved[role]);
  if (missingRoles.length > 0) {
    throw new Error(`話者を解決できませんでした: ${missingRoles.join(", ")}`);
  }

  const scopedPlan = selectedIds ? planned.filter((line) => selectedIds.has(line.id)) : planned;
  if (selectedIds && scopedPlan.length !== selectedIds.size) {
    const found = new Set(scopedPlan.map((line) => line.id));
    const missing = [...selectedIds].filter((id) => !found.has(id));
    throw new Error(`Unknown clip id: ${missing.join(", ")}`);
  }
  const target = limit ? scopedPlan.slice(0, limit) : scopedPlan;
  const generated = [];
  for (const line of target) {
    const speaker = resolved[line.role];
    const outputPath = path.join(appRoot, line.file);
    await mkdir(path.dirname(outputPath), { recursive: true });
    let wav;
    if (!force && existsSync(outputPath)) {
      wav = await readFile(outputPath);
    } else {
      wav = await synthesizeLine(line, speaker);
      await writeFile(outputPath, wav);
    }
    const stats = readWavStats(wav);
    generated.push({
      ...line,
      ...speaker,
      durationSec: stats.durationSec,
      peak: stats.peak,
      generated: true,
    });
    console.log(`${generated.length}/${target.length} ${line.id} ${stats.durationSec}s peak=${stats.peak}`);
  }

  const generatedIds = new Set(generated.map((line) => line.id));
  await writeManifest({
    version: VERSION,
    generatedAt: new Date().toISOString(),
    engine: { endpoint: engineBase, version },
    status: limit || selectedIds ? "partial" : "generated",
    clips: generated,
    plannedClips: planned.filter((line) => !generatedIds.has(line.id)),
    speakerResolution: resolved,
  });
  console.log(`generated ${generated.length} voice clips -> ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.message);
  console.error("VOICEVOX Engineを起動してから再実行してください。計画manifestだけ作る場合は --manifest-only を指定します。");
  process.exit(1);
});
