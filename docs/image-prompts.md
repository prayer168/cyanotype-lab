# Image 2.0 圖像製作紀錄

製作日期：2026-07-18
模式：Codex 內建 Image 2.0（built-in `image_gen`）
外部圖片：未使用
專案使用格式：WebP

## 1. 首頁藍曬主視覺

最終檔案：`assets/cyanotype-hero.webp`

```text
Use case: scientific-educational
Asset type: wide website hero for a Traditional Chinese elementary science-and-art interactive lesson about cyanotype printing
Primary request: Create an authentic cyanotype photogram composition on textured watercolor paper, showing elegant fern fronds, small leaves, a feather, circular lace and a few simple geometric paper stencils arranged as a balanced artwork. The exposed paper is rich Prussian blue and the objects leave crisp white-to-pale-blue silhouettes with a few believable translucent tonal details.
Scene/backdrop: the cyanotype sheet lies on a warm off-white classroom worktable; only a subtle edge of the table is visible.
Style/medium: high-quality overhead educational editorial photograph combined with the unmistakable monochrome cyanotype process, tactile paper fibers, realistic handmade imperfections.
Composition/framing: 3:2 landscape, large cyanotype sheet angled slightly, generous negative space in the upper left for separately overlaid HTML title; subjects concentrated across the center and lower right.
Lighting/mood: soft natural daylight, calm, curious, handmade, scientifically plausible.
Color palette: Prussian blue, indigo, cyan, paper white, tiny warm neutral table edge only.
Constraints: no people, no bottles, no chemicals, no written words, no labels, no logo, no watermark; botanical silhouettes must be botanically plausible; preserve clear safe space for web text; no purple, no neon blue, no watercolor painting look.
```

人工檢查：左上文字安全區足夠；蕨類、羽毛、蕾絲、葉片與幾何遮罩完整；白到淺藍的層次可支援透光觀察。

## 2. 模擬器素材板

最終檔案：`assets/cyanotype-cutouts.webp`

```text
Use case: scientific-educational
Asset type: three-item draggable botanical and art-material sprite sheet for a cyanotype classroom web simulator
Primary request: Create exactly three separate, realistic opaque objects arranged in one horizontal row: LEFT a complete pressed fern frond with clear individual pinnae and intact stem; CENTER one complete soft bird feather with a clear central shaft and natural asymmetric barbs; RIGHT one circular handmade crochet lace doily with readable open holes. Each object must be fully visible and must not overlap another object.
Scene/backdrop: perfectly flat solid #ff00ff chroma-key background for background removal.
Style/medium: high-detail overhead specimen photography, clean educational cutout source, true-to-life edges and structures.
Composition/framing: very wide horizontal sprite sheet, three equal columns, one object centered in each column, consistent visual scale, generous padding around every object, no cropping.
Lighting/mood: flat even catalog lighting with no directional shadow.
Color palette: objects in matte charcoal gray and muted forest green only; background exactly #ff00ff.
Constraints: the background must be one perfectly uniform color with no shadows, gradients, texture, reflections, floor plane, or lighting variation; keep all subjects fully separated with crisp edges; do not use #ff00ff anywhere in the objects; no cast shadow, no contact shadow, no reflection, no text, no labels, no logo, no watermark; exactly three objects, no extra leaves, no extra feathers, no extra lace.
```

後處理：依 Image 2.0 skill 使用 `remove_chroma_key.py` 自動取樣邊界色、soft matte 與 despill，再轉為保留 alpha 的 WebP。驗證結果：RGBA、透明角落、alpha 範圍 0–255、三個物件皆完整，蕾絲孔洞保留。

## 3. 三種藝術構圖比較

最終檔案：`assets/cyanotype-art-studio.webp`

```text
Use case: scientific-educational
Asset type: wide website artwork-comparison image for an elementary cyanotype art-composition lesson
Primary request: Show exactly three finished cyanotype photogram artworks displayed side by side on an off-white studio table. LEFT artwork: radial botanical composition made from several distinct leaves growing outward from one focal point. CENTER artwork: rhythmic repeat of simple circles, triangles, narrow plant stems and a little mesh, with controlled variation. RIGHT artwork: one elegant feather and a small branch in the lower-right corner with a very large calm area of uninterrupted Prussian blue negative space. Make the three composition principles immediately distinguishable.
Scene/backdrop: clean overhead art classroom table, three separate handmade watercolor-paper sheets with small natural deckled edges and even spacing.
Style/medium: realistic overhead editorial photography of authentic handmade cyanotype prints; monochrome Prussian blue with crisp white and pale-blue contact silhouettes, subtle paper fiber and believable handmade variation.
Composition/framing: wide landscape, exactly three complete sheets in one horizontal row, all fully visible, no overlap, generous outer padding.
Lighting/mood: soft diffused daylight, thoughtful museum-workshop mood.
Color palette: Prussian blue, indigo, cyan, paper white, warm off-white tabletop.
Constraints: no people, no hands, no chemicals, no tools, no text, no letters, no labels, no logo, no watermark; no repeated clone artifacts; no frame; no purple or neon blue; keep the right sheet mostly empty blue as specified.
```

人工檢查：三張紙完整且未重疊；放射、重複節奏與大片留白能直接比較；沒有圖片內文字。

## 網頁資產最佳化

- Image 2.0 原始與去背中間 PNG 約 7.7 MB。
- 最終三個 WebP 合計約 1.15 MB。
- 專案不保留未使用 PNG；原始 Image 2.0 輸出仍存在 Codex 生成資料夾，可復原。

## 4. GitHub Pages 分享預覽圖

最終檔案：`public/assets/cyanotype-social-preview.jpg`（1200×630）

```text
Use case: scientific-educational
Asset type: 1200×630 social link-preview artwork for the same Traditional Chinese elementary cyanotype science-and-art lesson
Input image: Image 1 is the approved project hero and defines the authentic cyanotype texture, Prussian-blue palette, fern, leaf, feather, lace and geometric photogram language.
Primary request: Create a polished wide social-preview composition derived from Image 1. Keep a large calm field of deep Prussian-blue handmade paper on the LEFT for metadata-driven title context, and arrange an elegant cluster of crisp white and pale-blue fern fronds, one feather, a small lace circle and two simple translucent geometric stencils on the RIGHT. The image should instantly read as a real cyanotype photogram and remain legible at thumbnail size.
Style/medium: authentic handmade cyanotype contact print photographed overhead, tactile watercolor paper fibers, realistic deckled edges and subtle natural variation.
Composition/framing: exact social-banner aspect ratio approximately 1.905:1, wide landscape, main botanical cluster contained within the right 55%, left 40% visually quiet, all objects fully visible and not cropped.
Lighting/mood: soft natural daylight, calm curiosity, museum-workshop polish.
Color palette: Prussian blue, indigo, cyan, paper white, minimal warm off-white edge.
Constraints: preserve the scientific and visual character of Image 1; no people, no hands, no bottles, no chemicals, no written words, no letters, no labels, no logo, no watermark; no purple, no neon blue, no painted watercolor flowers; do not fill the left negative space.
```

後處理：將 Image 2.0 輸出以 Lanczos 置中裁切並縮放為精確 1200×630 progressive JPEG；沒有在圖片內生成文字，網站標題與說明由 Open Graph/Twitter metadata 提供。
