const CONFIG = {
  width: 960,
  height: 540,
  groundY: 430,
  stageLength: 5800,
  maxPixelRatio: 2,
  gravity: 1800,
  jumpVelocity: -710,
  moveAccelGround: 2450,
  moveAccelAir: 1600,
  frictionGround: 2500,
  maxRunSpeed: 260,
  maxDashSpeed: 418,
  dashAccelBonus: 980,
  comboWindowMs: 2500,
  invulnerableSeconds: 1.2,
  maxHp: 3,
  powerDuration: 6.8,
  bombDuration: 20,
  bombSpeedMultiplier: 1.45,
  bombFlightAccel: 980,
  bombHoverGravityScale: 0.18,
  bombMusicRate: 1.22,
  bombExplosionRadius: 420,
  bombScoreAttackBerryBurst: 30,
  bombCutinDuration: 2.3,
  bombStarBonusSeconds: 10,
  bombFlightTopMargin: 12,
  stageClearBerryRate: 0.5,
  clearDelay: 1.7,
  gameOverDelay: 1.9,
  cameraLead: 158,
  throwCooldown: 0.34,
  projectileSpeed: 560,
  projectileLift: -120,
  projectileGravity: 240,
  stompBounceVelocity: -420,
  stompScore: 180,
  projectileScore: 140,
  powerScore: 120,
  ramenScore: 80,
  bossHitScore: 90,
  bossClearScore: 900,
  playerScale: 0.5,
  titlePlayerScale: 0.56,
  afterimageScale: 0.48,
  stagePar: {
    far: 0.16,
    mid: 0.38,
    near: 0.72,
  },
  storageKeyBestScore: "miyu_strawberry_adventure_best_score",
  storageKeyScoreAttackScores: "miyu_strawberry_adventure_score_attack_top5",
  scoreAttackTopLimit: 5,
  scoreAttackInitialLength: 4200,
  scoreAttackChunkWidth: 860,
  scoreAttackGenerateAhead: 2700,
  scoreAttackBossMinGap: 2500,
  scoreAttackBossMaxGap: 3900,
};

const ASSET_MANIFEST = {
  images: {
    hero: "assets/images/miyu_character_sheet_v2_clean.png",
    kazukiHero: "assets/images/kazuki_character_sheet_v1_clean.png",
    itsukiHero: "assets/images/itsuki_character_sheet_v1_clean.png",
    guide: "assets/images/miyu_character_guide.png",
    kazukiGuide: "assets/images/kazuki_character_guide.png",
    itsukiGuide: "assets/images/itsuki_character_guide.png",
    strawberryCollectible: "assets/images/strawberry_collectible_v2.png",
    strawberryProjectile: "assets/images/strawberry_projectile_v2.png",
    bugEnemy: "assets/images/bug_enemy_v2.png",
    ramenItem: "assets/images/ramen_item_v1.png",
    starItem: "assets/images/invincible_star_v1.png",
    bossLadybug: "assets/images/boss_ladybug_v1.png",
    bossFrog: "assets/images/boss_frog_v1.png",
    bossBeetle: "assets/images/boss_beetle_v1.png",
    backgroundFar: "assets/generated/background_far.png",
    backgroundMid: "assets/generated/background_mid.png",
    groundTiles: "assets/generated/ground_tiles.png",
    uiPanel: "assets/generated/ui_panel.png",
  },
  audio: {
    bgm: "assets/audio/bgm.mp3",
    stage1: "assets/audio/bgm.mp3",
    stage2: "assets/audio/bgm_options/bgm_04.mp3",
    stage3: "assets/audio/bgm_options/bgm_03.mp3",
    stage4: "assets/audio/bgm_options/bgm_01.mp3",
    stage5: "assets/audio/bgm_options/bgm_04.mp3",
    scoreAttack: "assets/audio/bgm_options/bgm_01.mp3",
  },
};

function expandedFrame([x, y, w, h], options = {}) {
  const left = options.left ?? options.padX ?? 8;
  const right = options.right ?? options.padX ?? 8;
  const top = options.top ?? options.padTop ?? 8;
  const bottom = options.bottom ?? options.padBottom ?? 5;
  const outX = x - left;
  const outY = y - top;
  const outW = w + left + right;
  const outH = h + top + bottom;
  return {
    x: outX,
    y: outY,
    w: outW,
    h: outH,
    anchorX: options.anchorX ?? Math.round(outW / 2),
    anchorY: options.anchorY ?? Math.max(0, outH - (options.footInset ?? 5)),
    frameHold: options.frameHold ?? 1,
  };
}

function frameSequence(boxes, options) {
  return boxes.map((box) => expandedFrame(box, options));
}

const SPRITE_ATLAS = {
  idle: [expandedFrame([171, 16, 125, 252], { padX: 6, padTop: 6, padBottom: 2, anchorX: 66, anchorY: 250 })],
  runRight: [
    expandedFrame([518, 28, 172, 232], { padX: 6, padTop: 6, padBottom: 2, anchorX: 84, anchorY: 230 }),
    expandedFrame([915, 30, 179, 234], { padX: 6, padTop: 6, padBottom: 2, anchorX: 92, anchorY: 230 }),
  ],
  runLeft: [
    expandedFrame([518, 28, 172, 232], { padX: 6, padTop: 6, padBottom: 2, anchorX: 84, anchorY: 230 }),
    expandedFrame([915, 30, 179, 234], { padX: 6, padTop: 6, padBottom: 2, anchorX: 92, anchorY: 230 }),
  ],
  dashRight: [
    expandedFrame([915, 30, 179, 234], { padX: 6, padTop: 6, padBottom: 2, anchorX: 92, anchorY: 230 }),
    expandedFrame([1263, 40, 257, 219], { left: 10, right: 10, top: 6, bottom: 4, anchorX: 180, anchorY: 214 }),
  ],
  dashLeft: [
    expandedFrame([915, 30, 179, 234], { padX: 6, padTop: 6, padBottom: 2, anchorX: 92, anchorY: 230 }),
    expandedFrame([1263, 40, 257, 219], { left: 10, right: 10, top: 6, bottom: 4, anchorX: 180, anchorY: 214 }),
  ],
  jump: [expandedFrame([154, 283, 167, 234], { padX: 6, padTop: 6, padBottom: 2, anchorX: 84, anchorY: 228 })],
  pick: [expandedFrame([525, 320, 165, 208], { padX: 6, padTop: 6, padBottom: 2, anchorX: 82, anchorY: 202 })],
  point: [expandedFrame([509, 567, 185, 280], { padX: 6, padTop: 6, padBottom: 2, anchorX: 92, anchorY: 276 })],
  peace: [expandedFrame([167, 569, 146, 280], { padX: 6, padTop: 6, padBottom: 2, anchorX: 73, anchorY: 276 })],
  tray: [expandedFrame([1326, 565, 135, 283], { padX: 6, padTop: 6, padBottom: 2, anchorX: 67, anchorY: 279 })],
  cheer: [expandedFrame([913, 560, 164, 290], { padX: 6, padTop: 6, padBottom: 2, anchorX: 82, anchorY: 286 })],
  damageSmall: [expandedFrame([905, 288, 169, 247], { padX: 6, padTop: 6, padBottom: 2, anchorX: 84, anchorY: 242 })],
  down: [expandedFrame([1227, 427, 356, 108], { padX: 6, padTop: 6, padBottom: 2, anchorX: 178, anchorY: 104 })],
  wakeUp: frameSequence(
    [
      [1227, 427, 356, 108],
      [905, 288, 169, 247],
      [171, 16, 125, 252],
    ],
    { padX: 6, padTop: 6, padBottom: 2 }
  ),
};

function frameFromBounds([x1, y1, x2, y2], options = {}) {
  return expandedFrame([x1, y1, x2 - x1, y2 - y1], {
    padX: options.padX ?? 8,
    padTop: options.padTop ?? 8,
    padBottom: options.padBottom ?? 4,
    anchorX: options.anchorX,
    anchorY: options.anchorY,
    footInset: options.footInset ?? 3,
  });
}

const KAZUKI_ATLAS = {
  idle: [frameFromBounds([117, 54, 266, 350])],
  runRight: [frameFromBounds([397, 67, 608, 350]), frameFromBounds([764, 67, 978, 341])],
  runLeft: [frameFromBounds([397, 67, 608, 350]), frameFromBounds([764, 67, 978, 341])],
  dashRight: [frameFromBounds([764, 67, 978, 341]), frameFromBounds([1073, 89, 1387, 342])],
  dashLeft: [frameFromBounds([764, 67, 978, 341]), frameFromBounds([1073, 89, 1387, 342])],
  jump: [frameFromBounds([1478, 39, 1638, 295])],
  pick: [frameFromBounds([63, 496, 302, 744])],
  point: [frameFromBounds([1213, 444, 1392, 762])],
  peace: [frameFromBounds([999, 448, 1159, 767])],
  tray: [frameFromBounds([1506, 460, 1648, 768])],
  cheer: [frameFromBounds([1478, 39, 1638, 295])],
  damageSmall: [frameFromBounds([410, 474, 597, 747])],
  down: [frameFromBounds([645, 627, 930, 752], { padBottom: 8 })],
  wakeUp: [frameFromBounds([645, 627, 930, 752]), frameFromBounds([410, 474, 597, 747]), frameFromBounds([117, 54, 266, 350])],
};

const ITSUKI_ATLAS = {
  idle: [frameFromBounds([140, 29, 281, 297])],
  runRight: [frameFromBounds([401, 22, 608, 292]), frameFromBounds([717, 24, 932, 291])],
  runLeft: [frameFromBounds([401, 22, 608, 292]), frameFromBounds([717, 24, 932, 291])],
  dashRight: [frameFromBounds([717, 24, 932, 291]), frameFromBounds([1049, 26, 1380, 290])],
  dashLeft: [frameFromBounds([717, 24, 932, 291]), frameFromBounds([1049, 26, 1380, 290])],
  jump: [frameFromBounds([1462, 18, 1649, 275])],
  pick: [frameFromBounds([125, 326, 369, 557])],
  point: [frameFromBounds([1421, 308, 1620, 581])],
  peace: [frameFromBounds([1102, 306, 1274, 581])],
  tray: [frameFromBounds([792, 576, 965, 867])],
  cheer: [frameFromBounds([536, 582, 736, 867])],
  damageSmall: [frameFromBounds([481, 317, 660, 569])],
  down: [frameFromBounds([751, 393, 1038, 553], { padBottom: 8 })],
  wakeUp: [frameFromBounds([751, 393, 1038, 553]), frameFromBounds([481, 317, 660, 569]), frameFromBounds([140, 29, 281, 297])],
};

const CHARACTERS = [
  {
    id: "miyu",
    name: "みゆちゃん",
    shortName: "みゆ",
    imageKey: "hero",
    guideKey: "guide",
    atlas: SPRITE_ATLAS,
    scaleFactor: 1,
    titleScaleFactor: 1,
    color: "#c8b8ff",
    description: "バランス型",
    stats: { maxRunSpeed: 260, maxDashSpeed: 418, dashAccelBonus: 980, jumpVelocity: -710 },
  },
  {
    id: "kazuki",
    name: "かずきくん",
    shortName: "かずき",
    imageKey: "kazukiHero",
    guideKey: "kazukiGuide",
    atlas: KAZUKI_ATLAS,
    scaleFactor: 0.9,
    titleScaleFactor: 0.88,
    color: "#5f79b6",
    description: "すばやい走り",
    stats: { maxRunSpeed: 310, maxDashSpeed: 490, dashAccelBonus: 1200, jumpVelocity: -660 },
  },
  {
    id: "itsuki",
    name: "いつきくん",
    shortName: "いつき",
    imageKey: "itsukiHero",
    guideKey: "itsukiGuide",
    atlas: ITSUKI_ATLAS,
    scaleFactor: 0.92,
    titleScaleFactor: 0.9,
    color: "#91a36c",
    description: "元気なジャンプ",
    stats: { maxRunSpeed: 240, maxDashSpeed: 390, dashAccelBonus: 880, jumpVelocity: -820 },
  },
];

const GAME_MODES = {
  campaign: {
    id: "campaign",
    label: "5ステージ冒険",
    title: "みんなのいちご大冒険",
  },
  scoreAttack: {
    id: "scoreAttack",
    label: "いちごラッシュ",
    title: "いちごラッシュ",
  },
};

const BASE_PLATFORMS = [
  { x: 940, y: 352, w: 152, h: 18 },
  { x: 1815, y: 336, w: 148, h: 18 },
  { x: 2960, y: 348, w: 164, h: 18 },
  { x: 4180, y: 330, w: 178, h: 18 },
];

const BASE_TOUCH_BERRIES = [
  [250, 354],
  [380, 330],
  [540, 350],
  [720, 300],
  [970, 286],
  [1070, 312],
  [1310, 350],
  [1680, 322],
  [1875, 274],
  [2140, 330],
  [2470, 348],
  [3020, 286],
  [3340, 346],
  [3570, 326],
  [4210, 268],
  [4460, 348],
  [4700, 314],
  [4990, 336],
];

const BASE_ACTION_BERRIES = [
  [620, 393],
  [1500, 393],
  [2310, 393],
  [2790, 393],
  [3880, 393],
  [5210, 393],
];

const BASE_OBSTACLES = [
  { x: 680, y: 410, w: 64, h: 16, type: "puddle", damage: 1 },
  { x: 920, y: 396, w: 42, h: 28, type: "bug", damage: 1, movement: "sine", amplitude: 34, speed: 2.1 },
  { x: 1450, y: 405, w: 56, h: 18, type: "leafpile", damage: 1 },
  { x: 1730, y: 404, w: 54, h: 18, type: "mud", damage: 1 },
  { x: 2140, y: 397, w: 44, h: 28, type: "bug", damage: 1, movement: "hop", amplitude: 28, speed: 2.5 },
  { x: 2600, y: 408, w: 46, h: 18, type: "rock", damage: 1 },
  { x: 3180, y: 410, w: 70, h: 16, type: "puddle", damage: 1 },
  { x: 3570, y: 398, w: 46, h: 28, type: "bug", damage: 1, movement: "sine", amplitude: 42, speed: 1.7 },
  { x: 4060, y: 404, w: 52, h: 18, type: "mud", damage: 1 },
  { x: 4530, y: 409, w: 72, h: 16, type: "puddle", damage: 1 },
  { x: 4900, y: 405, w: 54, h: 18, type: "leafpile", damage: 1 },
  { x: 5160, y: 398, w: 44, h: 28, type: "bug", damage: 1, movement: "hop", amplitude: 24, speed: 2.8 },
];

const NON_COLLIDING_OBSTACLE_TYPES = new Set(["leafpile"]);
const DEFEATABLE_OBSTACLE_TYPES = new Set(["bug", "bee", "drone"]);

const STAGE_CONFIGS = [
  {
    title: "Stage 1",
    name: "Sunny Berry Row",
    jpName: "ひだまりいちご畑",
    bgm: ASSET_MANIFEST.audio.stage1,
    theme: {
      skyTop: "#cdeeff",
      skyMid: "#fefcff",
      skyBottom: "#ffe6c3",
      greenhouse: "rgba(220, 247, 228, 0.75)",
      greenhouseTrim: "rgba(167, 222, 177, 0.9)",
      field: "rgba(128, 172, 92, 0.28)",
      ground: "#8c5e42",
      grass: "#74b64f",
      grassDark: "#67a845",
    },
    boss: { type: "ladybug", imageKey: "bossLadybug", hp: 3, x: 5215, y: 356, w: 128, h: 92, movement: "hover" },
    powerups: [
      { id: "ramen-1", type: "ramen", x: 2460, y: 380 },
      { id: "star-1", type: "star", x: 3790, y: 326 },
    ],
    labels: ["START", "Berry Lane", "Sweet Row", "BOSS"],
  },
  {
    title: "Stage 2",
    name: "Misty Water House",
    jpName: "きらめき水やり温室",
    bgm: ASSET_MANIFEST.audio.stage2,
    theme: {
      skyTop: "#bfe9ff",
      skyMid: "#e9f8ff",
      skyBottom: "#dff7dc",
      greenhouse: "rgba(205, 238, 245, 0.78)",
      greenhouseTrim: "rgba(125, 200, 214, 0.85)",
      field: "rgba(88, 154, 126, 0.3)",
      ground: "#765f4a",
      grass: "#5fb67a",
      grassDark: "#499b65",
    },
    boss: { type: "frog", imageKey: "bossFrog", hp: 4, x: 5205, y: 356, w: 138, h: 96, movement: "hop" },
    powerups: [
      { id: "ramen-2", type: "ramen", x: 1840, y: 318 },
      { id: "star-2", type: "star", x: 4320, y: 288 },
    ],
    labels: ["STAGE 2", "Water Row", "Mist Gate", "BOSS"],
  },
  {
    title: "Stage 3",
    name: "Golden Strawberry Gate",
    jpName: "夕やけストロベリーゲート",
    bgm: ASSET_MANIFEST.audio.stage3,
    theme: {
      skyTop: "#ffd6a7",
      skyMid: "#ffe9c9",
      skyBottom: "#fff2c6",
      greenhouse: "rgba(247, 230, 186, 0.78)",
      greenhouseTrim: "rgba(232, 181, 119, 0.86)",
      field: "rgba(176, 124, 77, 0.25)",
      ground: "#7b4e42",
      grass: "#7dbb52",
      grassDark: "#649c42",
    },
    boss: { type: "beetle", imageKey: "bossBeetle", hp: 5, x: 5195, y: 352, w: 156, h: 104, movement: "guard" },
    powerups: [
      { id: "ramen-3", type: "ramen", x: 2140, y: 378 },
      { id: "star-3", type: "star", x: 4700, y: 294 },
    ],
    labels: ["FINAL", "Gold Row", "Star Lane", "BOSS"],
  },
  {
    title: "Stage 4",
    name: "Moonlit Honey House",
    jpName: "月あかりハニートンネル",
    bgm: ASSET_MANIFEST.audio.stage4,
    theme: {
      skyTop: "#263a72",
      skyMid: "#6a75a9",
      skyBottom: "#ffe0bd",
      greenhouse: "rgba(188, 202, 240, 0.72)",
      greenhouseTrim: "rgba(126, 151, 221, 0.86)",
      field: "rgba(95, 84, 145, 0.28)",
      ground: "#57405a",
      grass: "#8bbd64",
      grassDark: "#679548",
    },
    boss: { type: "moth", hp: 6, x: 5205, y: 306, w: 154, h: 108, movement: "swoop", attack: "spores" },
    powerups: [
      { id: "ramen-4", type: "ramen", x: 1720, y: 378 },
      { id: "star-4", type: "star", x: 3450, y: 270 },
    ],
    labels: ["STAGE 4", "Honey Bend", "Moon Row", "BOSS"],
  },
  {
    title: "Stage 5",
    name: "Rainbow Cloud Garden",
    jpName: "にじ雲スカイガーデン",
    bgm: ASSET_MANIFEST.audio.stage5,
    theme: {
      skyTop: "#94d9ff",
      skyMid: "#fff6fb",
      skyBottom: "#f8ffd0",
      greenhouse: "rgba(220, 245, 255, 0.64)",
      greenhouseTrim: "rgba(255, 177, 210, 0.78)",
      field: "rgba(116, 190, 210, 0.22)",
      ground: "#66506f",
      grass: "#9acc5d",
      grassDark: "#73a94d",
    },
    boss: { type: "dragonfly", hp: 7, x: 5190, y: 292, w: 174, h: 104, movement: "zigzag", attack: "laser" },
    powerups: [
      { id: "ramen-5", type: "ramen", x: 2340, y: 334 },
      { id: "star-5", type: "star", x: 4380, y: 254 },
    ],
    labels: ["FINAL", "Cloud Row", "Rainbow Lane", "BOSS"],
  },
];

const SCORE_ATTACK_THEMES = [
  {
    skyTop: "#bfeaff",
    skyMid: "#f6fbff",
    skyBottom: "#fff0c8",
    greenhouse: "rgba(210, 245, 232, 0.76)",
    greenhouseTrim: "rgba(135, 213, 182, 0.86)",
    field: "rgba(95, 176, 122, 0.3)",
    ground: "#7d5942",
    grass: "#63bd62",
    grassDark: "#4ca64f",
  },
  {
    skyTop: "#ffd2e4",
    skyMid: "#fff4fa",
    skyBottom: "#e8f7ff",
    greenhouse: "rgba(235, 218, 250, 0.72)",
    greenhouseTrim: "rgba(185, 150, 230, 0.82)",
    field: "rgba(159, 132, 196, 0.24)",
    ground: "#7b5261",
    grass: "#78b96a",
    grassDark: "#5e9f54",
  },
  {
    skyTop: "#ffe0a9",
    skyMid: "#fff5d7",
    skyBottom: "#d9f5dc",
    greenhouse: "rgba(255, 238, 190, 0.72)",
    greenhouseTrim: "rgba(226, 174, 102, 0.84)",
    field: "rgba(177, 141, 78, 0.24)",
    ground: "#835340",
    grass: "#7abc4f",
    grassDark: "#609d3e",
  },
];

const SCORE_ATTACK_BOSS_POOL = [
  { type: "ladybug", imageKey: "bossLadybug", hp: 3, w: 128, h: 92, movement: "hover" },
  { type: "frog", imageKey: "bossFrog", hp: 4, w: 138, h: 96, movement: "hop" },
  { type: "beetle", imageKey: "bossBeetle", hp: 5, w: 156, h: 104, movement: "guard" },
  { type: "moth", hp: 6, w: 154, h: 108, movement: "swoop", attack: "spores" },
  { type: "dragonfly", hp: 7, w: 174, h: 104, movement: "zigzag", attack: "laser" },
];

function createLevelData(stageIndex = 0) {
  const stage = STAGE_CONFIGS[stageIndex] ?? STAGE_CONFIGS[0];
  const stageNo = stageIndex + 1;
  const yShift = stageIndex === 1 ? -6 : stageIndex === 2 ? 4 : stageIndex === 3 ? -24 : stageIndex === 4 ? -36 : 0;
  const platforms = BASE_PLATFORMS.map((platform, index) => ({
    ...platform,
    y: platform.y + (stageIndex === 2 && index % 2 === 0 ? -16 : yShift) + (stageIndex >= 3 ? (index % 2 === 0 ? -18 : 14) : 0),
  }));
  if (stageIndex === 3) {
    platforms.push(
      { x: 1180, y: 284, w: 136, h: 18 },
      { x: 2500, y: 300, w: 128, h: 18 },
      { x: 3810, y: 276, w: 150, h: 18 }
    );
  } else if (stageIndex === 4) {
    platforms.push(
      { x: 1080, y: 286, w: 126, h: 18 },
      { x: 2060, y: 254, w: 146, h: 18 },
      { x: 3300, y: 292, w: 160, h: 18 },
      { x: 4550, y: 246, w: 138, h: 18 }
    );
  }
  const collectibles = [
    ...BASE_TOUCH_BERRIES.map(([x, y], index) => ({
      id: `s${stageNo}-b${String(index + 1).padStart(2, "0")}`,
      x: x + stageIndex * 18,
      y: y + (index % 3 === 0 ? -stageIndex * 10 : stageIndex * 4) + (stageIndex >= 3 && index % 4 === 0 ? -46 : 0),
      type: "touch",
    })),
    ...BASE_ACTION_BERRIES.map(([x, y], index) => ({
      id: `s${stageNo}-a${String(index + 1).padStart(2, "0")}`,
      x: x + stageIndex * 22,
      y,
      type: "action",
    })),
  ];
  const stageObstacles = BASE_OBSTACLES.map((obstacle, index) => ({
    ...obstacle,
    x: obstacle.x + stageIndex * (index % 2 === 0 ? 26 : -18),
    speed: obstacle.speed ? obstacle.speed + stageIndex * 0.25 : obstacle.speed,
    amplitude: obstacle.amplitude ? obstacle.amplitude + stageIndex * 4 : obstacle.amplitude,
  }));
  if (stageIndex === 1) {
    stageObstacles.push(
      { x: 1180, y: 410, w: 78, h: 16, type: "puddle", damage: 1 },
      { x: 2740, y: 404, w: 58, h: 18, type: "mud", damage: 1 },
      { x: 3840, y: 397, w: 46, h: 28, type: "bug", damage: 1, movement: "hop", amplitude: 34, speed: 2.9 }
    );
  } else if (stageIndex === 2) {
    stageObstacles.push(
      { x: 1120, y: 397, w: 46, h: 28, type: "bug", damage: 1, movement: "sine", amplitude: 48, speed: 2.4 },
      { x: 2860, y: 408, w: 50, h: 18, type: "rock", damage: 1 },
      { x: 4380, y: 404, w: 58, h: 18, type: "mud", damage: 1 }
    );
  } else if (stageIndex === 3) {
    stageObstacles.push(
      { x: 1040, y: 356, w: 46, h: 32, type: "bee", damage: 1, movement: "sine", amplitude: 64, speed: 2.6 },
      { x: 1540, y: 407, w: 62, h: 24, type: "thorn", damage: 1 },
      { x: 2320, y: 338, w: 48, h: 32, type: "bee", damage: 1, movement: "vertical", amplitude: 50, speed: 2.1 },
      { x: 3080, y: 408, w: 70, h: 20, type: "honey", damage: 1 },
      { x: 3860, y: 330, w: 48, h: 32, type: "bee", damage: 1, movement: "sine", amplitude: 72, speed: 3.0 },
      { x: 4660, y: 407, w: 64, h: 24, type: "thorn", damage: 1 }
    );
  } else if (stageIndex === 4) {
    stageObstacles.push(
      { x: 980, y: 318, w: 52, h: 34, type: "drone", damage: 1, movement: "vertical", amplitude: 72, speed: 2.4 },
      { x: 1660, y: 407, w: 64, h: 24, type: "crystal", damage: 1 },
      { x: 2440, y: 300, w: 52, h: 34, type: "drone", damage: 1, movement: "sine", amplitude: 84, speed: 2.7 },
      { x: 3180, y: 407, w: 68, h: 24, type: "crystal", damage: 1 },
      { x: 4020, y: 286, w: 52, h: 34, type: "drone", damage: 1, movement: "vertical", amplitude: 88, speed: 3.0 },
      { x: 4900, y: 318, w: 52, h: 34, type: "drone", damage: 1, movement: "sine", amplitude: 90, speed: 3.2 }
    );
  }
  return {
    stageLength: CONFIG.stageLength,
    stageIndex,
    title: stage.title,
    name: stage.name,
    jpName: stage.jpName,
    theme: stage.theme,
    bgm: stage.bgm,
    platforms,
    decorations: {
      signPosts: [
        { x: 120, label: stage.labels[0] },
        { x: 1430, label: stage.labels[1] },
        { x: 3200, label: stage.labels[2] },
        { x: 5050, label: stage.labels[3] },
      ],
      flowerPatches: [180, 330, 790, 960, 1210, 1580, 2030, 2560, 3010, 3520, 3990, 4470, 4930, 5360],
      grassPatches: [100, 260, 620, 820, 1180, 1510, 1720, 2140, 2380, 2720, 3140, 3420, 3660, 3900, 4300, 4680, 5050, 5480],
      trays: [880, 1760, 2900, 4160],
    },
    goal: {
      x: 5510,
      y: 316,
      w: 92,
      h: 116,
    },
    collectibles,
    powerups: stage.powerups.map((item) => ({ ...item })),
    obstacles: stageObstacles,
    boss: { ...stage.boss, maxHp: stage.boss.hp, phase: stageIndex * 0.8, defeated: false, hurtCooldown: 0, hitFlash: 0 },
  };
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (from, to, amount) => from + (to - from) * amount;
const smoothstep = (value) => value * value * (3 - 2 * value);
const formatNumber = (value) => new Intl.NumberFormat("ja-JP").format(Math.round(value));
const formatSeconds = (seconds) => `${seconds.toFixed(1)} 秒`;

function createRng(seed) {
  let state = (seed >>> 0) || 0x9e3779b9;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function randRange(rng, min, max) {
  return min + (max - min) * rng();
}

function randChoice(rng, list) {
  return list[Math.floor(rng() * list.length) % list.length];
}

function createScoreAttackLevelData(seed = Date.now()) {
  const rng = createRng(seed ^ Math.floor(Math.random() * 0xffffffff));
  const theme = { ...randChoice(rng, SCORE_ATTACK_THEMES) };
  const level = {
    stageLength: CONFIG.scoreAttackInitialLength,
    stageIndex: 0,
    title: "Score Attack",
    name: "Strawberry Rush",
    jpName: "いちごラッシュ",
    theme,
    bgm: ASSET_MANIFEST.audio.scoreAttack,
    platforms: [],
    decorations: {
      signPosts: [],
      flowerPatches: [],
      grassPatches: [],
      trays: [],
    },
    goal: null,
    collectibles: [],
    powerups: [],
    obstacles: [],
    boss: null,
    endless: true,
    seed,
    rng,
    generatedUntil: 160,
    nextBerryId: 1,
    nextObstacleId: 1,
    nextPowerupId: 1,
    nextBossIndex: 1,
    nextBossX: randRange(rng, 1850, 2600),
  };
  extendScoreAttackLevel(level, CONFIG.scoreAttackInitialLength);
  return level;
}

function extendScoreAttackLevel(level, untilX) {
  if (!level?.endless) {
    return;
  }
  const rng = level.rng ?? Math.random;
  while (level.generatedUntil < untilX) {
    const chunkStart = level.generatedUntil;
    const chunkEnd = chunkStart + CONFIG.scoreAttackChunkWidth;
    const chunkIndex = Math.floor(chunkStart / CONFIG.scoreAttackChunkWidth);
    const density = 3 + Math.floor(rng() * 3);

    for (let index = 0; index < density; index += 1) {
      const x = chunkStart + 150 + (index + 0.35) * ((CONFIG.scoreAttackChunkWidth - 260) / density) + randRange(rng, -42, 42);
      const lane = randChoice(rng, [292, 318, 344, 366]);
      level.collectibles.push({
        id: `rush-b${level.nextBerryId++}`,
        x: Math.round(x),
        y: lane + randRange(rng, -8, 8),
        type: "touch",
      });
    }

    if (chunkStart > 500 && rng() < 0.58) {
      level.collectibles.push({
        id: `rush-a${level.nextBerryId++}`,
        x: Math.round(chunkStart + randRange(rng, 260, CONFIG.scoreAttackChunkWidth - 150)),
        y: CONFIG.groundY - 37,
        type: "action",
      });
    }

    if (chunkStart > 760 && rng() < 0.64) {
      const platformW = randRange(rng, 118, 188);
      const platformX = Math.round(chunkStart + randRange(rng, 180, CONFIG.scoreAttackChunkWidth - platformW - 80));
      const platformY = Math.round(randChoice(rng, [318, 336, 354]) + randRange(rng, -8, 8));
      level.platforms.push({ x: platformX, y: platformY, w: platformW, h: 18 });
      if (rng() < 0.72) {
        level.collectibles.push({
          id: `rush-p${level.nextBerryId++}`,
          x: Math.round(platformX + platformW * 0.5),
          y: platformY - 52,
          type: "touch",
        });
      }
    }

    if (chunkStart > 520) {
      const obstacleCount = 1 + Math.floor(rng() * (chunkIndex > 5 ? 3 : 2));
      for (let index = 0; index < obstacleCount; index += 1) {
        const type = randChoice(rng, ["puddle", "mud", "leafpile", "rock", "bug"]);
        const x = Math.round(chunkStart + randRange(rng, 170, CONFIG.scoreAttackChunkWidth - 90));
        if (type === "bug") {
          level.obstacles.push({
            id: `rush-o${level.nextObstacleId++}`,
            x,
            y: 397,
            w: 44,
            h: 28,
            type,
            damage: 1,
            movement: rng() < 0.5 ? "sine" : "hop",
            amplitude: randRange(rng, 22, 50),
            speed: randRange(rng, 1.6, 3.2),
          });
        } else {
          const size = {
            puddle: { w: 64, h: 16, y: 410 },
            mud: { w: 54, h: 18, y: 405 },
            leafpile: { w: 56, h: 18, y: 405 },
            rock: { w: 44, h: 18, y: 408 },
          }[type];
          level.obstacles.push({
            id: `rush-o${level.nextObstacleId++}`,
            x,
            y: size.y,
            w: size.w,
            h: size.h,
            type,
            damage: 1,
          });
        }
      }
    }

    if (chunkStart > 1200 && rng() < 0.18) {
      level.powerups.push({
        id: `rush-star-${level.nextPowerupId++}`,
        type: "star",
        x: Math.round(chunkStart + randRange(rng, 260, CONFIG.scoreAttackChunkWidth - 160)),
        y: randChoice(rng, [290, 318, 346]),
      });
    }

    level.decorations.flowerPatches.push(Math.round(chunkStart + randRange(rng, 80, CONFIG.scoreAttackChunkWidth - 120)));
    level.decorations.flowerPatches.push(Math.round(chunkStart + randRange(rng, 260, CONFIG.scoreAttackChunkWidth - 80)));
    level.decorations.grassPatches.push(Math.round(chunkStart + randRange(rng, 60, CONFIG.scoreAttackChunkWidth - 60)));
    level.decorations.grassPatches.push(Math.round(chunkStart + randRange(rng, 340, CONFIG.scoreAttackChunkWidth - 40)));
    if (rng() < 0.34) {
      level.decorations.trays.push(Math.round(chunkStart + randRange(rng, 220, CONFIG.scoreAttackChunkWidth - 120)));
    }

    level.generatedUntil = chunkEnd;
    level.stageLength = Math.max(level.stageLength, chunkEnd + CONFIG.width * 1.5);
  }
}

function createScoreAttackBoss(level, x) {
  const rng = level.rng ?? Math.random;
  const base = randChoice(rng, SCORE_ATTACK_BOSS_POOL);
  const hpBoost = Math.min(3, Math.floor((level.nextBossIndex - 1) / 3));
  return {
    ...base,
    id: `rush-boss-${level.nextBossIndex++}`,
    hp: base.hp + hpBoost,
    maxHp: base.hp + hpBoost,
    x,
    y: base.type === "dragonfly" ? 292 : base.type === "moth" ? 306 : base.type === "beetle" ? 352 : 356,
    phase: rng() * 3,
    defeated: false,
    hurtCooldown: 0,
    hitFlash: 0,
  };
}

function pathRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function worldRectCenter(rect) {
  return {
    x: rect.x + rect.w / 2,
    y: rect.y + rect.h / 2,
  };
}

function averageColors(samples) {
  const total = samples.reduce(
    (acc, color) => {
      acc.r += color[0];
      acc.g += color[1];
      acc.b += color[2];
      return acc;
    },
    { r: 0, g: 0, b: 0 }
  );
  return {
    r: total.r / samples.length,
    g: total.g / samples.length,
    b: total.b / samples.length,
  };
}

function pixelCloseToBackground(r, g, b, bg) {
  const diff = Math.abs(r - bg.r) + Math.abs(g - bg.g) + Math.abs(b - bg.b);
  return r > 218 && g > 210 && b > 205 && diff < 96;
}

function prepareSpriteFrames(image, atlas) {
  const prepared = {};
  Object.entries(atlas).forEach(([name, frames]) => {
    prepared[name] = frames.map((frame) => {
      const canvas = document.createElement("canvas");
      canvas.width = frame.w;
      canvas.height = frame.h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, 0, 0, frame.w, frame.h);
      try {
        const data = ctx.getImageData(0, 0, frame.w, frame.h);
        const alphaPoints = [
          3,
          (frame.w - 4) * 4,
          ((frame.h - 4) * frame.w + 3) * 4,
          ((frame.h - 4) * frame.w + (frame.w - 4)) * 4,
        ];
        const alreadyTransparent = alphaPoints.some((index) => data.data[index] < 20);
        if (alreadyTransparent) {
          return {
            ...frame,
            canvas,
          };
        }
        const samplePoints = [
          [0, 0],
          [frame.w - 1, 0],
          [0, frame.h - 1],
          [frame.w - 1, frame.h - 1],
          [Math.floor(frame.w / 2), 0],
          [Math.floor(frame.w / 2), frame.h - 1],
        ];
        const samples = samplePoints.map(([sx, sy]) => {
          const index = (sy * frame.w + sx) * 4;
          return [data.data[index], data.data[index + 1], data.data[index + 2]];
        });
        const bg = averageColors(samples);
        for (let i = 0; i < data.data.length; i += 4) {
          const r = data.data[i];
          const g = data.data[i + 1];
          const b = data.data[i + 2];
          if (pixelCloseToBackground(r, g, b, bg)) {
            data.data[i + 3] = 0;
          }
        }
        ctx.putImageData(data, 0, 0);
      } catch (error) {
        console.warn("Sprite transparency preprocessing skipped.", error);
      }
      return {
        ...frame,
        canvas,
      };
    });
  });
  return prepared;
}

function loadImage(src, onDone) {
  const image = new Image();
  const asset = { image, ready: false, error: false };
  image.onload = () => {
    asset.ready = true;
    onDone?.(asset);
  };
  image.onerror = () => {
    asset.error = true;
    onDone?.(asset);
  };
  image.src = src;
  return asset;
}

class InputManager {
  constructor() {
    this.down = Object.create(null);
    this.pressed = new Set();
    this.touch = Object.create(null);
    this.touchPointers = new Map();
    this.bindings = {
      KeyA: "left",
      ArrowLeft: "left",
      KeyD: "right",
      ArrowRight: "right",
      Space: "jump",
      KeyW: "jump",
      ArrowUp: "jump",
      ShiftLeft: "dash",
      ShiftRight: "dash",
      KeyS: "action",
      ArrowDown: "action",
      Enter: "action",
      KeyF: "attack",
      ControlLeft: "attack",
      KeyB: "bomb",
      KeyM: "bgm",
      KeyP: "pause",
      KeyR: "restart",
      KeyT: "back",
      Escape: "back",
    };
    this.keyBindings = {
      Escape: "back",
      Esc: "back",
      t: "back",
      T: "back",
    };
    window.addEventListener("keydown", (event) => this.handleKey(event, true), true);
    window.addEventListener("keyup", (event) => this.handleKey(event, false), true);
    window.addEventListener("blur", () => this.reset());
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.reset();
      }
    });
    this.bindTouchControls();
  }

  handleKey(event, isDown) {
    const action = this.bindings[event.code] || this.keyBindings[event.key];
    if (!action) {
      return;
    }
    event.preventDefault();
    if (isDown) {
      if (!this.down[action] && !event.repeat) {
        this.pressed.add(action);
      }
      this.down[action] = true;
      return;
    }
    this.down[action] = false;
  }

  bindTouchControls() {
    const controls = Array.from(document.querySelectorAll("[data-touch-action]"));
    controls.forEach((button) => {
      const action = button.dataset.touchAction;
      if (!action) {
        return;
      }
      const press = (event) => {
        event.preventDefault();
        button.setPointerCapture?.(event.pointerId);
        this.touchPointers.set(event.pointerId, action);
        if (!this.touch[action]) {
          this.pressed.add(action);
        }
        this.touch[action] = true;
        button.classList.add("is-held");
      };
      const release = (event) => {
        event.preventDefault();
        const activeAction = this.touchPointers.get(event.pointerId) || action;
        this.touchPointers.delete(event.pointerId);
        const stillHeld = Array.from(this.touchPointers.values()).includes(activeAction);
        if (!stillHeld) {
          this.touch[activeAction] = false;
        }
        button.classList.remove("is-held");
      };
      button.addEventListener("pointerdown", press, { passive: false });
      button.addEventListener("pointerup", release, { passive: false });
      button.addEventListener("pointercancel", release, { passive: false });
      button.addEventListener("pointerleave", release, { passive: false });
      button.addEventListener("contextmenu", (event) => event.preventDefault());
    });
  }

  reset() {
    this.down = Object.create(null);
    this.touch = Object.create(null);
    this.pressed.clear();
    this.touchPointers.clear();
    document.querySelectorAll("[data-touch-action].is-held").forEach((button) => {
      button.classList.remove("is-held");
    });
  }

  isDown(action) {
    return Boolean(this.down[action] || this.touch[action]);
  }

  wasPressed(action) {
    return this.pressed.has(action);
  }

  endFrame() {
    this.pressed.clear();
  }
}

class AudioManager {
  constructor(src) {
    this.bgm = new Audio(src);
    this.currentBgmSrc = src;
    this.bgm.loop = true;
    this.bgm.volume = 0.32;
    this.bgm.playbackRate = 1;
    this.bgm.preload = "auto";
    this.bgmAvailable = true;
    this.bgmEnabled = false;
    this.userTouchedBgm = false;
    this.unlocked = false;
    this.audioContext = null;
    this.bgm.addEventListener("error", () => {
      this.bgmAvailable = false;
    });
  }

  ensureContext() {
    if (!this.audioContext) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) {
        this.audioContext = new Ctor();
      }
    }
    return this.audioContext;
  }

  async unlock() {
    this.unlocked = true;
    const ctx = this.ensureContext();
    if (ctx && ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch (error) {
        console.warn("Audio resume failed.", error);
      }
    }
    this.syncBgm();
  }

  setEnabled(enabled, markTouched = false) {
    this.bgmEnabled = enabled;
    if (markTouched) {
      this.userTouchedBgm = true;
    }
    this.syncBgm();
  }

  toggleBgm() {
    this.setEnabled(!this.bgmEnabled, true);
  }

  setBgmSource(src) {
    if (!src || src === this.currentBgmSrc) {
      return;
    }
    const shouldResume = this.unlocked && this.bgmEnabled;
    this.bgm.pause();
    this.currentBgmSrc = src;
    this.bgmAvailable = true;
    this.bgm.src = src;
    this.bgm.loop = true;
    this.bgm.volume = 0.32;
    this.bgm.playbackRate = 1;
    this.bgm.load();
    if (shouldResume) {
      this.syncBgm();
    }
  }

  setPlaybackRate(rate = 1) {
    const nextRate = clamp(rate, 0.5, 1.8);
    if (Math.abs(this.bgm.playbackRate - nextRate) < 0.01) {
      return;
    }
    this.bgm.playbackRate = nextRate;
  }

  syncBgm() {
    if (!this.bgmAvailable) {
      return;
    }
    if (this.unlocked && this.bgmEnabled) {
      const playPromise = this.bgm.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((error) => {
          if (error?.name === "AbortError") {
            return;
          }
          if (this.bgm.error) {
            this.bgmAvailable = false;
          }
        });
      }
      return;
    }
    this.bgm.pause();
  }

  playSe(kind) {
    const ctx = this.ensureContext();
    if (!ctx || !this.unlocked) {
      return;
    }
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.connect(ctx.destination);
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.connect(gain);

    const stopTime = {
      button: 0.1,
      jump: 0.14,
      dash: 0.12,
      berry: 0.18,
      combo: 0.2,
      throw: 0.12,
      bomb: 0.5,
      stomp: 0.16,
      hit: 0.18,
      heal: 0.22,
      power: 0.36,
      boss: 0.28,
      damage: 0.24,
      clear: 0.55,
      gameover: 0.6,
    }[kind] ?? 0.12;

    switch (kind) {
      case "button":
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(720, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "jump":
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "dash":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(420, now + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "berry":
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.09, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "combo":
        osc.frequency.setValueAtTime(740, now);
        osc.frequency.linearRampToValueAtTime(980, now + 0.08);
        osc.frequency.linearRampToValueAtTime(1280, now + 0.16);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "throw":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.linearRampToValueAtTime(760, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "bomb":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(760, now + 0.16);
        osc.frequency.linearRampToValueAtTime(1320, now + 0.34);
        gain.gain.exponentialRampToValueAtTime(0.09, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "stomp":
        osc.type = "square";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.linearRampToValueAtTime(410, now + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "hit":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(360, now);
        osc.frequency.linearRampToValueAtTime(240, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "heal":
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.linearRampToValueAtTime(720, now + 0.08);
        osc.frequency.linearRampToValueAtTime(960, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "power":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(680, now);
        osc.frequency.linearRampToValueAtTime(1040, now + 0.14);
        osc.frequency.linearRampToValueAtTime(1480, now + 0.28);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "boss":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(340, now + 0.1);
        osc.frequency.linearRampToValueAtTime(180, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "damage":
        osc.type = "square";
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "clear":
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.linearRampToValueAtTime(820, now + 0.18);
        osc.frequency.linearRampToValueAtTime(1240, now + 0.36);
        gain.gain.exponentialRampToValueAtTime(0.09, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      case "gameover":
        osc.type = "square";
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.linearRampToValueAtTime(160, now + 0.28);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
      default:
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + stopTime);
        break;
    }

    osc.start(now);
    osc.stop(now + stopTime);
  }
}

class GameApp {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = 1;
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    this.input = new InputManager();
    this.audio = new AudioManager(ASSET_MANIFEST.audio.bgm);
    this.bestScore = this.loadBestScore();
    this.scoreAttackScores = this.loadScoreAttackScores();
    this.selectedMode = GAME_MODES.campaign.id;
    this.scene = "title";
    this.sceneTimer = 0;
    this.pause = false;
    this.time = 0;
    this.lastFrame = performance.now();
    this.cameraX = 0;
    this.shakeTime = 0;
    this.shakePower = 0;
    this.pendingPrompt = "";
    this.promptTimer = 0;
    this.previewPhase = 0;
    this.afterImageCooldown = 0;
    this.images = {};
    this.sprites = null;
    this.characterSprites = {};
    this.selectedCharacterId = "miyu";
    this.campaignTotalBerries = STAGE_CONFIGS.length * (BASE_TOUCH_BERRIES.length + BASE_ACTION_BERRIES.length);
    this.level = createLevelData(0);
    this.runState = null;
    this.resultData = null;
    this.windPetals = Array.from({ length: 20 }, (_, index) => this.createWindPetal(index));

    this.els = {
      hud: document.getElementById("hud"),
      hudHp: document.getElementById("hudHp"),
      hudScore: document.getElementById("hudScore"),
      hudBest: document.getElementById("hudBest"),
      hudCombo: document.getElementById("hudCombo"),
      hudBerry: document.getElementById("hudBerry"),
      hudBomb: document.getElementById("hudBomb"),
      hudBgm: document.getElementById("hudBgm"),
      hudBgmToggle: document.getElementById("hudBgmToggle"),
      hudTitleButton: document.getElementById("hudTitleButton"),
      titleBgmToggle: document.getElementById("titleBgmToggle"),
      characterButtons: Array.from(document.querySelectorAll("[data-character]")),
      modeButtons: Array.from(document.querySelectorAll("[data-mode]")),
      scoreAttackBestLine: document.getElementById("scoreAttackBestLine"),
      titleScreen: document.getElementById("titleScreen"),
      howToScreen: document.getElementById("howToScreen"),
      messageScreen: document.getElementById("messageScreen"),
      messageEyebrow: document.getElementById("messageEyebrow"),
      messageTitle: document.getElementById("messageTitle"),
      messageBody: document.getElementById("messageBody"),
      resultScreen: document.getElementById("resultScreen"),
      resultEyebrow: document.getElementById("resultEyebrow"),
      resultTitle: document.getElementById("resultTitle"),
      resultScore: document.getElementById("resultScore"),
      resultBest: document.getElementById("resultBest"),
      resultBerry: document.getElementById("resultBerry"),
      resultCombo: document.getElementById("resultCombo"),
      resultHp: document.getElementById("resultHp"),
      resultTime: document.getElementById("resultTime"),
      resultSummary: document.getElementById("resultSummary"),
      scoreAttackRanking: document.getElementById("scoreAttackRanking"),
      pauseBadge: document.getElementById("pauseBadge"),
    };

    this.bindUi();
    this.updateCharacterButtons();
    this.updateModeButtons();
    this.loadAssets();
    this.setScene("title");
    this.updateUi();
    requestAnimationFrame((timestamp) => this.frame(timestamp));
  }

  resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio);
    this.pixelRatio = ratio;
    this.canvas.width = Math.round(CONFIG.width * ratio);
    this.canvas.height = Math.round(CONFIG.height * ratio);
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }

  bindUi() {
    document.getElementById("startButton").addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.startSelectedMode();
    });
    document.getElementById("howToButton").addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.setScene("howTo");
    });
    document.getElementById("closeHowToButton").addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.setScene("title");
    });
    document.getElementById("retryButton").addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.retryFromCheckpoint();
    });
    document.getElementById("backToTitleButton").addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.toTitle();
    });
    this.els.hudBgmToggle.addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.toggleBgm();
      this.audio.playSe("button");
      this.updateBgmButtons();
    });
    this.els.hudTitleButton.addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.toTitle();
    });
    this.els.titleBgmToggle.addEventListener("click", async () => {
      await this.audio.unlock();
      this.audio.toggleBgm();
      this.audio.playSe("button");
      this.updateBgmButtons();
    });
    this.els.characterButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        await this.audio.unlock();
        this.selectCharacter(button.dataset.character);
        this.audio.playSe("button");
      });
    });
    this.els.modeButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        await this.audio.unlock();
        this.selectMode(button.dataset.mode);
        this.audio.playSe("button");
      });
    });
  }

  loadAssets() {
    Object.entries(ASSET_MANIFEST.images).forEach(([key, src]) => {
      this.images[key] = loadImage(src, () => {
        const character = CHARACTERS.find((entry) => entry.imageKey === key);
        if (character && this.images[key].ready) {
          this.characterSprites[character.id] = prepareSpriteFrames(this.images[key].image, character.atlas);
          if (character.id === "miyu") {
            this.sprites = this.characterSprites[character.id];
          }
        }
      });
    });
  }

  getCharacter(id = this.selectedCharacterId) {
    return CHARACTERS.find((entry) => entry.id === id) ?? CHARACTERS[0];
  }

  getCharacterSprites(id = this.selectedCharacterId) {
    return this.characterSprites[id] ?? this.characterSprites.miyu ?? this.sprites;
  }

  selectCharacter(id) {
    if (!CHARACTERS.some((entry) => entry.id === id)) {
      return;
    }
    this.selectedCharacterId = id;
    this.updateCharacterButtons();
  }

  cycleCharacter(direction) {
    const currentIndex = Math.max(0, CHARACTERS.findIndex((entry) => entry.id === this.selectedCharacterId));
    const nextIndex = (currentIndex + direction + CHARACTERS.length) % CHARACTERS.length;
    this.selectCharacter(CHARACTERS[nextIndex].id);
  }

  selectMode(id) {
    if (!GAME_MODES[id]) {
      return;
    }
    this.selectedMode = id;
    this.updateModeButtons();
    this.updateUi();
  }

  startSelectedMode() {
    if (this.selectedMode === GAME_MODES.scoreAttack.id) {
      this.startScoreAttack();
      return;
    }
    this.startGame();
  }

  updateCharacterButtons() {
    this.els.characterButtons.forEach((button) => {
      const selected = button.dataset.character === this.selectedCharacterId;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  updateModeButtons() {
    this.els.modeButtons.forEach((button) => {
      const selected = button.dataset.mode === this.selectedMode;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    const topScore = this.scoreAttackScores[0]?.score ?? 0;
    if (this.els.scoreAttackBestLine) {
      this.els.scoreAttackBestLine.textContent = `いちごラッシュ BEST: ${formatNumber(topScore)} 点`;
    }
  }

  loadBestScore() {
    try {
      return Number(localStorage.getItem(CONFIG.storageKeyBestScore) || 0);
    } catch (error) {
      return 0;
    }
  }

  saveBestScore(value) {
    try {
      localStorage.setItem(CONFIG.storageKeyBestScore, String(value));
    } catch (error) {
      console.warn("Best score save failed.", error);
    }
  }

  loadScoreAttackScores() {
    try {
      const raw = localStorage.getItem(CONFIG.storageKeyScoreAttackScores);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed)
        ? parsed
            .filter((entry) => Number.isFinite(Number(entry?.score)))
            .map((entry) => ({
              id: String(entry.id ?? `${entry.score}-${entry.date ?? ""}`),
              score: Math.max(0, Math.round(Number(entry.score))),
              strawberries: Math.max(0, Math.round(Number(entry.strawberries ?? 0))),
              carriedStrawberries: Math.max(0, Math.round(Number(entry.carriedStrawberries ?? 0))),
              time: Math.max(0, Number(entry.time ?? 0)),
              characterName: String(entry.characterName ?? "プレイヤー"),
              date: String(entry.date ?? ""),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, CONFIG.scoreAttackTopLimit)
        : [];
    } catch (error) {
      console.warn("Score attack ranking load failed.", error);
      return [];
    }
  }

  saveScoreAttackScores(scores) {
    try {
      localStorage.setItem(CONFIG.storageKeyScoreAttackScores, JSON.stringify(scores.slice(0, CONFIG.scoreAttackTopLimit)));
    } catch (error) {
      console.warn("Score attack ranking save failed.", error);
    }
  }

  recordScoreAttackScore(run) {
    const character = this.getCharacter(run.selectedCharacterId);
    const record = {
      id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      score: Math.max(0, Math.round(run.score)),
      strawberries: Math.max(0, Math.round(run.harvestedStrawberries ?? run.strawberries)),
      carriedStrawberries: Math.max(0, Math.round(run.strawberries)),
      time: Math.max(0, run.time),
      characterName: character.name,
      date: new Date().toISOString(),
    };
    this.scoreAttackScores = [...this.scoreAttackScores, record]
      .sort((a, b) => b.score - a.score)
      .slice(0, CONFIG.scoreAttackTopLimit);
    this.saveScoreAttackScores(this.scoreAttackScores);
    this.updateModeButtons();
    return {
      record,
      rank: this.scoreAttackScores.findIndex((entry) => entry.id === record.id) + 1,
      scores: this.scoreAttackScores,
    };
  }

  createWindPetal(index) {
    const seed = index * 43.13;
    return {
      x: (index * 71) % CONFIG.width,
      y: (index * 29) % CONFIG.height,
      speedX: 14 + (index % 4) * 6,
      speedY: 6 + (index % 5) * 2,
      swing: seed,
      size: 5 + (index % 3),
      color: index % 2 === 0 ? "rgba(255, 204, 214, 0.55)" : "rgba(196, 224, 156, 0.42)",
    };
  }

  startGame(stageIndex = 0, carry = null) {
    this.selectedMode = GAME_MODES.campaign.id;
    this.updateModeButtons();
    this.level = createLevelData(stageIndex);
    this.audio.setBgmSource(this.level.bgm);
    this.audio.setPlaybackRate(1);
    const totalBerries = this.level.collectibles.length;
    const startX = carry?.startX ?? 120;
    const startSigns = this.level.decorations.signPosts;
    let initialLastPassedSignIndex = -1;
    for (let i = 0; i < startSigns.length; i++) {
      if (startSigns[i].x <= startX) { initialLastPassedSignIndex = i; }
    }
    this.applySavedLevelState(carry);
    this.runState = {
      mode: GAME_MODES.campaign.id,
      stageIndex,
      stageNumber: stageIndex + 1,
      stageName: this.level.jpName,
      selectedCharacterId: this.selectedCharacterId,
      player: {
        x: startX,
        y: CONFIG.groundY,
        vx: 0,
        vy: 0,
        width: 34,
        height: 58,
        hp: carry?.hp ?? CONFIG.maxHp,
        onGround: true,
        facing: 1,
        pickTimer: 0,
        hurtTimer: 0,
        invulnerable: carry?.invulnerable ?? 0,
        powerTimer: carry?.powerTimer ?? 0,
        animClock: 0,
        dashBurstTimer: 0,
        attackCooldown: 0,
        throwPoseTimer: 0,
      },
      score: carry?.score ?? 0,
      combo: 1,
      comboTimer: 0,
      comboFlash: 0,
      maxCombo: carry?.maxCombo ?? 1,
      strawberries: carry?.strawberries ?? 0,
      harvestedStrawberries: carry?.harvestedStrawberries ?? carry?.strawberries ?? 0,
      stageStrawberries: carry?.stageStrawberries ?? 0,
      totalBerries: this.campaignTotalBerries,
      stageTotalBerries: totalBerries,
      damageTaken: carry?.damageTaken ?? 0,
      stageDamageTaken: carry?.stageDamageTaken ?? 0,
      time: carry?.time ?? 0,
      stageTime: carry?.stageTime ?? 0,
      particles: [],
      afterimages: [],
      projectiles: [],
      bossProjectiles: [],
      bombReady: carry?.bombReady ?? true,
      bombTimer: carry?.bombTimer ?? 0,
      bombAllies: [],
      bombAllyClock: 0,
      bombCutinTimer: 0,
      bombFlashTimer: 0,
      goalPromptCooldown: 0,
      landingWasAirborne: false,
      nearestAction: null,
      bonuses: null,
      summary: "",
      finishKind: null,
      checkpoint: {
        x: startX,
        stageIndex,
        label: carry?.checkpointLabel ?? startSigns[initialLastPassedSignIndex]?.label ?? "スタート",
        state: null,
      },
      lastPassedSignIndex: initialLastPassedSignIndex,
      checkpointNotice: "",
      checkpointNoticeTimer: 0,
      playerStats: this.getCharacter(this.selectedCharacterId).stats,
    };
    this.runState.checkpoint.state = this.createCheckpointState(this.runState.checkpoint.x);
    this.cameraX = startX > 120
      ? clamp(startX - CONFIG.width * 0.28, 0, this.level.stageLength - CONFIG.width)
      : 0;
    this.pause = false;
    this.sceneTimer = 0;
    this.pendingPrompt = "";
    this.promptTimer = 0;
    this.setScene("playing");
    if (!this.audio.userTouchedBgm) {
      this.audio.setEnabled(true);
    } else {
      this.audio.syncBgm();
    }
    this.updateUi();
  }

  startScoreAttack() {
    this.selectedMode = GAME_MODES.scoreAttack.id;
    this.updateModeButtons();
    this.level = createScoreAttackLevelData(Date.now());
    this.audio.setBgmSource(this.level.bgm);
    this.audio.setPlaybackRate(1);
    const character = this.getCharacter(this.selectedCharacterId);
    this.runState = {
      mode: GAME_MODES.scoreAttack.id,
      stageIndex: 0,
      stageNumber: 1,
      stageName: this.level.jpName,
      selectedCharacterId: this.selectedCharacterId,
      player: {
        x: 120,
        y: CONFIG.groundY,
        vx: 0,
        vy: 0,
        width: 34,
        height: 58,
        hp: CONFIG.maxHp,
        onGround: true,
        facing: 1,
        pickTimer: 0,
        hurtTimer: 0,
        invulnerable: 0,
        powerTimer: 0,
        animClock: 0,
        dashBurstTimer: 0,
        attackCooldown: 0,
        throwPoseTimer: 0,
      },
      score: 0,
      combo: 1,
      comboTimer: 0,
      comboFlash: 0,
      maxCombo: 1,
      strawberries: 0,
      harvestedStrawberries: 0,
      spentStrawberries: 0,
      stageStrawberries: 0,
      totalBerries: 0,
      stageTotalBerries: 0,
      damageTaken: 0,
      stageDamageTaken: 0,
      time: 0,
      stageTime: 0,
      particles: [],
      afterimages: [],
      projectiles: [],
      bossProjectiles: [],
      bombReady: true,
      bombTimer: 0,
      bombAllies: [],
      bombAllyClock: 0,
      bombCutinTimer: 0,
      bombFlashTimer: 0,
      landingWasAirborne: false,
      nearestAction: null,
      bonuses: null,
      summary: "",
      finishKind: null,
      checkpoint: null,
      lastPassedSignIndex: -1,
      checkpointNotice: "",
      checkpointNoticeTimer: 0,
      playerStats: character.stats,
      scoreAttackRanking: null,
      scoreAttackRank: null,
    };
    this.cameraX = 0;
    this.pause = false;
    this.sceneTimer = 0;
    this.setScene("playing");
    this.showPrompt("いちごラッシュ開始！HPがなくなるまで走り続けよう", 2.2);
    if (!this.audio.userTouchedBgm) {
      this.audio.setEnabled(true);
    } else {
      this.audio.syncBgm();
    }
    this.updateUi();
  }

  applySavedLevelState(carry) {
    if (!carry) {
      return;
    }
    const collectedBerryIds = new Set(carry.collectedBerryIds ?? []);
    const collectedPowerupIds = new Set(carry.collectedPowerupIds ?? []);
    if (collectedBerryIds.size > 0) {
      this.level.collectibles.forEach((berry) => {
        berry.collected = collectedBerryIds.has(berry.id);
      });
    }
    if (collectedPowerupIds.size > 0) {
      this.level.powerups.forEach((item) => {
        item.collected = collectedPowerupIds.has(item.id);
      });
    }
  }

  createCheckpointState(startX) {
    const run = this.runState;
    if (!run) {
      return null;
    }
    return {
      startX,
      checkpointLabel: run.checkpoint?.label ?? "スタート",
      hp: run.player.hp,
      powerTimer: run.player.powerTimer,
      bombReady: run.bombReady,
      bombTimer: 0,
      score: run.score,
      strawberries: run.strawberries,
      harvestedStrawberries: run.harvestedStrawberries,
      stageStrawberries: run.stageStrawberries,
      maxCombo: run.maxCombo,
      damageTaken: run.damageTaken,
      stageDamageTaken: run.stageDamageTaken,
      time: run.time,
      stageTime: run.stageTime,
      collectedBerryIds: this.level.collectibles.filter((berry) => berry.collected).map((berry) => berry.id),
      collectedPowerupIds: this.level.powerups.filter((item) => item.collected).map((item) => item.id),
    };
  }

  toTitle() {
    this.pause = false;
    this.sceneTimer = 0;
    this.cameraX = 0;
    this.pendingPrompt = "";
    this.promptTimer = 0;
    this.level = createLevelData(0);
    this.audio.setBgmSource(ASSET_MANIFEST.audio.stage1);
    this.audio.setPlaybackRate(1);
    this.runState = null;
    this.resultData = null;
    this.setScene("title");
    this.updateUi();
  }

  setScene(scene) {
    this.scene = scene;
    const shell = document.querySelector(".game-shell");
    if (shell) {
      shell.classList.remove("scene-title", "scene-howTo", "scene-playing", "scene-clear", "scene-gameover", "scene-result");
      shell.classList.add(`scene-${scene}`);
    }
    this.els.titleScreen.classList.toggle("hidden", scene !== "title");
    this.els.howToScreen.classList.toggle("hidden", scene !== "howTo");
    this.els.messageScreen.classList.toggle("hidden", !["clear", "gameover"].includes(scene));
    this.els.resultScreen.classList.toggle("hidden", scene !== "result");
    this.els.hud.classList.toggle("hidden", scene === "title" || scene === "howTo");
    this.els.pauseBadge.classList.toggle("hidden", !this.pause);
    this.resetSceneScroll(scene);
  }

  resetSceneScroll(scene) {
    const overlay = document.getElementById("sceneOverlay");
    const activePanel = {
      title: this.els.titleScreen,
      howTo: this.els.howToScreen,
      clear: this.els.messageScreen,
      gameover: this.els.messageScreen,
      result: this.els.resultScreen,
    }[scene];
    const reset = () => {
      if (overlay) {
        overlay.scrollTop = 0;
      }
      if (activePanel) {
        activePanel.scrollTop = 0;
      }
    };
    reset();
    requestAnimationFrame(reset);
  }

  showPrompt(message, duration = 1.6) {
    this.pendingPrompt = message;
    this.promptTimer = Math.max(this.promptTimer, duration);
  }

  updateBgmButtons() {
    const label = this.audio.bgmEnabled && this.audio.bgmAvailable ? "BGM ON" : "BGM OFF";
    const pressed = String(this.audio.bgmEnabled && this.audio.bgmAvailable);
    this.els.hudBgmToggle.textContent = label;
    this.els.hudBgmToggle.setAttribute("aria-pressed", pressed);
    this.els.titleBgmToggle.textContent = label;
    this.els.titleBgmToggle.setAttribute("aria-pressed", pressed);
  }

  async frame(timestamp) {
    const delta = Math.min(0.033, (timestamp - this.lastFrame) / 1000 || 0.016);
    this.lastFrame = timestamp;
    this.time += delta;
    await this.handleGlobalInput();
    this.update(delta);
    this.draw();
    this.input.endFrame();
    requestAnimationFrame((next) => this.frame(next));
  }

  async handleGlobalInput() {
    if (this.input.wasPressed("bgm")) {
      await this.audio.unlock();
      this.audio.toggleBgm();
      this.audio.playSe("button");
      this.updateUi();
    }

    if (this.scene === "title" && (this.input.wasPressed("left") || this.input.wasPressed("right"))) {
      await this.audio.unlock();
      this.cycleCharacter(this.input.wasPressed("right") ? 1 : -1);
      this.audio.playSe("button");
      return;
    }

    if (this.scene === "title" && (this.input.wasPressed("jump") || this.input.wasPressed("action"))) {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.startSelectedMode();
      return;
    }

    if (this.scene === "howTo" && (this.input.wasPressed("back") || this.input.wasPressed("action"))) {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.setScene("title");
      this.updateUi();
      return;
    }

    if (this.input.wasPressed("back") && this.scene !== "title" && this.scene !== "howTo") {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.toTitle();
      return;
    }

    if (this.input.wasPressed("restart") && this.scene !== "title" && this.scene !== "howTo") {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.retryFromCheckpoint();
      return;
    }

    if (this.input.wasPressed("pause") && this.scene === "playing") {
      this.pause = !this.pause;
      this.els.pauseBadge.classList.toggle("hidden", !this.pause);
    }

    if (this.scene === "result" && (this.input.wasPressed("jump") || this.input.wasPressed("action"))) {
      await this.audio.unlock();
      this.audio.playSe("button");
      this.retryFromCheckpoint();
    }
  }

  update(delta) {
    this.updateBgmButtons();
    this.updateWindPetals(delta);

    if (this.shakeTime > 0) {
      this.shakeTime = Math.max(0, this.shakeTime - delta);
      this.shakePower = lerp(this.shakePower, 0, delta * 5.5);
    }

    if (this.scene === "playing" && this.runState) {
      if (!this.pause) {
        this.updatePlaying(delta);
      }
      this.updateUi();
      return;
    }

    if ((this.scene === "clear" || this.scene === "gameover") && this.runState) {
      this.updateRunVisuals(delta);
      this.sceneTimer -= delta;
      if (this.sceneTimer <= 0) {
        if (this.scene === "clear" && this.runState.stageIndex < STAGE_CONFIGS.length - 1) {
          this.startNextStage();
        } else {
          this.openResult();
        }
      }
      this.updateUi();
    }
  }

  updateWindPetals(delta) {
    this.windPetals.forEach((petal) => {
      petal.swing += delta;
      petal.x += petal.speedX * delta;
      petal.y += (petal.speedY + Math.sin(petal.swing * 2.1) * 8) * delta;
      if (petal.x > CONFIG.width + 24) {
        petal.x = -18;
      }
      if (petal.y > CONFIG.height + 16) {
        petal.y = -12;
      }
    });
  }

  updatePlaying(delta) {
    const run = this.runState;
    const player = run.player;
    run.time += delta;
    run.stageTime += delta;
    player.animClock += delta;
    player.hurtTimer = Math.max(0, player.hurtTimer - delta);
    player.invulnerable = Math.max(0, player.invulnerable - delta);
    player.powerTimer = Math.max(0, player.powerTimer - delta);
    player.pickTimer = Math.max(0, player.pickTimer - delta);
    player.dashBurstTimer = Math.max(0, player.dashBurstTimer - delta);
    player.attackCooldown = Math.max(0, player.attackCooldown - delta);
    player.throwPoseTimer = Math.max(0, player.throwPoseTimer - delta);
    run.bombTimer = Math.max(0, (run.bombTimer ?? 0) - delta);
    run.bombAllyClock = (run.bombAllyClock ?? 0) + delta;
    run.bombCutinTimer = Math.max(0, (run.bombCutinTimer ?? 0) - delta);
    run.bombFlashTimer = Math.max(0, (run.bombFlashTimer ?? 0) - delta);
    run.goalPromptCooldown = Math.max(0, (run.goalPromptCooldown ?? 0) - delta);
    run.comboTimer = Math.max(0, run.comboTimer - delta * 1000);
    run.comboFlash = Math.max(0, run.comboFlash - delta);
    run.checkpointNoticeTimer = Math.max(0, run.checkpointNoticeTimer - delta);
    this.afterImageCooldown = Math.max(0, this.afterImageCooldown - delta);
    if (run.mode === GAME_MODES.scoreAttack.id) {
      this.updateScoreAttackLevel(delta);
    }

    if (run.comboTimer <= 0) {
      run.combo = 1;
    }

    const moveAxis = (this.input.isDown("right") ? 1 : 0) - (this.input.isDown("left") ? 1 : 0);
    const wantsDash = this.input.isDown("dash") && moveAxis !== 0;
    const pStats = run.playerStats;
    const accel = player.onGround ? CONFIG.moveAccelGround : CONFIG.moveAccelAir;
    const bombActive = run.bombTimer > 0;
    this.audio.setPlaybackRate(bombActive ? CONFIG.bombMusicRate : 1);
    const speedMultiplier = bombActive ? CONFIG.bombSpeedMultiplier : 1;
    const targetMax = (wantsDash ? pStats.maxDashSpeed : pStats.maxRunSpeed) * speedMultiplier;
    const desiredVelocity = moveAxis * targetMax;
    const boost = (wantsDash ? pStats.dashAccelBonus : 0) + (bombActive ? CONFIG.bombFlightAccel * 0.45 : 0);

    if (moveAxis !== 0) {
      player.facing = moveAxis;
      const deltaVelocity = desiredVelocity - player.vx;
      const movementStep = clamp(deltaVelocity, -(accel + boost) * delta, (accel + boost) * delta);
      player.vx += movementStep;
      if (wantsDash && player.dashBurstTimer <= 0) {
        player.dashBurstTimer = 0.26;
        this.audio.playSe("dash");
      }
    } else if (player.onGround) {
      const friction = CONFIG.frictionGround * delta;
      if (Math.abs(player.vx) <= friction) {
        player.vx = 0;
      } else {
        player.vx -= Math.sign(player.vx) * friction;
      }
    }

    if (this.input.wasPressed("jump") && player.onGround) {
      player.vy = pStats.jumpVelocity;
      player.onGround = false;
      run.landingWasAirborne = true;
      this.audio.playSe("jump");
      this.spawnDustBurst(player.x, player.y - 4, 8, "lift");
    }

    if (this.input.wasPressed("bomb")) {
      this.activateBomb();
    }

    this.updateObstacles(delta);
    this.updateBoss(delta);
    this.updateBossProjectiles(delta);

    if (bombActive) {
      const flyAxis = (this.input.isDown("jump") ? -1 : 0) + (this.input.isDown("action") ? 1 : 0);
      player.vy += CONFIG.gravity * CONFIG.bombHoverGravityScale * delta;
      if (flyAxis !== 0) {
        player.vy += flyAxis * CONFIG.bombFlightAccel * delta;
      } else {
        player.vy = lerp(player.vy, 0, delta * 2.8);
      }
      player.vy = clamp(player.vy, -390, 360);
    } else {
      player.vy += CONFIG.gravity * delta;
    }
    const previousY = player.y;
    player.x = clamp(player.x + player.vx * delta, 12, this.level.stageLength - 16);
    player.y += player.vy * delta;
    if (bombActive) {
      const topLimit = player.height + CONFIG.bombFlightTopMargin;
      if (player.y < topLimit) {
        player.y = topLimit;
        player.vy = Math.max(0, player.vy);
      }
    }

    let standingY = CONFIG.groundY;
    for (const platform of this.level.platforms) {
      const withinX = player.x + player.width / 2 > platform.x && player.x - player.width / 2 < platform.x + platform.w;
      const crossedTop = previousY <= platform.y && player.y >= platform.y;
      if (player.vy >= 0 && withinX && crossedTop && player.y <= platform.y + 24) {
        standingY = Math.min(standingY, platform.y);
      }
    }

    if (player.y >= standingY) {
      player.y = standingY;
      if (!player.onGround && run.landingWasAirborne) {
        this.spawnDustBurst(player.x, player.y - 2, 12, "land");
      }
      player.vy = 0;
      player.onGround = true;
      run.landingWasAirborne = false;
    } else {
      player.onGround = false;
    }

    const actionTarget = this.findNearestActionBerry(player);
    run.nearestAction = actionTarget;
    this.promptTimer = Math.max(0, this.promptTimer - delta);
    if (this.promptTimer <= 0) {
      this.pendingPrompt = actionTarget ? "ACTIONでいちごをとる" : "";
    }

    if (this.input.wasPressed("action")) {
      player.pickTimer = 0.42;
      if (actionTarget) {
        this.collectBerry(actionTarget, "action");
      }
    }

    if (this.input.wasPressed("attack")) {
      this.throwProjectile();
    }

    this.checkTouchCollectibles(player);
    this.checkPowerups(player);
    if (run.mode !== GAME_MODES.scoreAttack.id) {
      this.checkSignPostCheckpoints(player);
    }
    this.updateProjectiles(delta);
    this.checkBossHits(player);
    this.checkObstacleHits(player);
    this.checkBossProjectileHits(player);
    this.updateParticlesAndAfterimages(delta);

    if (wantsDash && Math.abs(player.vx) > pStats.maxRunSpeed * 0.84 && this.afterImageCooldown <= 0) {
      this.spawnAfterimage();
      this.afterImageCooldown = 0.05;
    }

    const goalRect = this.getGoalRect();
    const playerRect = this.getPlayerHitbox();
    if (goalRect && run.mode !== GAME_MODES.scoreAttack.id) {
      const clearStatus = this.getCampaignClearStatus();
      const gateX = goalRect.x + goalRect.w * 0.42;
      if (!clearStatus.canClear && player.x >= gateX) {
        player.x = gateX;
        player.vx = Math.min(0, player.vx);
        if (run.goalPromptCooldown <= 0) {
          this.showPrompt(clearStatus.message, 2.6);
          run.goalPromptCooldown = 0.75;
        }
      }
    }
    if (goalRect && rectsOverlap(playerRect, goalRect)) {
      const clearStatus = this.getCampaignClearStatus();
      if (clearStatus.canClear) {
        this.finishRun("clear");
        return;
      }
      if ((run.goalPromptCooldown ?? 0) <= 0) {
        this.showPrompt(clearStatus.message, 2.6);
        run.goalPromptCooldown = 0.75;
      }
    }

    if (player.hp <= 0) {
      this.finishRun("gameover");
      return;
    }

    const cameraTarget = clamp(player.x - CONFIG.width * 0.28 + player.facing * CONFIG.cameraLead, 0, this.level.stageLength - CONFIG.width);
    this.cameraX = lerp(this.cameraX, cameraTarget, delta * 4.2);
  }

  updateRunVisuals(delta) {
    if (!this.runState) {
      return;
    }
    this.runState.player.animClock += delta;
    this.updateParticlesAndAfterimages(delta);
  }

  updateScoreAttackLevel() {
    const run = this.runState;
    const player = run?.player;
    if (!run || run.mode !== GAME_MODES.scoreAttack.id || !player) {
      return;
    }
    extendScoreAttackLevel(this.level, player.x + CONFIG.scoreAttackGenerateAhead);

    const boss = this.level.boss;
    if (boss && !boss.defeated && player.x > boss.x + 560) {
      this.level.boss = null;
      this.level.nextBossX = player.x + randRange(this.level.rng, CONFIG.scoreAttackBossMinGap, CONFIG.scoreAttackBossMaxGap);
      this.showPrompt("ボスをスルー！収穫を続けよう", 1.8);
    } else if (boss && boss.defeated && (boss.deadTimer ?? 0) <= 0) {
      this.level.boss = null;
      this.level.nextBossX = player.x + randRange(this.level.rng, CONFIG.scoreAttackBossMinGap, CONFIG.scoreAttackBossMaxGap);
    }

    if (!this.level.boss && player.x + CONFIG.width * 1.1 >= this.level.nextBossX) {
      this.level.boss = createScoreAttackBoss(this.level, this.level.nextBossX);
      this.showPrompt("ボス出現！倒してもスルーしてもOK", 1.8);
    }
  }

  activateBomb() {
    const run = this.runState;
    const player = run?.player;
    if (!run || !player || this.scene !== "playing") {
      return;
    }
    if (!run.bombReady) {
      this.showPrompt("BOMBはこのステージではもう使えません", 1.3);
      this.audio.playSe("hit");
      return;
    }
    run.bombReady = false;
    run.bombTimer = CONFIG.bombDuration;
    run.bombAllyClock = 0;
    run.bombAllies = CHARACTERS
      .filter((character) => character.id !== run.selectedCharacterId)
      .map((character, index) => ({
        characterId: character.id,
        side: index === 0 ? -1 : 1,
        delay: index * 0.18,
      }));
    run.bombCutinTimer = CONFIG.bombCutinDuration;
    run.bombFlashTimer = 0.65;
    player.powerTimer = Math.max(player.powerTimer, CONFIG.bombDuration);
    player.invulnerable = Math.max(player.invulnerable, 0.35);
    player.vy = 0;
    this.audio.setPlaybackRate(CONFIG.bombMusicRate);
    this.spawnDustBurst(player.x, player.y - 42, 30, "clear");
    this.spawnBerryBurst(player.x, player.y - 48, true, player.facing);
    this.startShake(0.58, 12);
    this.showPrompt("BOMB発動！3人チームで大冒険", 2.2);
    this.audio.playSe("bomb");
    if (run.mode === GAME_MODES.scoreAttack.id) {
      this.spawnScoreAttackBombBerries();
    }
  }

  spawnScoreAttackBombBerries() {
    const run = this.runState;
    const player = run?.player;
    if (!run || !player || run.mode !== GAME_MODES.scoreAttack.id) {
      return;
    }
    for (let index = 0; index < CONFIG.bombScoreAttackBerryBurst; index += 1) {
      const row = index % 5;
      const col = Math.floor(index / 5);
      this.level.collectibles.push({
        id: `rush-bomb-${Date.now()}-${index}`,
        x: Math.round(player.x + 260 + col * 112 + (row % 2) * 38),
        y: 238 + row * 31 + Math.sin(index) * 8,
        type: "touch",
      });
    }
  }

  updateObstacles(delta) {
    this.level.obstacles.forEach((obstacle, index) => {
      if (obstacle.defeated) {
        obstacle.deadTimer = Math.max(0, (obstacle.deadTimer ?? 0) - delta);
        return;
      }
      obstacle.phase = (obstacle.phase || index * 0.9) + delta;
      obstacle.renderX = obstacle.x;
      obstacle.renderY = obstacle.y;
      if (DEFEATABLE_OBSTACLE_TYPES.has(obstacle.type) && obstacle.movement === "sine") {
        obstacle.renderX = obstacle.x + Math.sin(obstacle.phase * obstacle.speed) * obstacle.amplitude;
        obstacle.renderY = obstacle.y + Math.sin(obstacle.phase * obstacle.speed * 1.7) * 3;
      } else if (DEFEATABLE_OBSTACLE_TYPES.has(obstacle.type) && obstacle.movement === "hop") {
        obstacle.renderX = obstacle.x + Math.sin(obstacle.phase * obstacle.speed) * obstacle.amplitude;
        obstacle.renderY = obstacle.y - Math.abs(Math.sin(obstacle.phase * obstacle.speed)) * 14;
      } else if (DEFEATABLE_OBSTACLE_TYPES.has(obstacle.type) && obstacle.movement === "vertical") {
        obstacle.renderY = obstacle.y + Math.sin(obstacle.phase * obstacle.speed) * obstacle.amplitude;
        obstacle.renderX = obstacle.x + Math.sin(obstacle.phase * obstacle.speed * 0.55) * 18;
      }
    });
  }

  updateBoss(delta) {
    const boss = this.level.boss;
    if (!boss) {
      return;
    }
    boss.phase = (boss.phase || 0) + delta;
    boss.hurtCooldown = Math.max(0, (boss.hurtCooldown ?? 0) - delta);
    boss.hitFlash = Math.max(0, (boss.hitFlash ?? 0) - delta);
    if (boss.defeated) {
      boss.deadTimer = Math.max(0, (boss.deadTimer ?? 0) - delta);
      return;
    }
    boss.renderX = boss.x;
    boss.renderY = boss.y;
    if (boss.movement === "hover") {
      boss.renderY = boss.y + Math.sin(boss.phase * 2.1) * 8;
      boss.renderX = boss.x + Math.sin(boss.phase * 1.2) * 18;
    } else if (boss.movement === "hop") {
      boss.renderY = boss.y - Math.abs(Math.sin(boss.phase * 2.4)) * 18;
      boss.renderX = boss.x + Math.sin(boss.phase * 1.1) * 14;
    } else if (boss.movement === "guard") {
      boss.renderY = boss.y + Math.sin(boss.phase * 1.5) * 5;
      boss.renderX = boss.x + Math.sin(boss.phase * 0.8) * 10;
    } else if (boss.movement === "swoop") {
      boss.renderX = boss.x + Math.sin(boss.phase * 1.8) * 74;
      boss.renderY = boss.y + Math.sin(boss.phase * 3.0) * 42;
      this.updateBossAttack(boss, delta, "spore");
    } else if (boss.movement === "zigzag") {
      boss.renderX = boss.x + Math.sin(boss.phase * 3.0) * 88;
      boss.renderY = boss.y + Math.sin(boss.phase * 2.1) * 56;
      this.updateBossAttack(boss, delta, "laser");
    }
  }

  updateBossAttack(boss, delta, kind) {
    const run = this.runState;
    if (!run || run.mode === GAME_MODES.scoreAttack.id) {
      return;
    }
    boss.attackCooldown = Math.max(0, (boss.attackCooldown ?? (kind === "laser" ? 1.15 : 1.6)) - delta);
    if (boss.attackCooldown > 0) {
      return;
    }
    const player = run.player;
    const fromX = boss.renderX ?? boss.x;
    const fromY = (boss.renderY ?? boss.y) - 18;
    if (kind === "laser") {
      run.bossProjectiles.push({
        type: "laser",
        x: fromX - 82,
        y: fromY + Math.sin(boss.phase * 4) * 18,
        vx: -420,
        vy: clamp((player.y - fromY) * 1.05, -180, 180),
        w: 58,
        h: 12,
        life: 2.4,
      });
      boss.attackCooldown = 1.05;
    } else {
      for (let index = 0; index < 3; index += 1) {
        run.bossProjectiles.push({
          type: "spore",
          x: fromX - 46 - index * 8,
          y: fromY + index * 16,
          vx: -210 - index * 34,
          vy: -70 + index * 72,
          w: 24,
          h: 24,
          life: 2.8,
        });
      }
      boss.attackCooldown = 1.65;
    }
  }

  throwProjectile() {
    const run = this.runState;
    const player = run?.player;
    if (!run || !player || player.attackCooldown > 0 || this.scene !== "playing") {
      return;
    }
    if (run.bombTimer <= 0) {
      if (run.strawberries <= 0) {
        player.attackCooldown = 0.16;
        this.showPrompt("手持ちいちごがないと投げられない", 1.4);
        this.audio.playSe("hit");
        return;
      }
      run.strawberries -= 1;
      run.spentStrawberries = (run.spentStrawberries ?? 0) + 1;
    }
    player.attackCooldown = CONFIG.throwCooldown;
    player.throwPoseTimer = 0.22;
    run.projectiles.push({
      x: player.x + player.facing * 24,
      y: player.y - 34,
      vx: player.facing * CONFIG.projectileSpeed,
      vy: CONFIG.projectileLift + Math.min(0, player.vy * 0.2),
      facing: player.facing,
      rotation: 0,
      spin: 0,
      life: 1.3,
      explosive: run.bombTimer > 0,
    });
    this.audio.playSe("throw");
  }

  getCampaignClearStatus() {
    const run = this.runState;
    if (!run || run.mode === GAME_MODES.scoreAttack.id) {
      return { canClear: false, message: "" };
    }
    const bossCleared = !this.level.boss || this.level.boss.defeated;
    const requiredBerries = Math.ceil((run.stageTotalBerries ?? 0) * CONFIG.stageClearBerryRate);
    const enoughBerries = (run.stageStrawberries ?? 0) >= requiredBerries;
    if (bossCleared && enoughBerries) {
      return { canClear: true, message: "" };
    }
    if (!bossCleared && !enoughBerries) {
      return {
        canClear: false,
        message: `ボスを倒して、いちごをあと${formatNumber(Math.max(0, requiredBerries - (run.stageStrawberries ?? 0)))}個集めないとクリアできないよ`,
      };
    }
    if (!bossCleared) {
      return { canClear: false, message: "ボスを倒さないとクリアできないよ" };
    }
    return {
      canClear: false,
      message: `いちごをあと${formatNumber(Math.max(0, requiredBerries - (run.stageStrawberries ?? 0)))}個集めないとクリアできないよ`,
    };
  }

  updateProjectiles(delta) {
    const run = this.runState;
    if (!run) {
      return;
    }
    run.projectiles = run.projectiles.filter((projectile) => {
      projectile.life -= delta;
      projectile.x += projectile.vx * delta;
      projectile.y += projectile.vy * delta;
      projectile.vy += CONFIG.projectileGravity * delta;
      projectile.rotation = Math.atan2(projectile.vy, projectile.vx) * 0.12;

      if (projectile.life <= 0 || projectile.x < -60 || projectile.x > this.level.stageLength + 60 || projectile.y > CONFIG.height + 80) {
        if (projectile.explosive && projectile.life <= 0) {
          this.explodeProjectile(projectile.x, projectile.y);
        }
        return false;
      }

      for (const obstacle of this.level.obstacles) {
        if (obstacle.defeated || !DEFEATABLE_OBSTACLE_TYPES.has(obstacle.type)) {
          continue;
        }
        const obstacleRect = this.getObstacleHitbox(obstacle);
        const shotRect = { x: projectile.x - 18, y: projectile.y - 12, w: 36, h: 24 };
        if (rectsOverlap(shotRect, obstacleRect)) {
          if (projectile.explosive) {
            this.explodeProjectile(projectile.x, projectile.y);
          } else {
            this.defeatBug(obstacle, "projectile");
          }
          return false;
        }
      }

      const boss = this.level.boss;
      if (boss && !boss.defeated && rectsOverlap({ x: projectile.x - 18, y: projectile.y - 12, w: 36, h: 24 }, this.getBossHitbox())) {
        if (projectile.explosive) {
          this.explodeProjectile(projectile.x, projectile.y);
        } else {
          this.damageBoss(1, "projectile");
        }
        return false;
      }

      return true;
    });
  }

  explodeProjectile(x, y) {
    const run = this.runState;
    if (!run) {
      return;
    }
    const radius = CONFIG.bombExplosionRadius;
    this.spawnBombExplosion(x, y, radius);
    this.spawnDustBurst(x, y, 90, "clear");
    this.spawnBerryBurst(x, y, true, run.player.facing);
    this.startShake(0.68, 22);
    this.audio.playSe("bomb");
    for (const obstacle of this.level.obstacles) {
      if (obstacle.defeated || !DEFEATABLE_OBSTACLE_TYPES.has(obstacle.type)) {
        continue;
      }
      const cx = obstacle.renderX ?? obstacle.x;
      const cy = obstacle.renderY ?? obstacle.y;
      if (Math.hypot(cx - x, cy - y) <= radius) {
        this.defeatBug(obstacle, "projectile");
      }
    }
    const boss = this.level.boss;
    if (boss && !boss.defeated) {
      const bx = boss.renderX ?? boss.x;
      const by = boss.renderY ?? boss.y;
      if (Math.hypot(bx - x, by - y) <= radius + boss.w * 0.5) {
        this.damageBoss(3, "projectile");
      }
    }
  }

  updateBossProjectiles(delta) {
    const run = this.runState;
    if (!run?.bossProjectiles) {
      return;
    }
    run.bossProjectiles = run.bossProjectiles.filter((shot) => {
      shot.life -= delta;
      shot.x += shot.vx * delta;
      shot.y += shot.vy * delta;
      if (shot.type === "spore") {
        shot.vy += 180 * delta;
      }
      return shot.life > 0 && shot.x > this.cameraX - 180 && shot.y < CONFIG.height + 120;
    });
  }

  checkBossProjectileHits(player) {
    const run = this.runState;
    if (!run?.bossProjectiles || player.powerTimer > 0 || player.invulnerable > 0) {
      return;
    }
    const playerRect = this.getPlayerHitbox();
    for (const shot of run.bossProjectiles) {
      const rect = { x: shot.x - shot.w / 2, y: shot.y - shot.h / 2, w: shot.w, h: shot.h };
      if (!rectsOverlap(playerRect, rect)) {
        continue;
      }
      shot.life = 0;
      player.hp = Math.max(0, player.hp - 1);
      player.invulnerable = CONFIG.invulnerableSeconds;
      player.hurtTimer = 0.36;
      player.vx = -player.facing * 180;
      player.vy = -230;
      run.damageTaken += 1;
      run.stageDamageTaken += 1;
      this.startShake(0.36, 9);
      this.spawnDustBurst(player.x, player.y - 18, 12, "damage");
      this.audio.playSe("damage");
      break;
    }
  }

  defeatBug(obstacle, source) {
    const run = this.runState;
    if (!run || obstacle.defeated) {
      return;
    }
    obstacle.defeated = true;
    obstacle.deadTimer = 0.26;
    obstacle.renderX = obstacle.renderX ?? obstacle.x;
    obstacle.renderY = obstacle.renderY ?? obstacle.y;
    run.score += source === "projectile" ? CONFIG.projectileScore : CONFIG.stompScore;
    this.spawnDustBurst(obstacle.renderX, obstacle.renderY + 10, 10, "damage");
    this.spawnBerryBurst(obstacle.renderX, obstacle.renderY - 4, false);
    this.audio.playSe(source === "projectile" ? "hit" : "stomp");
  }

  updateParticlesAndAfterimages(delta) {
    const run = this.runState;
    if (!run) {
      return;
    }
    run.particles = run.particles.filter((particle) => {
      particle.life -= delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.vy += particle.gravity * delta;
      particle.rotation += particle.spin * delta;
      return particle.life > 0;
    });
    run.afterimages = run.afterimages.filter((ghost) => {
      ghost.life -= delta;
      return ghost.life > 0;
    });
  }

  findNearestActionBerry(player) {
    let best = null;
    let bestDistance = 9999;
    for (const berry of this.level.collectibles) {
      if (berry.collected || berry.type !== "action") {
        continue;
      }
      const dx = Math.abs(player.x - berry.x);
      const dy = Math.abs((player.y - 12) - berry.y);
      if (dx < 64 && dy < 42 && dx + dy < bestDistance) {
        best = berry;
        bestDistance = dx + dy;
      }
    }
    return best;
  }

  checkTouchCollectibles(player) {
    const playerRect = this.getPlayerHitbox();
    for (const berry of this.level.collectibles) {
      if (berry.collected || berry.type !== "touch") {
        continue;
      }
      const rect = { x: berry.x - 14, y: berry.y - 18, w: 28, h: 28 };
      if (rectsOverlap(playerRect, rect)) {
        this.collectBerry(berry, "touch");
      }
    }
  }

  collectBerry(berry, mode) {
    const run = this.runState;
    if (!run || berry.collected) {
      return;
    }
    berry.collected = true;
    run.strawberries += 1;
    run.harvestedStrawberries = (run.harvestedStrawberries ?? 0) + 1;
    run.stageStrawberries += 1;
    run.combo = run.comboTimer > 0 ? run.combo + 1 : 1;
    run.comboTimer = CONFIG.comboWindowMs;
    run.comboFlash = 0.6;
    run.maxCombo = Math.max(run.maxCombo, run.combo);
    const multiplier = 1 + Math.max(0, run.combo - 1) * 0.2;
    run.score += Math.round(100 * multiplier);
    this.spawnBerryBurst(berry.x, berry.y, mode === "action", run.player.facing);
    this.audio.playSe("berry");
    if (run.combo >= 2) {
      this.audio.playSe("combo");
    }
    this.pendingPrompt = "";
    this.promptTimer = 0;
  }

  checkPowerups(player) {
    const playerRect = this.getPlayerHitbox();
    for (const item of this.level.powerups) {
      if (item.collected) {
        continue;
      }
      const rect = { x: item.x - 22, y: item.y - 26, w: 44, h: 44 };
      if (rectsOverlap(playerRect, rect)) {
        this.collectPowerup(item);
      }
    }
  }

  checkSignPostCheckpoints(player) {
    const run = this.runState;
    if (!run) {
      return;
    }
    const signs = this.level.decorations.signPosts;
    for (let i = run.lastPassedSignIndex + 1; i < signs.length; i++) {
      // Sign posts are visual save markers only; they never block or damage the player.
      if (player.x >= signs[i].x) {
        run.lastPassedSignIndex = i;
        run.checkpoint = { x: signs[i].x, stageIndex: run.stageIndex, label: signs[i].label, state: null };
        run.checkpoint.state = this.createCheckpointState(signs[i].x);
        run.checkpointNotice = `✓ CHECKPOINT: ${signs[i].label}`;
        run.checkpointNoticeTimer = 2.5;
        this.audio.playSe("berry");
      }
    }
  }

  collectPowerup(item) {
    const run = this.runState;
    if (!run || item.collected) {
      return;
    }
    item.collected = true;
    if (item.type === "ramen") {
      run.player.hp = Math.min(CONFIG.maxHp, run.player.hp + 1);
      run.score += CONFIG.ramenScore;
      this.spawnDustBurst(item.x, item.y, 10, "clear");
      this.audio.playSe("heal");
      return;
    }
    if (item.type === "star") {
      if (run.bombTimer > 0) {
        run.bombTimer += CONFIG.bombStarBonusSeconds;
        run.player.powerTimer = Math.max(run.player.powerTimer, run.bombTimer);
        run.player.invulnerable = Math.max(run.player.invulnerable, 0.35);
        run.score += CONFIG.powerScore;
        this.spawnBombExplosion(item.x, item.y, CONFIG.bombExplosionRadius * 0.44);
        this.spawnBerryBurst(item.x, item.y, true, run.player.facing);
        this.startShake(0.28, 8);
        this.showPrompt(`スターでBOMB +${CONFIG.bombStarBonusSeconds}秒！`, 1.8);
        this.audio.playSe("power");
        return;
      }
      run.player.powerTimer = CONFIG.powerDuration;
      run.player.invulnerable = Math.max(run.player.invulnerable, 0.35);
      run.score += CONFIG.powerScore;
      this.spawnBerryBurst(item.x, item.y, true, run.player.facing);
      this.startShake(0.18, 4.5);
      this.audio.playSe("power");
    }
  }

  damageBoss(amount, source) {
    const run = this.runState;
    const boss = this.level.boss;
    if (!run || !boss || boss.defeated || boss.hurtCooldown > 0) {
      return false;
    }
    boss.hp = Math.max(0, boss.hp - amount);
    boss.hurtCooldown = source === "power" ? 0.18 : 0.28;
    boss.hitFlash = 0.18;
    run.score += CONFIG.bossHitScore * amount;
    this.spawnDustBurst(boss.renderX ?? boss.x, (boss.renderY ?? boss.y) - 16, 12, "damage");
    this.startShake(0.2, source === "stomp" ? 6 : 4);
    this.audio.playSe("boss");
    if (boss.hp <= 0) {
      boss.defeated = true;
      boss.deadTimer = 0.55;
      run.score += CONFIG.bossClearScore + this.level.stageIndex * 220;
      this.spawnDustBurst(boss.renderX ?? boss.x, boss.renderY ?? boss.y, 28, "clear");
      this.spawnBerryBurst(boss.renderX ?? boss.x, (boss.renderY ?? boss.y) - 24, true, run.player.facing);
      this.audio.playSe("clear");
    this.showPrompt(run.mode === GAME_MODES.scoreAttack.id ? "ボス撃破！スコア大量獲得" : "ゴールゲートが開いた！", 1.9);
    }
    return true;
  }

  checkBossHits(player) {
    const boss = this.level.boss;
    if (!boss || boss.defeated) {
      return;
    }
    const playerRect = this.getPlayerHitbox();
    const bossRect = this.getBossHitbox();
    if (!rectsOverlap(playerRect, bossRect)) {
      return;
    }
    const playerBottom = playerRect.y + playerRect.h;
    const stompLine = bossRect.y + bossRect.h * 0.42;
    const stomp = player.vy > 140 && playerBottom <= stompLine + 18;
    if (player.powerTimer > 0) {
      if (this.damageBoss(2, "power")) {
        player.vy = CONFIG.stompBounceVelocity * 0.72;
        player.onGround = false;
      }
      return;
    }
    if (stomp) {
      player.vy = CONFIG.stompBounceVelocity;
      player.onGround = false;
      this.damageBoss(1, "stomp");
      return;
    }
    if (player.invulnerable > 0) {
      return;
    }
    player.hp = Math.max(0, player.hp - 1);
    player.invulnerable = CONFIG.invulnerableSeconds;
    player.hurtTimer = 0.36;
    player.vx = -player.facing * 190;
    player.vy = -260;
    this.runState.damageTaken += 1;
    this.runState.stageDamageTaken += 1;
    this.startShake(0.42, 10);
    this.spawnDustBurst(player.x, player.y - 18, 14, "damage");
    this.audio.playSe("damage");
  }

  checkObstacleHits(player) {
    if (player.invulnerable > 0 && player.powerTimer <= 0) {
      return;
    }
    const playerRect = this.getPlayerHitbox();
    for (const obstacle of this.level.obstacles) {
      if (obstacle.defeated || NON_COLLIDING_OBSTACLE_TYPES.has(obstacle.type)) {
        continue;
      }
      const obstacleRect = this.getObstacleHitbox(obstacle);
      if (rectsOverlap(playerRect, obstacleRect)) {
        if (player.powerTimer > 0) {
          if (DEFEATABLE_OBSTACLE_TYPES.has(obstacle.type)) {
            this.defeatBug(obstacle, "power");
          }
          continue;
        }
        const playerBottom = playerRect.y + playerRect.h;
        const stompLine = obstacleRect.y + obstacleRect.h * 0.48;
        const fallingFastEnough = player.vy > 120;
        if (DEFEATABLE_OBSTACLE_TYPES.has(obstacle.type) && fallingFastEnough && playerBottom <= stompLine + 12) {
          player.vy = CONFIG.stompBounceVelocity;
          player.onGround = false;
          this.defeatBug(obstacle, "stomp");
          return;
        }
        player.hp = Math.max(0, player.hp - obstacle.damage);
        player.invulnerable = CONFIG.invulnerableSeconds;
        player.hurtTimer = 0.36;
        player.vx = -player.facing * 160;
        player.vy = -220;
        this.runState.damageTaken += 1;
        this.startShake(0.36, 8.5);
        this.spawnDustBurst(player.x, player.y - 18, 10, "damage");
        this.audio.playSe("damage");
        this.runState.stageDamageTaken += 1;
        break;
      }
    }
  }

  finishRun(kind) {
    const run = this.runState;
    if (!run || this.scene !== "playing") {
      return;
    }
    if (run.mode === GAME_MODES.scoreAttack.id) {
      this.finishScoreAttack();
      return;
    }
    this.audio.setPlaybackRate(1);
    run.finishKind = kind;
    const hpBonus = run.player.hp * 250;
    const noDamageBonus = kind === "clear" && run.stageDamageTaken === 0 ? 500 : 0;
    const timeBonus = kind === "clear" ? Math.max(0, Math.round((55 - run.stageTime) * 24)) : 0;
    const clearBonus = kind === "clear" ? 700 + run.stageIndex * 180 : 0;
    const finalScore = run.score + hpBonus + noDamageBonus + timeBonus + clearBonus;
    run.bonuses = { hpBonus, noDamageBonus, timeBonus, clearBonus };
    run.score = finalScore;
    if (kind === "clear") {
      const parts = [
        `${this.level.jpName} クリア ${formatNumber(clearBonus)} 点`,
        `残り HP ${formatNumber(hpBonus)} 点`,
      ];
      if (noDamageBonus > 0) {
        parts.push(`ノーダメージ ${formatNumber(noDamageBonus)} 点`);
      }
      if (timeBonus > 0) {
        parts.push(`タイム ${formatNumber(timeBonus)} 点`);
      }
      run.summary = `${parts.join(" / ")} を加算しました。`;
    } else {
      const cpLabel = run.checkpoint?.label ?? "スタート";
      const hasCheckpointProgress = (run.checkpoint?.x ?? 120) > 120 || (run.checkpoint?.stageIndex ?? 0) > 0;
      run.summary = hasCheckpointProgress
        ? `今回は ${this.level.jpName} でゲームオーバー。チェックポイント「${cpLabel}」からRETRYできます。`
        : `今回は ${this.level.jpName} でゲームオーバーです。RETRY でステージ1から再挑戦できます。`;
    }

    if (finalScore > this.bestScore) {
      this.bestScore = finalScore;
      this.saveBestScore(finalScore);
    }

    if (kind === "clear") {
      this.audio.playSe("clear");
      this.spawnDustBurst(run.player.x, run.player.y - 36, 22, "clear");
      this.els.messageEyebrow.textContent = `${this.level.title} Clear`;
      this.els.messageTitle.textContent = run.stageIndex < STAGE_CONFIGS.length - 1 ? "次の温室へ進もう！" : "5ステージクリア！";
      this.els.messageBody.textContent =
        run.stageIndex < STAGE_CONFIGS.length - 1
          ? `${this.level.jpName} を突破しました。応援メンバーと合流して次のステージへ進みます。`
          : "最後のボスを越えて、いちごトレイがいっぱいになりました。";
      this.sceneTimer = CONFIG.clearDelay;
    } else {
      const cpLabel = run.checkpoint?.label ?? "スタート";
      const hasCheckpointProgress = (run.checkpoint?.x ?? 120) > 120 || (run.checkpoint?.stageIndex ?? 0) > 0;
      this.audio.playSe("gameover");
      this.els.messageEyebrow.textContent = "Game Over";
      this.els.messageTitle.textContent = `${this.getCharacter(run.selectedCharacterId).name}がつかれちゃった`;
      this.els.messageBody.textContent = hasCheckpointProgress
        ? `チェックポイント「${cpLabel}」からRETRYできます。障害物を避けるタイミングを少し早めると安定します。`
        : "障害物を避けるタイミングを少し早めると、次は安定して進めます。";
      this.sceneTimer = CONFIG.gameOverDelay;
    }

    this.pause = false;
    this.setScene(kind);
    this.updateUi();
  }

  finishScoreAttack() {
    const run = this.runState;
    if (!run) {
      return;
    }
    this.audio.setPlaybackRate(1);
    run.finishKind = "gameover";
    run.bonuses = { hpBonus: 0, noDamageBonus: 0, timeBonus: 0, clearBonus: 0 };
    const ranking = this.recordScoreAttackScore(run);
    run.scoreAttackRanking = ranking.scores;
    run.scoreAttackRecordId = ranking.record.id;
    run.scoreAttackRank = ranking.rank > 0 ? ranking.rank : null;
    run.summary = ranking.rank > 0
      ? `いちごラッシュ終了。収穫 ${formatNumber(run.harvestedStrawberries ?? 0)} 個、手持ち ${formatNumber(run.strawberries)} 個で、ランキング ${ranking.rank} 位に入りました。`
      : `いちごラッシュ終了。収穫 ${formatNumber(run.harvestedStrawberries ?? 0)} 個、手持ち ${formatNumber(run.strawberries)} 個でした。上位5位更新は次回狙えます。`;
    this.audio.playSe("gameover");
    this.els.messageEyebrow.textContent = "Score Attack";
    this.els.messageTitle.textContent = "いちごラッシュ終了";
    this.els.messageBody.textContent = "HPがなくなりました。RETRYでランダム配置を作り直して再挑戦できます。";
    this.sceneTimer = CONFIG.gameOverDelay;
    this.pause = false;
    this.setScene("gameover");
    this.updateUi();
  }

  retryFromCheckpoint() {
    if (this.resultData?.mode === GAME_MODES.scoreAttack.id || this.runState?.mode === GAME_MODES.scoreAttack.id) {
      this.startScoreAttack();
      return;
    }
    if (this.resultData?.kind === "clear" && this.resultData.stageIndex === STAGE_CONFIGS.length - 1) {
      this.startGame(0);
      return;
    }
    const cp = this.resultData?.checkpoint ?? this.runState?.checkpoint;
    if (cp && (cp.x > 120 || cp.stageIndex > 0)) {
      const retryCarry = cp.state
        ? { ...cp.state, startX: cp.x, checkpointLabel: cp.label }
        : { startX: cp.x, checkpointLabel: cp.label };
      retryCarry.hp = CONFIG.maxHp;
      retryCarry.powerTimer = CONFIG.powerDuration;
      retryCarry.invulnerable = 0.35;
      this.startGame(cp.stageIndex, retryCarry);
    } else {
      this.startGame(0);
    }
  }

  startNextStage() {
    const run = this.runState;
    if (!run) {
      return;
    }
    const carry = {
      hp: run.player.hp,
      powerTimer: 0,
      score: run.score,
      strawberries: run.strawberries,
      harvestedStrawberries: run.harvestedStrawberries,
      maxCombo: run.maxCombo,
      damageTaken: run.damageTaken,
      time: run.time,
    };
    this.startGame(run.stageIndex + 1, carry);
  }

  openResult() {
    const run = this.runState;
    if (!run) {
      return;
    }
    this.resultData = {
      mode: run.mode ?? GAME_MODES.campaign.id,
      kind: run.finishKind,
      score: run.score,
      best: run.mode === GAME_MODES.scoreAttack.id ? (this.scoreAttackScores[0]?.score ?? run.score) : this.bestScore,
      berries: run.strawberries,
      harvestedStrawberries: run.harvestedStrawberries ?? run.strawberries,
      spentStrawberries: run.spentStrawberries ?? 0,
      totalBerries: run.totalBerries,
      maxCombo: run.maxCombo,
      hp: run.player.hp,
      time: run.time,
      stageIndex: run.stageIndex,
      stageName: run.stageName,
      summary: run.summary,
      bonuses: run.bonuses,
      checkpoint: run.checkpoint,
      scoreAttackRanking: run.scoreAttackRanking ?? this.scoreAttackScores,
      scoreAttackRecordId: run.scoreAttackRecordId ?? null,
      scoreAttackRank: run.scoreAttackRank ?? null,
    };
    const isScoreAttack = this.resultData.mode === GAME_MODES.scoreAttack.id;
    this.els.resultEyebrow.textContent = isScoreAttack ? "Strawberry Rush Result" : run.finishKind === "clear" ? "Clear Result" : "Retry Result";
    this.els.resultTitle.textContent = isScoreAttack ? "いちごラッシュ結果" : run.finishKind === "clear" ? "全5ステージクリア" : "ゲームオーバー";
    this.els.resultScore.textContent = `${formatNumber(this.resultData.score)} 点`;
    this.els.resultBest.textContent = `${formatNumber(this.resultData.best)} 点`;
    this.els.resultBerry.textContent = isScoreAttack
      ? `収穫 ${formatNumber(this.resultData.harvestedStrawberries)} / 手持ち ${formatNumber(this.resultData.berries)}`
      : `収穫 ${formatNumber(this.resultData.harvestedStrawberries)} / 手持ち ${formatNumber(this.resultData.berries)}`;
    this.els.resultCombo.textContent = `x${this.resultData.maxCombo}`;
    this.els.resultHp.textContent = String(this.resultData.hp);
    this.els.resultTime.textContent = formatSeconds(this.resultData.time);
    this.els.resultSummary.textContent = this.resultData.summary;
    this.renderScoreAttackRanking(isScoreAttack ? this.resultData.scoreAttackRanking : [], this.resultData.scoreAttackRecordId);
    this.setScene("result");
    this.updateUi();
  }

  renderScoreAttackRanking(scores, currentId = null) {
    const list = this.els.scoreAttackRanking;
    if (!list) {
      return;
    }
    list.classList.toggle("hidden", scores.length === 0);
    list.replaceChildren();
    scores.forEach((entry, index) => {
      const item = document.createElement("li");
      if (entry.id === currentId) {
        item.classList.add("current-rank");
      }
      item.textContent = `${index + 1}位 ${formatNumber(entry.score)}点 / 収穫${formatNumber(entry.strawberries)}個 / ${entry.characterName}`;
      list.appendChild(item);
    });
  }

  spawnDustBurst(x, y, amount, type) {
    const run = this.runState;
    if (!run) {
      return;
    }
    for (let index = 0; index < amount; index += 1) {
      const speed = 20 + Math.random() * 60;
      const angle = type === "clear" ? Math.random() * Math.PI * 2 : Math.PI + (Math.random() - 0.5) * 1.8;
      run.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (type === "clear" ? 18 : 0),
        gravity: type === "clear" ? -16 : 120,
        life: type === "clear" ? 0.9 : 0.48,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 8,
        size: type === "damage" ? 3 + Math.random() * 3 : 4 + Math.random() * 4,
        color:
          type === "clear"
            ? ["rgba(255, 255, 255, 0.85)", "rgba(255, 213, 92, 0.75)", "rgba(240, 100, 104, 0.75)"][index % 3]
            : ["rgba(181, 146, 101, 0.65)", "rgba(145, 110, 72, 0.52)", "rgba(255, 241, 205, 0.62)"][index % 3],
      });
    }
  }

  spawnBerryBurst(x, y, withTrail, facing = 1) {
    const run = this.runState;
    if (!run) {
      return;
    }
    for (let index = 0; index < 14; index += 1) {
      const angle = (Math.PI * 2 * index) / 14;
      const speed = 34 + Math.random() * 70;
      run.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 30,
        gravity: 118,
        life: 0.66 + Math.random() * 0.24,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 10,
        size: 3 + Math.random() * 4,
        color: ["rgba(255, 255, 255, 0.92)", "rgba(255, 208, 92, 0.8)", "rgba(240, 100, 104, 0.85)"][index % 3],
      });
    }
    if (withTrail) {
      for (let index = 0; index < 6; index += 1) {
        run.particles.push({
          x,
          y,
          vx: facing * (160 + Math.random() * 120),
          vy: -90 - Math.random() * 40,
          gravity: 180,
          life: 0.72,
          rotation: 0,
          spin: 0,
          size: 4 + Math.random() * 2,
          color: "rgba(255, 124, 154, 0.52)",
          trail: true,
        });
      }
    }
  }

  spawnBombExplosion(x, y, radius) {
    const run = this.runState;
    if (!run) {
      return;
    }
    run.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      gravity: 0,
      life: 0.62,
      rotation: 0,
      spin: 0,
      size: radius,
      color: "rgba(255, 231, 66, 0.52)",
      ring: true,
      totalLife: 0.74,
    });
    run.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      gravity: 0,
      life: 0.6,
      rotation: 0,
      spin: 0,
      size: radius * 0.74,
      color: "rgba(255, 78, 126, 0.52)",
      ring: true,
      totalLife: 0.6,
    });
    run.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      gravity: 0,
      life: 0.52,
      rotation: 0,
      spin: 0,
      size: radius * 0.46,
      color: "rgba(255, 255, 255, 0.68)",
      ring: true,
      totalLife: 0.52,
    });
    for (let index = 0; index < 64; index += 1) {
      const angle = (Math.PI * 2 * index) / 64;
      const speed = 220 + Math.random() * 430;
      run.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 80,
        life: 0.86 + Math.random() * 0.34,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 12,
        size: 6 + Math.random() * 8,
        color: ["rgba(255, 245, 142, 0.95)", "rgba(255, 72, 124, 0.86)", "rgba(255,255,255,0.94)", "rgba(255, 167, 64, 0.82)"][index % 4],
      });
    }
  }

  spawnAfterimage() {
    const run = this.runState;
    if (!run) {
      return;
    }
    const player = run.player;
    const animation = this.getPlayerAnimation();
    run.afterimages.push({
      x: player.x,
      y: player.y,
      facing: player.facing,
      animation: animation.name,
      frameIndex: animation.index,
      characterId: run.selectedCharacterId,
      life: 0.22,
      totalLife: 0.22,
    });
  }

  startShake(duration, power) {
    this.shakeTime = Math.max(this.shakeTime, duration);
    this.shakePower = Math.max(this.shakePower, power);
  }

  getPlayerHitbox() {
    const player = this.runState.player;
    return {
      x: player.x - player.width / 2,
      y: player.y - player.height,
      w: player.width,
      h: player.height,
    };
  }

  getObstacleHitbox(obstacle) {
    return {
      x: (obstacle.renderX ?? obstacle.x) - obstacle.w / 2,
      y: (obstacle.renderY ?? obstacle.y) - obstacle.h / 2,
      w: obstacle.w,
      h: obstacle.h,
    };
  }

  getBossHitbox() {
    const boss = this.level.boss;
    if (!boss) {
      return { x: 0, y: 0, w: 0, h: 0 };
    }
    return {
      x: (boss.renderX ?? boss.x) - boss.w / 2,
      y: (boss.renderY ?? boss.y) - boss.h / 2,
      w: boss.w,
      h: boss.h,
    };
  }

  getGoalRect() {
    if (!this.level.goal) {
      return null;
    }
    return {
      x: this.level.goal.x,
      y: this.level.goal.y,
      w: this.level.goal.w,
      h: this.level.goal.h,
    };
  }

  buildLoopAnimation(name, clock, fps, extra = {}, characterId = this.selectedCharacterId) {
    const frames = this.getCharacterSprites(characterId)?.[name] ?? [];
    if (frames.length <= 1) {
      return { name, index: 0, nextIndex: 0, mix: 0, yOffset: 0, rotation: 0, ...extra };
    }
    const cycle = clock * fps;
    const whole = Math.floor(cycle);
    return {
      name,
      index: whole % frames.length,
      nextIndex: (whole + 1) % frames.length,
      mix: smoothstep(cycle - whole),
      yOffset: 0,
      rotation: 0,
      ...extra,
    };
  }

  getPlayerAnimation() {
    if (this.scene === "result") {
      if (this.resultData?.kind === "clear") {
        return { name: "peace", index: 0, nextIndex: 0, mix: 0, yOffset: 0, rotation: 0 };
      }
      return { name: "down", index: 0, nextIndex: 0, mix: 0, yOffset: 0, rotation: 0 };
    }
    if (this.scene === "title") {
      const list = this.time % 6 < 3 ? "point" : "cheer";
      return this.buildLoopAnimation(list, this.time, 1.4, { yOffset: Math.sin(this.time * 2.4) * 2 });
    }
    if (this.scene === "howTo") {
      return { name: "point", index: 0, nextIndex: 0, mix: 0, yOffset: 0, rotation: 0 };
    }
    if (this.scene === "gameover") {
      return { name: "down", index: 0, nextIndex: 0, mix: 0, yOffset: 0, rotation: 0 };
    }
    if (this.scene === "clear") {
      return this.buildLoopAnimation("cheer", this.time, 1.8, { yOffset: Math.sin(this.time * 3.1) * 3 });
    }

    const player = this.runState?.player;
    if (!player) {
      return { name: "point", index: 0, nextIndex: 0, mix: 0, yOffset: 0, rotation: 0 };
    }

    if (player.hurtTimer > 0) {
      return this.buildLoopAnimation("damageSmall", player.animClock, 12, { rotation: -player.facing * 0.04 });
    }
    if (player.pickTimer > 0) {
      const frames = this.getCharacterSprites(this.runState?.selectedCharacterId)?.pick ?? this.getCharacterSprites()?.pick ?? [];
      const progress = 1 - player.pickTimer / 0.42;
      return {
        name: "pick",
        index: clamp(Math.floor(progress * frames.length), 0, Math.max(0, frames.length - 1)),
        nextIndex: clamp(Math.floor(progress * frames.length), 0, Math.max(0, frames.length - 1)),
        mix: 0,
        yOffset: 0,
        rotation: 0,
      };
    }
    if (player.throwPoseTimer > 0) {
      return { name: "point", index: 0, nextIndex: 0, mix: 0, yOffset: -1.5, rotation: player.facing * 0.02 };
    }
    if (!player.onGround) {
      const ps = this.runState?.playerStats ?? CONFIG;
      return { name: "jump", index: 0, nextIndex: 0, mix: 0, yOffset: 0, rotation: clamp(player.vx / ps.maxDashSpeed, -1, 1) * 0.06 };
    }
    const speed = Math.abs(player.vx);
    const ps = this.runState?.playerStats ?? CONFIG;
    if (speed > 160) {
      const name = player.facing >= 0 ? "dashRight" : "dashLeft";
      return this.buildLoopAnimation(name, player.animClock, 8.5, {
        yOffset: Math.sin(player.animClock * 17) * 1.2,
        rotation: clamp(player.vx / ps.maxDashSpeed, -1, 1) * 0.07,
      });
    }
    if (speed > 30) {
      const name = player.facing >= 0 ? "runRight" : "runLeft";
      return this.buildLoopAnimation(name, player.animClock, 6.2, {
        yOffset: Math.sin(player.animClock * 12.4) * 1.6,
        rotation: clamp(player.vx / ps.maxRunSpeed, -1, 1) * 0.03,
      });
    }
    return { name: "idle", index: 0, nextIndex: 0, mix: 0, yOffset: Math.sin(this.time * 2.6) * 1.1, rotation: 0 };
  }

  updateUi() {
    const run = this.runState;
    const activeBest = run?.mode === GAME_MODES.scoreAttack.id || (!run && this.selectedMode === GAME_MODES.scoreAttack.id)
      ? (this.scoreAttackScores[0]?.score ?? 0)
      : this.bestScore;
    this.els.hudBest.textContent = formatNumber(activeBest);
    this.els.hudBgm.textContent = this.audio.bgmEnabled && this.audio.bgmAvailable ? "ON" : "OFF";
    this.updateBgmButtons();
    const shell = document.querySelector(".game-shell");
    shell?.classList.toggle("bomb-active", Boolean(run?.bombTimer > 0));

    if (!run) {
      this.els.hudHp.textContent = String(CONFIG.maxHp);
      this.els.hudScore.textContent = "0";
      this.els.hudCombo.textContent = "x1";
      this.els.hudBerry.textContent = "0 / 0";
      if (this.els.hudBomb) {
        this.els.hudBomb.textContent = "READY";
      }
      shell.classList.remove("combo-boost");
      return;
    }

    this.els.hudHp.textContent = run.player.powerTimer > 0 ? `${run.player.hp} ★` : String(run.player.hp);
    this.els.hudScore.textContent = formatNumber(run.score);
    this.els.hudCombo.textContent = run.combo >= 2 ? `x${run.combo} HOT` : "x1";
    this.els.hudBerry.textContent = run.mode === GAME_MODES.scoreAttack.id
      ? `${formatNumber(run.strawberries)}個 / 収穫${formatNumber(run.harvestedStrawberries ?? 0)}`
      : `手持ち${formatNumber(run.strawberries)} / 収穫${formatNumber(run.harvestedStrawberries ?? 0)}  S${run.stageNumber}/${STAGE_CONFIGS.length}`;
    if (this.els.hudBomb) {
      this.els.hudBomb.textContent = run.bombTimer > 0
        ? `${Math.ceil(run.bombTimer)}s`
        : run.bombReady ? "READY" : "USED";
    }
    shell.classList.toggle("combo-boost", run.comboFlash > 0.05);
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);
    this.drawBackground();

    const shakeX = this.shakeTime > 0 ? (Math.random() - 0.5) * this.shakePower : 0;
    const shakeY = this.shakeTime > 0 ? (Math.random() - 0.5) * this.shakePower : 0;

    if (this.scene === "title" || this.scene === "howTo") {
      this.drawTitleWorld();
      return;
    }

    if (this.runState) {
      ctx.save();
      ctx.translate(-this.cameraX + shakeX, shakeY);
      this.drawStage();
      ctx.restore();
      this.drawComboBanner();
      this.drawPrompt();
      this.drawCheckpointNotice();
      this.drawSceneTint();
      this.drawBombCutin();
    }
  }

  drawCheckpointNotice() {
    const run = this.runState;
    if (!run || run.checkpointNoticeTimer <= 0) {
      return;
    }
    const ctx = this.ctx;
    const alpha = Math.min(1, run.checkpointNoticeTimer * 1.6);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(CONFIG.width / 2, 108);
    ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
    ctx.strokeStyle = "rgba(74, 153, 64, 0.9)";
    ctx.lineWidth = 2.5;
    pathRoundedRect(ctx, -134, -20, 268, 40, 20);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1e5c1a";
    ctx.font = 'bold 14px "Trebuchet MS", "Yu Gothic UI", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(run.checkpointNotice, 0, 8);
    ctx.restore();
  }

  drawBackground() {
    const ctx = this.ctx;
    const theme = this.level?.theme ?? STAGE_CONFIGS[0].theme;
    const sky = ctx.createLinearGradient(0, 0, 0, CONFIG.height);
    sky.addColorStop(0, theme.skyTop);
    sky.addColorStop(0.42, theme.skyMid);
    sky.addColorStop(1, theme.skyBottom);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);

    if (this.images.backgroundFar?.ready) {
      this.drawTiledImage(this.images.backgroundFar.image, 0, CONFIG.height, CONFIG.stagePar.far, 1);
    } else {
      this.drawFallbackFar();
    }

    const guideKey = this.getCharacter(this.selectedCharacterId).guideKey;
    if (this.images[guideKey]?.ready && (this.scene === "title" || this.scene === "howTo")) {
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.drawImage(this.images[guideKey].image, 60, 110, 480, 360, 634, 90, 235, 176);
      ctx.restore();
    }

    if (this.images.backgroundMid?.ready) {
      this.drawTiledImage(this.images.backgroundMid.image, 162, 230, CONFIG.stagePar.mid, 0.94);
    } else {
      this.drawFallbackMid();
    }
  }

  drawTiledImage(image, y, height, parallax, alpha = 1) {
    const ctx = this.ctx;
    const tileWidth = image.width * (height / image.height);
    const offset = -((this.cameraX * parallax) % tileWidth);
    ctx.save();
    ctx.globalAlpha = alpha;
    for (let x = offset - tileWidth; x < CONFIG.width + tileWidth; x += tileWidth) {
      ctx.drawImage(image, x, y, tileWidth, height);
    }
    ctx.restore();
  }

  drawFallbackFar() {
    const ctx = this.ctx;
    const theme = this.level?.theme ?? STAGE_CONFIGS[0].theme;
    for (let index = 0; index < 5; index += 1) {
      const x = 80 + index * 180 - (this.cameraX * CONFIG.stagePar.far * 0.4) % 110;
      const y = 72 + (index % 2) * 22;
      this.drawCloud(x, y, 0.9 + (index % 3) * 0.2, "rgba(255,255,255,0.82)");
    }
    ctx.fillStyle = theme.greenhouse;
    for (let index = 0; index < 6; index += 1) {
      const x = (index * 200) - (this.cameraX * CONFIG.stagePar.far * 0.8) % 200;
      ctx.fillRect(x, 162, 132, 86);
      ctx.fillStyle = theme.greenhouseTrim;
      ctx.fillRect(x + 12, 148, 108, 22);
      ctx.fillStyle = theme.greenhouse;
    }
  }

  drawFallbackMid() {
    const ctx = this.ctx;
    const theme = this.level?.theme ?? STAGE_CONFIGS[0].theme;
    const baseOffset = (this.cameraX * CONFIG.stagePar.mid) % 200;
    for (let x = -baseOffset - 120; x < CONFIG.width + 120; x += 180) {
      ctx.fillStyle = theme.field;
      ctx.fillRect(x, 252, 122, 130);
      ctx.fillStyle = "rgba(236, 248, 239, 0.85)";
      ctx.fillRect(x + 10, 230, 102, 28);
      ctx.strokeStyle = "rgba(178, 202, 185, 0.8)";
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 10, 230, 102, 28);
      ctx.beginPath();
      ctx.moveTo(x + 22, 256);
      ctx.lineTo(x + 22, 382);
      ctx.moveTo(x + 54, 256);
      ctx.lineTo(x + 54, 382);
      ctx.moveTo(x + 86, 256);
      ctx.lineTo(x + 86, 382);
      ctx.stroke();
    }
  }

  drawTitleWorld() {
    const ctx = this.ctx;
    const groundTop = CONFIG.groundY;
    const theme = STAGE_CONFIGS[0].theme;
    ctx.fillStyle = theme.ground;
    ctx.fillRect(0, groundTop, CONFIG.width, CONFIG.height - groundTop);
    ctx.fillStyle = theme.grass;
    ctx.fillRect(0, groundTop - 18, CONFIG.width, 18);
    for (let x = 0; x < CONFIG.width; x += 44) {
      this.drawStrawberryPlant(x + 22, groundTop - 6, 0.9, false);
    }
    this.drawCloud(130, 100, 1.2, "rgba(255,255,255,0.82)");
    this.drawCloud(760, 80, 1.05, "rgba(255,255,255,0.78)");
    this.drawStrawberryCollectible(170, 330 + Math.sin(this.time * 1.8) * 8, 0.12, 1);
    this.drawStrawberryCollectible(265, 304 + Math.sin(this.time * 2.3) * 10, 0.106, 0.92);
    this.drawStrawberryCollectible(340, 344 + Math.sin(this.time * 1.4) * 7, 0.1, 0.86);
    this.drawGoal(790, 296);

    const titlePose = this.getPlayerAnimation();
    const character = this.getCharacter(this.selectedCharacterId);
    this.drawPlayerSprite(
      712,
      groundTop + titlePose.yOffset,
      titlePose.name,
      titlePose.index,
      1,
      CONFIG.titlePlayerScale * character.titleScaleFactor,
      0.98,
      false,
      { ...titlePose, characterId: character.id }
    );
    this.drawWindPetals();
  }

  drawWindPetals() {
    const ctx = this.ctx;
    this.windPetals.forEach((petal) => {
      ctx.save();
      ctx.translate(petal.x + Math.sin(petal.swing) * 12, petal.y);
      ctx.rotate(Math.sin(petal.swing * 2.2) * 0.5);
      ctx.fillStyle = petal.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * 0.62, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawStage() {
    this.drawGround();
    this.drawDecorations();
    this.drawCollectibles();
    this.drawPowerups();
    this.drawObstacles();
    this.drawBoss();
    this.drawBossProjectiles();
    this.drawProjectiles();
    if (this.level.goal) {
      this.drawGoal(this.level.goal.x, this.level.goal.y);
      this.drawGoalSupporters();
    }
    this.drawParticles(true);
    this.drawAfterimages();
    this.drawPlayer();
    this.drawParticles(false);
  }

  drawGround() {
    const ctx = this.ctx;
    const groundTop = CONFIG.groundY;
    const theme = this.level?.theme ?? STAGE_CONFIGS[0].theme;
    ctx.fillStyle = theme.ground;
    ctx.fillRect(0, groundTop, this.level.stageLength, CONFIG.height - groundTop + 40);

    if (this.images.groundTiles?.ready) {
      const img = this.images.groundTiles.image;
      for (let x = 0; x < this.level.stageLength; x += img.width) {
        ctx.drawImage(img, x, groundTop - 24);
      }
    } else {
      for (let x = 0; x < this.level.stageLength; x += 48) {
        ctx.fillStyle = x % 96 === 0 ? theme.grass : theme.grassDark;
        ctx.fillRect(x, groundTop - 18, 48, 18);
        ctx.fillStyle = x % 96 === 0 ? "rgba(154, 103, 68, 0.5)" : "rgba(120, 78, 54, 0.5)";
        ctx.fillRect(x, groundTop + 24, 48, 8);
      }
    }

    this.level.platforms.forEach((platform) => {
      ctx.fillStyle = "#c48a59";
      ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
      ctx.fillStyle = "#e8b27a";
      ctx.fillRect(platform.x, platform.y, platform.w, 7);
      ctx.fillStyle = "rgba(123, 85, 56, 0.45)";
      for (let x = platform.x + 12; x < platform.x + platform.w; x += 28) {
        ctx.fillRect(x, platform.y + platform.h, 4, 22);
      }
    });
  }

  drawDecorations() {
    const ctx = this.ctx;
    const visibleMin = this.cameraX - 120;
    const visibleMax = this.cameraX + CONFIG.width + 120;

    this.level.decorations.flowerPatches.forEach((x) => {
      if (x < visibleMin || x > visibleMax) {
        return;
      }
      for (let index = 0; index < 5; index += 1) {
        this.drawFlower(x + index * 16, CONFIG.groundY - 10 + Math.sin(index * 0.5) * 2, 0.7);
      }
    });

    this.level.decorations.grassPatches.forEach((x) => {
      if (x < visibleMin || x > visibleMax) {
        return;
      }
      for (let index = 0; index < 6; index += 1) {
        this.drawGrassBlade(x + index * 8, CONFIG.groundY - 6, 1 + (index % 2) * 0.2);
      }
    });

    this.level.decorations.signPosts.forEach((sign, index) => {
      if (sign.x < visibleMin || sign.x > visibleMax) {
        return;
      }
      const passed = (this.runState?.lastPassedSignIndex ?? -1) >= index;
      this.drawSign(sign.x, CONFIG.groundY - 70, sign.label, passed);
    });

    this.level.decorations.trays.forEach((x) => {
      if (x < visibleMin || x > visibleMax) {
        return;
      }
      this.drawTray(x, CONFIG.groundY - 10, 0.85);
    });
  }

  drawCollectibles() {
    const visibleMin = this.cameraX - 80;
    const visibleMax = this.cameraX + CONFIG.width + 80;
    this.level.collectibles.forEach((berry) => {
      if (berry.collected || berry.x < visibleMin || berry.x > visibleMax) {
        return;
      }
      const bob = Math.sin(this.time * 5 + berry.x * 0.03) * (berry.type === "touch" ? 5 : 2);
      if (berry.type === "touch") {
        this.drawStrawberryCollectible(berry.x, berry.y + bob, 0.115, 1);
      } else {
        this.drawStrawberryPlant(berry.x, berry.y + 20, 0.88, berry === this.runState?.nearestAction);
      }
    });
  }

  drawPowerups() {
    const visibleMin = this.cameraX - 80;
    const visibleMax = this.cameraX + CONFIG.width + 80;
    this.level.powerups.forEach((item) => {
      if (item.collected || item.x < visibleMin || item.x > visibleMax) {
        return;
      }
      const bob = Math.sin(this.time * 4.2 + item.x * 0.02) * 5;
      if (item.type === "ramen") {
        if (!this.drawImageAsset("ramenItem", item.x, item.y + bob, 0.105, { anchorX: 0.5, anchorY: 0.78, shadow: true })) {
          this.drawRamenFallback(item.x, item.y + bob);
        }
      } else if (item.type === "star") {
        if (!this.drawImageAsset("starItem", item.x, item.y + bob, 0.13, { anchorX: 0.5, anchorY: 0.55, shadow: true })) {
          this.drawStarShape(item.x, item.y + bob, 22, "#ffd84f");
        }
      }
    });
  }

  drawObstacles() {
    const ctx = this.ctx;
    const visibleMin = this.cameraX - 80;
    const visibleMax = this.cameraX + CONFIG.width + 80;

    this.level.obstacles.forEach((obstacle) => {
      if (obstacle.defeated && (obstacle.deadTimer ?? 0) <= 0) {
        return;
      }
      const x = obstacle.renderX ?? obstacle.x;
      const y = obstacle.renderY ?? obstacle.y;
      if (x < visibleMin || x > visibleMax) {
        return;
      }
      const fade = obstacle.defeated ? clamp((obstacle.deadTimer ?? 0) / 0.26, 0, 1) : 1;
      switch (obstacle.type) {
        case "puddle":
          ctx.save();
          ctx.globalAlpha = fade;
          const puddle = ctx.createRadialGradient(x - 6, y, 4, x, y + 4, obstacle.w * 0.6);
          puddle.addColorStop(0, "rgba(255,255,255,0.95)");
          puddle.addColorStop(0.24, "rgba(170, 232, 255, 0.96)");
          puddle.addColorStop(0.8, "rgba(78, 152, 205, 0.88)");
          puddle.addColorStop(1, "rgba(84, 131, 187, 0.5)");
          ctx.fillStyle = puddle;
          ctx.beginPath();
          ctx.ellipse(x, y + 4, obstacle.w / 2, obstacle.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.72)";
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.ellipse(x - 9, y + 1, obstacle.w / 4, obstacle.h / 5, -0.12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          break;
        case "mud":
          ctx.save();
          ctx.globalAlpha = fade;
          ctx.fillStyle = "#6f4d3c";
          ctx.beginPath();
          ctx.ellipse(x, y + 4, obstacle.w / 2, obstacle.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(161, 109, 72, 0.76)";
          ctx.beginPath();
          ctx.ellipse(x - 6, y + 1, obstacle.w / 4, obstacle.h / 5, -0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(87, 53, 36, 0.38)";
          ctx.fillRect(x - obstacle.w / 3, y + 6, obstacle.w * 0.66, 3);
          ctx.restore();
          break;
        case "leafpile":
          ctx.save();
          ctx.globalAlpha = fade;
          for (let index = 0; index < 6; index += 1) {
            ctx.fillStyle = ["#7cb452", "#9fd06a", "#d3ae5d"][index % 3];
            ctx.beginPath();
            ctx.ellipse(x - 18 + index * 7, y + (index % 2) * 2, 10, 5, index * 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "rgba(77, 117, 48, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.restore();
          break;
        case "rock":
          ctx.save();
          ctx.globalAlpha = fade;
          const rock = ctx.createLinearGradient(x, y - 8, x, y + 10);
          rock.addColorStop(0, "#a0a4b7");
          rock.addColorStop(1, "#747b91");
          ctx.fillStyle = rock;
          ctx.beginPath();
          ctx.ellipse(x, y + 4, obstacle.w / 2, obstacle.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.42)";
          ctx.beginPath();
          ctx.ellipse(x - 8, y, 10, 4, -0.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;
        case "bug":
          this.drawBugEnemy(x, y + 1, 0.115, fade, obstacle.defeated ? 0.5 : 0);
          break;
        case "bee":
          this.drawBeeEnemy(x, y, 1, fade, obstacle.defeated ? 0.45 : 0);
          break;
        case "drone":
          this.drawDroneEnemy(x, y, 1, fade, obstacle.defeated ? 0.45 : 0);
          break;
        case "thorn":
          this.drawThornPatch(x, y, obstacle.w, obstacle.h, fade);
          break;
        case "honey":
          this.drawHoneyPatch(x, y, obstacle.w, obstacle.h, fade);
          break;
        case "crystal":
          this.drawCrystalHazard(x, y, obstacle.w, obstacle.h, fade);
          break;
        default:
          break;
      }
    });
  }

  drawBoss() {
    const boss = this.level.boss;
    if (!boss || (boss.defeated && (boss.deadTimer ?? 0) <= 0)) {
      return;
    }
    const x = boss.renderX ?? boss.x;
    const y = boss.renderY ?? boss.y;
    if (x < this.cameraX - 180 || x > this.cameraX + CONFIG.width + 180) {
      return;
    }
    const alpha = boss.defeated ? clamp((boss.deadTimer ?? 0) / 0.55, 0, 1) : 1;
    const scale = boss.type === "beetle" ? 0.34 : boss.type === "frog" ? 0.31 : 0.33;
    const jitter = boss.hitFlash > 0 ? Math.sin(this.time * 80) * 3 : 0;
    if (boss.type === "moth" || boss.type === "dragonfly") {
      this.drawSpecialBoss(boss, x + jitter, y, alpha);
    } else if (!this.drawImageAsset(boss.imageKey, x + jitter, y, scale, { anchorX: 0.5, anchorY: 0.72, alpha, shadow: true })) {
      this.drawBugEnemy(x + jitter, y, 0.24, alpha, boss.hitFlash > 0 ? 0.2 : 0);
    }
    if (!boss.defeated) {
      this.drawBossHpBar(x, y - boss.h * 0.72, boss);
    }
  }

  drawBossHpBar(x, y, boss) {
    const ctx = this.ctx;
    const width = 132;
    const ratio = clamp(boss.hp / boss.maxHp, 0, 1);
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.strokeStyle = "rgba(93, 67, 143, 0.55)";
    ctx.lineWidth = 2;
    pathRoundedRect(ctx, -width / 2, -12, width, 22, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = ratio > 0.45 ? "#f06468" : "#e84b55";
    pathRoundedRect(ctx, -width / 2 + 5, -7, (width - 10) * ratio, 12, 6);
    ctx.fill();
    ctx.fillStyle = "#53436f";
    ctx.font = 'bold 11px "Trebuchet MS", "Yu Gothic UI", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("BOSS", 0, 4);
    ctx.restore();
  }

  drawProjectiles() {
    const run = this.runState;
    if (!run) {
      return;
    }
    run.projectiles.forEach((projectile) => {
      this.drawProjectileSprite(projectile.x, projectile.y, projectile.facing, projectile.rotation, projectile.explosive);
    });
  }

  drawBossProjectiles() {
    const run = this.runState;
    if (!run?.bossProjectiles) {
      return;
    }
    const ctx = this.ctx;
    run.bossProjectiles.forEach((shot) => {
      ctx.save();
      ctx.translate(shot.x, shot.y);
      if (shot.type === "laser") {
        const glow = ctx.createLinearGradient(-shot.w / 2, 0, shot.w / 2, 0);
        glow.addColorStop(0, "rgba(116, 235, 255, 0)");
        glow.addColorStop(0.5, "rgba(255, 98, 172, 0.92)");
        glow.addColorStop(1, "rgba(255, 234, 111, 0.9)");
        ctx.fillStyle = glow;
        pathRoundedRect(ctx, -shot.w / 2, -shot.h / 2, shot.w, shot.h, shot.h / 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "rgba(255, 220, 92, 0.86)";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.62)";
        ctx.beginPath();
        ctx.arc(-4, -5, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  drawGoal(x, y) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(0, 0, 92, 116);
    ctx.strokeStyle = "rgba(122, 102, 184, 0.65)";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 92, 116);
    ctx.fillStyle = "rgba(214, 244, 222, 0.85)";
    ctx.fillRect(8, 16, 76, 30);
    ctx.fillStyle = "rgba(123, 188, 106, 0.3)";
    for (let col = 0; col < 3; col += 1) {
      ctx.fillRect(12 + col * 24, 48, 12, 62);
    }
    this.drawTray(46, 94, 1);
    this.drawStrawberryCollectible(26, 82 + Math.sin(this.time * 3) * 2, 0.045, 1);
    this.drawStrawberryCollectible(46, 74 + Math.sin(this.time * 3.4) * 2, 0.048, 1);
    this.drawStrawberryCollectible(66, 82 + Math.sin(this.time * 2.7) * 2, 0.045, 1);
    ctx.restore();
  }

  drawGoalSupporters() {
    if (!this.runState) {
      return;
    }
    const supporters = CHARACTERS.filter((character) => character.id !== this.runState.selectedCharacterId);
    const baseX = this.level.goal.x + 124;
    supporters.forEach((character, index) => {
      const x = baseX + index * 70;
      if (x < this.cameraX - 120 || x > this.cameraX + CONFIG.width + 140) {
        return;
      }
      const animation = this.buildLoopAnimation(index % 2 === 0 ? "cheer" : "peace", this.time + index * 0.5, 1.7, {
        yOffset: Math.sin(this.time * 3 + index) * 2,
      }, character.id);
      this.drawPlayerSprite(
        x,
        CONFIG.groundY + (animation.yOffset ?? 0),
        animation.name,
        animation.index,
        -1,
        CONFIG.playerScale * character.scaleFactor * 0.82,
        0.96,
        false,
        { ...animation, characterId: character.id }
      );
    });
  }

  drawParticles(frontPass) {
    const run = this.runState;
    if (!run) {
      return;
    }
    const ctx = this.ctx;
    run.particles.forEach((particle) => {
      const isFront = Boolean(particle.trail);
      if (isFront !== frontPass) {
        return;
      }
      ctx.save();
      ctx.globalAlpha = clamp(particle.life / (particle.totalLife ?? (particle.trail ? 0.72 : 0.9)), 0, 1);
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      if (particle.ring) {
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size * (1 - particle.life / particle.totalLife), 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.size, particle.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  drawAfterimages() {
    const run = this.runState;
    if (!run) {
      return;
    }
    run.afterimages.forEach((ghost) => {
      const alpha = ghost.life / ghost.totalLife;
      const character = this.getCharacter(ghost.characterId);
      this.drawPlayerSprite(ghost.x, ghost.y, ghost.animation, ghost.frameIndex, ghost.facing, CONFIG.afterimageScale * character.scaleFactor, alpha * 0.35, true, {
        characterId: ghost.characterId,
      });
    });
  }

  drawPlayer() {
    const player = this.runState.player;
    if (player.invulnerable > 0 && player.powerTimer <= 0 && Math.floor(player.invulnerable * 16) % 2 === 0) {
      return;
    }
    const animation = this.getPlayerAnimation();
    const character = this.getCharacter(this.runState.selectedCharacterId);
    if (this.runState.bombTimer > 0) {
      this.drawBombAura(player.x, player.y - 48, this.runState.bombTimer);
      this.drawBombAllies(animation);
    }
    if (player.powerTimer > 0) {
      this.drawPowerAura(player.x, player.y - 48, player.powerTimer);
    }
    this.drawPlayerSprite(
      player.x,
      player.y + (animation.yOffset ?? 0),
      animation.name,
      animation.index,
      player.facing,
      CONFIG.playerScale * character.scaleFactor,
      1,
      false,
      { ...animation, characterId: character.id }
    );
  }

  drawBombAllies(animation) {
    const run = this.runState;
    const player = run?.player;
    if (!run || !player || run.bombTimer <= 0 || !Array.isArray(run.bombAllies)) {
      return;
    }
    const phase = run.bombAllyClock ?? 0;
    run.bombAllies.forEach((ally) => {
      const character = this.getCharacter(ally.characterId);
      const arrive = clamp((phase - ally.delay) / 0.9, 0, 1);
      const leave = run.bombTimer < 1.15 ? 1 - run.bombTimer / 1.15 : 0;
      const dropOffset = -240 * (1 - smoothstep(arrive));
      const leaveOffset = -260 * smoothstep(leave);
      const sideOffset = ally.side * (42 + 8 * Math.sin(this.time * 5 + ally.side));
      const yOffset = dropOffset + leaveOffset + Math.sin(this.time * 9 + ally.side) * 2.5;
      const allyAnim = {
        ...animation,
        characterId: character.id,
        yOffset: 0,
        rotation: (animation.rotation ?? 0) + ally.side * 0.025,
      };
      this.drawPlayerSprite(
        player.x + sideOffset,
        player.y + yOffset,
        allyAnim.name,
        allyAnim.index,
        player.facing,
        CONFIG.playerScale * character.scaleFactor * 0.88,
        clamp(arrive, 0, 1),
        false,
        allyAnim
      );
    });
  }

  drawPlayerSprite(x, y, animationName, frameIndex, facing, scale = 1.55, alpha = 1, tintTrail = false, options = null) {
    const ctx = this.ctx;
    const frames = this.getCharacterSprites(options?.characterId)?.[animationName];
    if (!frames || frames.length === 0) {
      this.drawFallbackPlayer(x, y, facing, alpha);
      return;
    }
    const frame = frames[frameIndex % frames.length];
    const nextIndex = options?.nextIndex ?? frameIndex;
    const mix = options?.mix ?? 0;
    const nextFrame = frames[nextIndex % frames.length] ?? frame;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(options?.rotation ?? 0);
    if (tintTrail) {
      ctx.filter = "saturate(0.7) hue-rotate(315deg)";
    }
    if (facing < 0) {
      ctx.scale(-1, 1);
    }
    const drawFrame = (targetFrame, frameAlpha) => {
      ctx.save();
      ctx.globalAlpha = alpha * frameAlpha;
      ctx.drawImage(
        targetFrame.canvas,
        -targetFrame.anchorX * scale,
        -targetFrame.anchorY * scale,
        targetFrame.w * scale,
        targetFrame.h * scale
      );
      ctx.restore();
    };
    if (mix > 0.001 && nextFrame !== frame) {
      drawFrame(frame, 1 - mix);
      drawFrame(nextFrame, mix);
    } else {
      drawFrame(frame, 1);
    }
    ctx.restore();
  }

  drawPowerAura(x, y, timer) {
    const ctx = this.ctx;
    const pulse = 1 + Math.sin(this.time * 12) * 0.08;
    ctx.save();
    ctx.globalAlpha = clamp(timer / CONFIG.powerDuration, 0.25, 0.85);
    ctx.translate(x, y);
    ctx.scale(pulse, pulse);
    const aura = ctx.createRadialGradient(0, 0, 8, 0, 0, 58);
    aura.addColorStop(0, "rgba(255, 248, 154, 0.55)");
    aura.addColorStop(0.55, "rgba(255, 209, 65, 0.22)");
    aura.addColorStop(1, "rgba(255, 209, 65, 0)");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, 60, 0, Math.PI * 2);
    ctx.fill();
    for (let index = 0; index < 5; index += 1) {
      const angle = this.time * 4 + index * ((Math.PI * 2) / 5);
      this.drawStarShape(Math.cos(angle) * 46, Math.sin(angle) * 28, 7, "rgba(255, 238, 110, 0.9)");
    }
    ctx.restore();
  }

  drawBombAura(x, y, timer) {
    const ctx = this.ctx;
    const pulse = 1 + Math.sin(this.time * 18) * 0.16;
    const fade = clamp(timer / CONFIG.bombDuration, 0.28, 1);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.86 * fade;
    ctx.translate(x, y);
    ctx.scale(pulse, pulse);
    const aura = ctx.createRadialGradient(0, 0, 10, 0, 0, 98);
    aura.addColorStop(0, "rgba(255, 255, 255, 0.82)");
    aura.addColorStop(0.24, "rgba(255, 232, 89, 0.68)");
    aura.addColorStop(0.56, "rgba(255, 89, 128, 0.34)");
    aura.addColorStop(1, "rgba(140, 105, 255, 0)");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, 105, 0, Math.PI * 2);
    ctx.fill();
    for (let index = 0; index < 10; index += 1) {
      const angle = -this.time * 6 + index * ((Math.PI * 2) / 10);
      const distance = 48 + Math.sin(this.time * 8 + index) * 18;
      this.drawStarShape(Math.cos(angle) * distance, Math.sin(angle) * distance * 0.62, 8 + (index % 3), index % 2 ? "rgba(255, 96, 136, 0.95)" : "rgba(255, 245, 126, 0.95)");
    }
    ctx.restore();
  }

  drawFallbackPlayer(x, y, facing, alpha) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(facing < 0 ? -1 : 1, 1);
    ctx.fillStyle = "#c5b2ff";
    ctx.fillRect(-14, -48, 28, 26);
    ctx.fillStyle = "#f6d4c4";
    ctx.beginPath();
    ctx.arc(0, -58, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#233049";
    ctx.fillRect(-11, -22, 9, 24);
    ctx.fillRect(2, -22, 9, 24);
    ctx.fillStyle = "#43355a";
    ctx.fillRect(-16, -63, 32, 10);
    ctx.restore();
  }

  drawComboBanner() {
    const run = this.runState;
    if (!run || run.combo < 2 || run.comboFlash <= 0) {
      return;
    }
    const ctx = this.ctx;
    const pulse = 1 + Math.sin(this.time * 12) * 0.05;
    ctx.save();
    ctx.translate(CONFIG.width / 2, 72);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.strokeStyle = "rgba(240, 100, 104, 0.72)";
    ctx.lineWidth = 3;
    pathRoundedRect(ctx, -100, -20, 200, 42, 20);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d54c60";
    ctx.font = 'bold 22px "Trebuchet MS", "Yu Gothic UI", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(`COMBO x${run.combo}`, 0, 8);
    ctx.restore();
  }

  drawPrompt() {
    if (!this.pendingPrompt || this.scene !== "playing") {
      return;
    }
    const ctx = this.ctx;
    const target = this.promptTimer <= 0 ? this.runState?.nearestAction : null;
    const isMobileLayout = document.body.classList.contains("is-coarse-pointer") || window.innerWidth <= 820;
    const screenX = target ? target.x - this.cameraX : CONFIG.width / 2;
    const screenY = target ? target.y - 58 : isMobileLayout ? 116 : 118;
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.strokeStyle = "rgba(122, 102, 184, 0.68)";
    ctx.lineWidth = 2;
    const width = target
      ? isMobileLayout ? 132 : 156
      : clamp(this.pendingPrompt.length * (isMobileLayout ? 13 : 14) + 38, 220, isMobileLayout ? 380 : 520);
    pathRoundedRect(ctx, screenX - width / 2, screenY - 18, width, 28, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#53436f";
    ctx.font = `${isMobileLayout ? 13 : 14}px "Trebuchet MS", "Yu Gothic UI", sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(this.pendingPrompt, screenX, screenY + 2);
    ctx.restore();
  }

  drawSceneTint() {
    const ctx = this.ctx;
    const run = this.runState;
    if (run?.bombFlashTimer > 0) {
      ctx.fillStyle = `rgba(255, 231, 92, ${clamp(run.bombFlashTimer, 0, 0.5)})`;
      ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);
    }
    if (this.scene === "gameover") {
      ctx.fillStyle = "rgba(32, 22, 44, 0.35)";
      ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);
    } else if (this.scene === "clear") {
      const flash = 0.12 + Math.max(0, this.sceneTimer) * 0.08;
      ctx.fillStyle = `rgba(255, 255, 255, ${flash})`;
      ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);
    }
  }

  drawBombCutin() {
    const run = this.runState;
    if (!run || run.bombCutinTimer <= 0) {
      return;
    }
    const ctx = this.ctx;
    const alpha = clamp(run.bombCutinTimer / CONFIG.bombCutinDuration, 0, 1);
    const character = this.getCharacter(run.selectedCharacterId);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(48, 32, 84, 0.78)";
    ctx.fillRect(0, 148, CONFIG.width, 160);
    ctx.fillStyle = "rgba(255, 225, 92, 0.94)";
    ctx.fillRect(0, 142, CONFIG.width, 6);
    ctx.fillRect(0, 306, CONFIG.width, 6);
    ctx.fillStyle = "#fff";
    ctx.font = '900 44px "Trebuchet MS", "Yu Gothic UI", sans-serif';
    ctx.textAlign = "left";
    ctx.fillText("STRAWBERRY BOMB!", 270, 220);
    ctx.font = 'bold 20px "Trebuchet MS", "Yu Gothic UI", sans-serif';
    ctx.fillText(`${character.name}のスペシャル発動`, 272, 256);
    this.drawPlayerSprite(170, 310, "point", 0, 1, CONFIG.titlePlayerScale * character.titleScaleFactor * 0.72, alpha, false, {
      characterId: character.id,
    });
    ctx.restore();
  }

  drawCloud(x, y, scale, color) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(-24, 10, 18, 0, Math.PI * 2);
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.arc(30, 12, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawImageAsset(imageKey, x, y, scale, options = {}) {
    const asset = this.images[imageKey];
    if (!asset?.ready) {
      return false;
    }
    const ctx = this.ctx;
    const img = asset.image;
    const width = img.width * scale;
    const height = img.height * scale;
    const anchorX = options.anchorX ?? 0.5;
    const anchorY = options.anchorY ?? 0.5;
    ctx.save();
    ctx.globalAlpha = options.alpha ?? 1;
    ctx.translate(x, y);
    if (options.rotation) {
      ctx.rotate(options.rotation);
    }
    if (options.flipX) {
      ctx.scale(-1, 1);
    }
    if (options.shadow) {
      ctx.shadowColor = options.shadowColor ?? "rgba(112, 77, 115, 0.22)";
      ctx.shadowBlur = options.shadowBlur ?? 12;
      ctx.shadowOffsetY = options.shadowOffsetY ?? 4;
    }
    ctx.drawImage(img, -width * anchorX, -height * anchorY, width, height);
    ctx.restore();
    return true;
  }

  drawStrawberryCollectible(x, y, scale, alpha) {
    if (this.drawImageAsset("strawberryCollectible", x, y, scale, { anchorX: 0.5, anchorY: 0.78, alpha, shadow: true })) {
      return;
    }
    this.drawStrawberryIcon(x, y, scale * 8.2, alpha);
  }

  drawProjectileSprite(x, y, facing, rotation = 0, explosive = false) {
    if (explosive) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = 0.62 + Math.sin(this.time * 24) * 0.18;
      ctx.fillStyle = "rgba(255, 221, 82, 0.46)";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    if (this.drawImageAsset("strawberryProjectile", x, y, explosive ? 0.14 : 0.11, { anchorX: facing >= 0 ? 0.38 : 0.62, anchorY: 0.56, flipX: facing < 0, rotation, shadow: explosive })) {
      return;
    }
    this.drawStrawberryIcon(x, y, 0.62, 1);
  }

  drawBugEnemy(x, y, scale, alpha, squash = 0) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(77, 43, 94, 0.16)";
    ctx.beginPath();
    ctx.ellipse(x, y + 18, 20 + squash * 12, 8 - squash * 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    if (this.drawImageAsset("bugEnemy", x, y, scale, { anchorX: 0.5, anchorY: 0.73, alpha, shadow: false })) {
      return;
    }
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#513a4d";
    ctx.beginPath();
    ctx.ellipse(x, y, 14, 10 - squash * 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.beginPath();
    ctx.ellipse(x - 10, y - 3, 6, 4, -0.3, 0, Math.PI * 2);
    ctx.ellipse(x + 10, y - 3, 6, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawBeeEnemy(x, y, scale, alpha, squash = 0) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(77, 43, 94, 0.16)";
    ctx.beginPath();
    ctx.ellipse(0, 20, 24, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.beginPath();
    ctx.ellipse(-12, -10, 12, 7, -0.45, 0, Math.PI * 2);
    ctx.ellipse(12, -10, 12, 7, 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffd65c";
    ctx.beginPath();
    ctx.ellipse(0, 0, 21, 13 - squash * 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4b375d";
    ctx.fillRect(-12, -11, 5, 22);
    ctx.fillRect(1, -13, 5, 26);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(15, -4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4b375d";
    ctx.beginPath();
    ctx.moveTo(-24, 0);
    ctx.lineTo(-36, -5);
    ctx.lineTo(-27, 7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawDroneEnemy(x, y, scale, alpha, squash = 0) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(77, 43, 94, 0.16)";
    ctx.beginPath();
    ctx.ellipse(0, 22, 25, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.82)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(-17, -12, 15, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(17, -12, 15, 5, 0, 0, Math.PI * 2);
    ctx.stroke();
    const body = ctx.createLinearGradient(0, -18, 0, 16);
    body.addColorStop(0, "#82e6ff");
    body.addColorStop(1, "#8d78e8");
    ctx.fillStyle = body;
    pathRoundedRect(ctx, -20, -13, 40, 26 - squash * 6, 13);
    ctx.fill();
    ctx.fillStyle = "#fff6a4";
    ctx.beginPath();
    ctx.arc(8, -2, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawThornPatch(x, y, w, h, alpha) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#4e8b48";
    ctx.fillRect(x - w / 2, y + h / 3, w, 5);
    ctx.fillStyle = "#d8f19d";
    for (let i = 0; i < 5; i += 1) {
      const px = x - w / 2 + 8 + i * (w / 5);
      ctx.beginPath();
      ctx.moveTo(px, y + 8);
      ctx.lineTo(px + 8, y - h / 2);
      ctx.lineTo(px + 15, y + 8);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  drawHoneyPatch(x, y, w, h, alpha) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    const honey = ctx.createRadialGradient(x - 8, y, 4, x, y + 4, w * 0.6);
    honey.addColorStop(0, "rgba(255,255,255,0.86)");
    honey.addColorStop(0.3, "rgba(255, 216, 93, 0.96)");
    honey.addColorStop(1, "rgba(211, 137, 44, 0.72)");
    ctx.fillStyle = honey;
    ctx.beginPath();
    ctx.ellipse(x, y + 4, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawCrystalHazard(x, y, w, h, alpha) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    const colors = ["#bff4ff", "#f9c8ff", "#fff29a"];
    for (let i = 0; i < 4; i += 1) {
      const px = x - w / 2 + 10 + i * (w / 4);
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      ctx.moveTo(px, y + h / 2);
      ctx.lineTo(px + 8, y - h / 2 - (i % 2) * 8);
      ctx.lineTo(px + 18, y + h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(91, 72, 139, 0.28)";
      ctx.stroke();
    }
    ctx.restore();
  }

  drawSpecialBoss(boss, x, y, alpha) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    const flash = boss.hitFlash > 0 ? 1 : 0;
    if (boss.type === "dragonfly") {
      ctx.fillStyle = "rgba(255,255,255,0.58)";
      ctx.beginPath();
      ctx.ellipse(-36, -20, 42, 13, -0.3, 0, Math.PI * 2);
      ctx.ellipse(36, -20, 42, 13, 0.3, 0, Math.PI * 2);
      ctx.ellipse(-34, 12, 38, 12, 0.25, 0, Math.PI * 2);
      ctx.ellipse(34, 12, 38, 12, -0.25, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createLinearGradient(0, -48, 0, 48);
      body.addColorStop(0, flash ? "#fff" : "#76e8ff");
      body.addColorStop(1, "#7e6ee8");
      ctx.fillStyle = body;
      pathRoundedRect(ctx, -18, -48, 36, 96, 18);
      ctx.fill();
      ctx.fillStyle = "#fff5a8";
      ctx.beginPath();
      ctx.arc(10, -38, 5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.62)";
      ctx.beginPath();
      ctx.ellipse(-42, -6, 48, 30, -0.25, 0, Math.PI * 2);
      ctx.ellipse(42, -6, 48, 30, 0.25, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createLinearGradient(0, -42, 0, 42);
      body.addColorStop(0, flash ? "#fff" : "#ffd987");
      body.addColorStop(1, "#9d65cc");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.ellipse(0, 0, 30, 42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4a315d";
      ctx.beginPath();
      ctx.arc(-9, -18, 4, 0, Math.PI * 2);
      ctx.arc(9, -18, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawStarShape(x, y, radius, color) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const r = i % 2 === 0 ? radius : radius * 0.48;
      const angle = -Math.PI / 2 + i * (Math.PI / 5);
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawRamenFallback(x, y) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#fff1df";
    ctx.strokeStyle = "#d46d6d";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 8, 24, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f4b44f";
    ctx.beginPath();
    ctx.ellipse(0, 3, 20, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff7d7";
    ctx.beginPath();
    ctx.arc(9, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#7daf49";
    ctx.fillRect(-13, -3, 10, 5);
    ctx.restore();
  }

  drawStrawberryIcon(x, y, scale, alpha) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#f05f68";
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.bezierCurveTo(12, -18, 18, -6, 16, 8);
    ctx.bezierCurveTo(13, 22, 2, 28, 0, 30);
    ctx.bezierCurveTo(-2, 28, -13, 22, -16, 8);
    ctx.bezierCurveTo(-18, -6, -12, -18, 0, -14);
    ctx.fill();
    ctx.fillStyle = "#79a846";
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(8, -24);
    ctx.lineTo(4, -12);
    ctx.lineTo(14, -10);
    ctx.lineTo(0, -6);
    ctx.lineTo(-14, -10);
    ctx.lineTo(-4, -12);
    ctx.lineTo(-8, -24);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255, 246, 205, 0.9)";
    for (let index = 0; index < 5; index += 1) {
      ctx.beginPath();
      ctx.arc(-8 + index * 4, 2 + (index % 2) * 5, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawStrawberryPlant(x, y, scale, highlight) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#75a849";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-6, -16);
    ctx.moveTo(0, 0);
    ctx.lineTo(8, -14);
    ctx.stroke();
    ctx.fillStyle = "#7fb14c";
    ctx.beginPath();
    ctx.ellipse(-8, -18, 10, 5, -0.4, 0, Math.PI * 2);
    ctx.ellipse(10, -16, 10, 5, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    this.drawStrawberryCollectible(x - 5, y - 12, 0.034, 1);
    this.drawStrawberryCollectible(x + 10, y - 8, 0.029, 1);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    if (highlight) {
      ctx.strokeStyle = "rgba(255, 232, 132, 0.95)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(2, -10, 28, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawFlower(x, y, scale) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#7caf52";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    for (let index = 0; index < 6; index += 1) {
      ctx.beginPath();
      ctx.ellipse(Math.cos((Math.PI * 2 * index) / 6) * 5, Math.sin((Math.PI * 2 * index) / 6) * 5, 4, 2.5, index * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#f1c649";
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawGrassBlade(x, y, scale) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#64a247";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(2, -10, 5, -18);
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-2, -8, -4, -16);
    ctx.stroke();
    ctx.restore();
  }

  drawSign(x, y, label, passed = false) {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = passed ? "#3d6b2e" : "#815537";
    ctx.fillRect(x - 4, y + 18, 8, 36);
    ctx.fillStyle = passed ? "#eeffec" : "#fff5df";
    ctx.strokeStyle = passed ? "#4a9940" : "#8967b8";
    ctx.lineWidth = 3;
    pathRoundedRect(ctx, x - 34, y - 6, 68, 30, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = passed ? "#1e5c1a" : "#5d4d79";
    ctx.font = 'bold 12px "Trebuchet MS", "Yu Gothic UI", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 13);
    if (passed) {
      ctx.fillStyle = "#4a9940";
      ctx.font = 'bold 10px "Trebuchet MS", "Yu Gothic UI", sans-serif';
      ctx.fillText("\u2713", x + 27, y + 3);
    }
    ctx.restore();
  }

  drawTray(x, y, scale) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(214, 228, 255, 0.38)";
    ctx.strokeStyle = "rgba(108, 130, 184, 0.7)";
    ctx.lineWidth = 3;
    pathRoundedRect(ctx, -26, -10, 52, 18, 7);
    ctx.fill();
    ctx.stroke();
    for (let col = 0; col < 4; col += 1) {
      ctx.beginPath();
      ctx.moveTo(-18 + col * 12, -10);
      ctx.lineTo(-18 + col * 12, 8);
      ctx.stroke();
    }
    ctx.restore();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.toggle("is-coarse-pointer", window.matchMedia?.("(pointer: coarse)")?.matches ?? false);
  new GameApp();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("service-worker.js").catch((error) => {
      console.warn("Service worker registration failed.", error);
    });
  }
});
