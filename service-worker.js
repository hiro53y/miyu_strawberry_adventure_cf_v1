const CACHE_NAME = "miyu-strawberry-cf-v1-20260514-stage10-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css?v=20260514-stage10-v1",
  "./game.js?v=20260514-stage10-v1",
  "./manifest.webmanifest",
  "./assets/icons/icon.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/images/miyu_character_sheet_v2_clean.png",
  "./assets/images/kazuki_character_sheet_v1_clean.png",
  "./assets/images/itsuki_character_sheet_v1_clean.png",
  "./assets/images/miyu_character_guide.png",
  "./assets/images/kazuki_character_guide.png",
  "./assets/images/itsuki_character_guide.png",
  "./assets/images/strawberry_collectible_v2.png",
  "./assets/images/strawberry_projectile_v2.png",
  "./assets/images/bug_enemy_v2.png",
  "./assets/images/stage4_bee_enemy_v1.png",
  "./assets/images/stage5_drone_enemy_v1.png",
  "./assets/images/stage6_firefly_enemy_v1.png",
  "./assets/images/stage7_snail_enemy_v1.png",
  "./assets/images/stage8_snowbat_enemy_v1.png",
  "./assets/images/stage9_acorn_enemy_v1.png",
  "./assets/images/stage10_comet_enemy_v1.png",
  "./assets/images/ramen_item_v1.png",
  "./assets/images/invincible_star_v1.png",
  "./assets/images/boss_ladybug_v1.png",
  "./assets/images/boss_frog_v1.png",
  "./assets/images/boss_beetle_v1.png",
  "./assets/images/boss_moth_v1.png",
  "./assets/images/boss_dragonfly_v1.png",
  "./assets/images/boss_firefly_v1.png",
  "./assets/images/boss_snail_v1.png",
  "./assets/images/boss_snowowl_v1.png",
  "./assets/images/boss_squirrel_v1.png",
  "./assets/images/boss_comet_v1.png",
  "./assets/images/ending_three_siblings_v1.png",
  "./assets/generated/background_far.png",
  "./assets/generated/background_mid.png",
  "./assets/generated/ground_tiles.png",
  "./assets/generated/ui_panel.png",
  "./assets/audio/bgm.mp3",
  "./assets/audio/bgm_options/bgm_01.mp3",
  "./assets/audio/bgm_options/bgm_02.mp3",
  "./assets/audio/bgm_options/bgm_03.mp3",
  "./assets/audio/bgm_options/bgm_04.mp3",
  "./assets/audio/bgm_options/stage6_lantern_loop.wav",
  "./assets/audio/bgm_options/stage7_bubble_loop.wav",
  "./assets/audio/bgm_options/stage8_ice_loop.wav",
  "./assets/audio/bgm_options/stage9_wind_loop.wav",
  "./assets/audio/bgm_options/stage10_starlight_loop.wav"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(event.request).then((response) => {
          // 正常レスポンスのみキャッシュに追加（opaque レスポンスは除外）
          if (response.ok || response.type === "opaque") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      })
      .catch(() => {
        // オフライン中かつキャッシュ未登録のリクエスト → 503 を返す
        return new Response("Offline: resource not cached", {
          status: 503,
          statusText: "Service Unavailable",
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      })
  );
});
