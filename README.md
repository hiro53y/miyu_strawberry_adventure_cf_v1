# みゆのいちご大冒険 — Cloudflare Pages 公開版 (cf-v1)

スマホ対応 2D 横スクロールアクションゲームの Cloudflare Pages 向けパッケージです。

---

## このフォルダについて

| 項目 | 内容 |
|---|---|
| ベース | `miyu_strawberry_adventure_mobile_web_v1` |
| 差分 | ローカルサーバー不要・`_headers` 追加・バージョン文字列更新 |
| ビルド識別 | `20260506-cf-v1` |

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
- モード: 3ステージ冒険（ボス・チェックポイントあり）/ いちごラッシュ（エンドレス・ランキング保存）
- タッチ操作: ← → JUMP DASH ACTION SHOT PAUSE RETRY TITLE
- PWA: スマホのホーム画面に追加してフルスクリーンで遊べる
