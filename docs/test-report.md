# 藍曬圖實驗室測試報告

測試日期：2026-07-18（Asia/Taipei）
本機路徑：`D:\我的雲端硬碟\google drive\000000000backup\0000000000數位教材\Blue-print`
版本：0.2.0
執行環境：Windows、Node.js v24.15.0、npm 11.12.1、Vite 7.3.6、agent-browser 0.32.2（Chromium）

## 自動檢查與正式建置

| 項目 | 指令／方法 | 結果 |
|---|---|---|
| 占位與必要檔案掃描 | `npm.cmd run check` | 通過；沒有中文占位字樣、開發標記、英文假文或無效連結占位 |
| 正式建置 | `npm.cmd run build` | 通過；4 個模組完成轉換，無建置錯誤 |
| 套件安全 | `npm.cmd audit --audit-level=high` | 0 個漏洞 |
| 生成圖片請求 | Chromium PerformanceResourceTiming | 三個 WebP 皆回傳 HTTP 200 |
| 錯誤覆蓋層 | Vite／Webpack／Next overlay selector | 無 |
| 瀏覽器錯誤 | `window.__consoleErrors` | 空陣列 |
| 外部字型依賴 | 資源請求清單 | 無；使用本機中文字型堆疊 |
| GitHub Pages workflow | `Deploy cyanotype lab to GitHub Pages` | 通過；安裝、內容驗證、建置、上傳與部署全部成功 |
| 公開網站 | `https://prayer168.github.io/cyanotype-lab/` | HTTP 200，標題、canonical、JS、CSS 與圖片正常 |
| 社群分享圖 | 公開 1200×630 JPEG | HTTP 200，Content-Length 250059 bytes |
| 第 8 頁外部連結 | 12 個 HTTPS 館藏／作品連結 | 全部具有 `target="_blank"` 與 `rel="noopener noreferrer"`；NYPL、Rijksmuseum、V&A、Getty、Smithsonian 自動 GET 為 HTTP 200；The Met、NGA、Eastman、MoMA 的防機器人回應另以官方搜尋索引與館藏頁交叉確認 |

## Viewport 與目視檢查

| 尺寸 | 檢查範圍 | 結果 |
|---|---|---|
| 1440×1000 桌機 | 八頁籤完整切換與第 8 頁 12 張典藏卡片 | 通過；八頁 scrollWidth 均為 1440px，無裁切、文字壓圖或水平溢出 |
| 768×1024 平板 | 八頁切換與第 8 頁雙欄卡片 | 通過；八頁 scrollWidth 均為 768px |
| 390×844 手機 | 八頁切換與第 8 頁單欄卡片 | 通過；八頁 scrollWidth 均為 390px |

手機第 7 頁初測時，原生檔案輸入的最小內容寬度使表單右側多出 21px。修正表單 `min-width` 與檔案輸入寬度後，以相同 390×844 條件重測，表單右緣為 378px，頁面 scrollWidth 回到 390px。

## 互動驗證

| 活動 | 操作 | 成功證據 |
|---|---|---|
| 頁籤 | 點擊與鍵盤左右方向鍵 | 正確更新 `aria-selected`、tabpanel 與學習進度 |
| 第 8 頁導覽 | 從第 7 頁籤按右方向鍵 | 焦點與選取同步移至 `tab-8`，第 8 頁取消 hidden，進度顯示「第 8 站，共 8 站」 |
| 全球典藏卡片 | 計數與連結屬性檢查 | 12 張卡片、12 個唯一 HTTPS 連結；皆在新分頁安全開啟 |
| 首頁推論 | 選擇三個解釋 | 正確答案提供證據式回饋；錯誤答案提示重新觀察，不直接洩漏完整流程 |
| 四階段流程 | 上一階段、下一階段、播放、暫停、重播 | 可達階段 4；標題、描述、aria-label 與畫面同步 |
| 預測任務 | 選不透光素材並填理由 | 顯示合理預測回饋；未填理由會阻止送出 |
| 公平測試 | 判斷同時改變兩項條件 | 正確指出無法辨認唯一原因 |
| 線上模擬 | 加入素材、切換透光、調曝光、開始模擬、重設 | WebP 素材可載入；曝光狀態成立；結果文字同步 |
| 素材操作 | Pointer 拖曳、方向鍵與 Shift 微調、Delete | 位置可改變，選取框與計數同步 |
| 安全檢查 | 四項勾選後送出 | 未完成會提示剩餘項目；完成後仍要求教師再次確認 |
| 藝術提案 | 換題、輸入構圖計畫 | 提案循環切換；計畫寫入 localStorage |
| 作品照片 | 選本機圖片 | 只產生本機 object URL 預覽，不上傳資料 |
| 概念測驗 | 4 題正確答案 | 顯示 4／4 與遷移任務 |
| 降低動畫 | 模擬 `prefers-reduced-motion: reduce` | 媒體查詢成立；流程仍能用下一步按鈕到達階段 2 |

## 截圖證據

- 桌機七頁：`test-results/desktop/page-1.png` 至 `page-7.png`
- 桌機模擬後狀態：`test-results/desktop/final-page-4.webp.png`
- 平板重點頁：`test-results/tablet/page-1.png`、`page-4.png`、`page-6.png`
- 手機重點頁：`test-results/mobile/page-1.png`、`page-2.png`、`page-4.png`、`page-5.png`、`page-7-fixed.png`
- 最終 WebP 與手機首頁：`test-results/mobile/final-page-1.png`
- GitHub Pages 子路徑預覽：`test-results/desktop/pages-subpath-preview.png`
- 公開版手機模擬：`test-results/mobile/public-page-4.png`
- 第 8 頁桌機／平板／手機：`test-results/desktop/page-8.png`、`test-results/tablet/page-8.png`、`test-results/mobile/page-8.png`

## GitHub Pages 公開版驗證

- Repository：`https://github.com/prayer168/cyanotype-lab`
- 公開網址：`https://prayer168.github.io/cyanotype-lab/`
- 發布方式：`main` 推送後，由 GitHub Actions 執行 `npm ci`、內容驗證、Vite build、Pages artifact 上傳與部署。
- 首次成功 workflow run：`https://github.com/prayer168/cyanotype-lab/actions/runs/29645326766`
- 公開版以 390×844 逐一切換七頁，scrollWidth 均為 390px；主視覺、素材板與藝術示例的 naturalWidth 均大於 0。
- 公開模擬器可加入不透光蕨葉與半透明羽毛，完成相對曝光量 50% 的模擬。

## 已知模型限制

- 線上模擬只呈現方向性關係，不預測真實曝光分鐘數。
- 真實結果仍受紙張配方、UV 強度、雲量、接觸緊密度、水洗與氧化影響。
- 作品照片只在當前瀏覽器頁面預覽，不會保存或上傳。
