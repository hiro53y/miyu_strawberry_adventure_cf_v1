# VOICEVOX voice assets

This folder is reserved for generated VOICEVOX WAV clips.

Run from the package root:

```powershell
node tools/generate_voicevox_assets.mjs
```

VOICEVOX Engine must be running at `http://127.0.0.1:50021`.
The generator resolves speaker IDs from `/speakers`, writes WAV files under this folder, and updates `voice_manifest.json`.

Open `voice_preview.html` to review generated clips.
