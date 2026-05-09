# みんなのいちご大冒険 — Cloudflare Pages 公開版 (cf-v1)

スマホ対応 2D 横スクロールアクションゲームの Cloudflare Pages 向けパッケージです。

---

## このフォルダについて

| 項目 | 内容 |
|---|---|
| ベース | `miyu_strawberry_adventure_mobile_web_v1` |
| 差分 | ローカルサーバー不要・`_headers` 追加・バージョン文字列更新 |
| ビルド識別 | `20260509-cf-bomb-v6` |

ローカル起動スクリプト（`run_local.bat` / `serve_local.py` 等）は含みません。  
このフォルダをそのまま Cloudflare Pages にデプロイして使います。

---

## Cloudflare Pages へのデプロイ手順

### 方法 A: GitHub 経由（推奨・自動デプロイ）

1. このフォルダを GitHub リポジトリに push する  
   ```
   git init
   git add .
   git commit -m "initial: miyu strawberry adventure cf-v1"
   git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```

2. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログインし、  
   **Workers & Pages → Create application → Pages → Connect to Git** を選択

3. 先ほど push したリポジトリを選択

4. ビルド設定を以下のように入力する

   | 項目 | 値 |
   |---|---|
   | Framework preset | `None` |
   | Build command | （空欄のまま） |
   | Build output directory | `/`（ルート） |

5. **Save and Deploy** をクリック → 1〜2 分で公開完了

6. 以降は `main` ブランチに push するたびに自動再デプロイされる

---

### 方法 B: Direct Upload（Git なしで即公開）

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages → Create application → Pages → Direct Upload**

2. プロジェクト名を入力（例: `miyu-strawberry-adventure`）

3. このフォルダの中身（`index.html` や `assets/` などのファイル群）をドラッグ&ドロップ、または ZIP で一括アップロード

4. **Deploy site** をクリック → 数十秒で公開完了

> **注意:** ZIP を使う場合、ZIP のルートがこのフォルダ直下と同じ構造（`index.html` がルートにある状態）になるよう固めてください。

---

## 更新時の手順（バージョン文字列の更新）

`game.js` や `style.css` を修正した場合は、以下のファイルのバージョン文字列をあわせて変更してください。  
CDN とブラウザが古いキャッシュを使い続けるのを防ぐためです。

| ファイル | 変更箇所 |
|---|---|
| `index.html` | `style.css?v=...` と `game.js?v=...` のクエリ |
| `service-worker.js` | `CACHE_NAME` の末尾の日付部分と `CORE_ASSETS` 内の `?v=...` |

---

## フォルダ構成

```
miyu_strawberry_adventure_cf_v1/
├── _headers              ← Cloudflare Pages 用キャッシュ・セキュリティヘッダー
├── index.html            ← ゲーム本体 HTML
├── game.js               ← ゲームロジック
├── style.css             ← スタイル
├── service-worker.js     ← PWA オフラインキャッシュ
├── manifest.webmanifest  ← PWA ホーム追加メタ情報
└── assets/
    ├── audio/            ← BGM（bgm.mp3 + bgm_options/）
    ├── generated/        ← 背景・地面タイル等
    ├── icons/            ← PWA アイコン（SVG/PNG）
    └── images/           ← キャラクター・アイテム・ボス等
```

---

## 動作確認済み内容

- `node --check game.js` 構文チェック通過（ベースの `mobile_web_v1` と同一コード）
- `_headers` で Service Worker・Manifest・HTML を no-cache、アセットを immutable に設定
- PWA manifest・service worker・アイコン一式が含まれている（ホーム画面追加対応）
- セキュリティヘッダー（`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy`）を全パスに適用

---

## ゲーム内容

- キャラクター選択: みゆちゃん（バランス）/ かずきくん（速い）/ いつきくん（ジャンプ強）
- モード: 5ステージ冒険（ボス・チェックポイント・各ステージ1回のBOMBあり・ステージ内いちご50%以上でクリア）/ いちごラッシュ（エンドレス・ランキング保存）
- クリア条件: 通常ステージはステージ中のいちごを50%以上収穫し、ボスを倒すとクリア。条件未達でゴールに触れると不足内容を案内
- ストロベリーショット: 通常時は手持ちいちごを1個消費。クリア条件はいちごを投げる前の収穫数で判定。BOMB中は手持ちいちごに関係なく投げ放題
- BOMB: 発動時に長めのカットイン、20秒の無敵、残り2人の合流、画面外に出ない範囲でゆっくり落ちながらの飛行、移動速度アップ、BGMスピードアップ、画面枠のキラキラ発光、超広範囲の爆発ストロベリーショット。BOMB中にスターを取ると残り時間が10秒増えます。いちごラッシュでは追加いちごが多数出現
- 新ステージ: Stage 4「月あかりハニートンネル」、Stage 5「にじ雲スカイガーデン」
- 新敵/ボス: ハチ、ドローン、トゲ、ハニー床、クリスタル、蛾ボス、トンボボス
- タッチ操作: ← → JUMP DASH ACTION SHOT BOMB PAUSE RETRY TITLE
- PWA: スマホのホーム画面に追加してフルスクリーンで遊べる
