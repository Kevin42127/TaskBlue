# TaskBlue 部署指南

## 🚀 Vercel 部署

### 前置準備

1. **確保專案完整性**
   ```bash
   # 檢查所有檔案是否存在
   ls -la
   # 應該包含：package.json, next.config.js, app/, components/, public/ 等
   ```

2. **本地測試**
   ```bash
   # 安裝依賴
   npm install
   
   # 本地開發測試
   npm run dev
   
   # 建置測試
   npm run build
   npm start
   ```

### 部署步驟

#### 方法一：Vercel CLI（推薦）

1. **安裝 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登入 Vercel**
   ```bash
   vercel login
   ```

3. **部署專案**
   ```bash
   # 在專案根目錄執行
   vercel
   
   # 或指定專案名稱
   vercel --name taskblue
   ```

4. **生產環境部署**
   ```bash
   vercel --prod
   ```

#### 方法二：GitHub 整合

1. **推送程式碼到 GitHub**
   ```bash
   git add .
   git commit -m "準備部署到 Vercel"
   git push origin main
   ```

2. **在 Vercel 網站操作**
   - 前往 [vercel.com](https://vercel.com)
   - 點擊 "New Project"
   - 選擇 GitHub 倉庫
   - 選擇 "Next.js" 框架
   - 點擊 "Deploy"

### 環境變數設定

目前 TaskBlue 不需要環境變數，但如果未來需要：

1. **在 Vercel Dashboard 設定**
   - 專案 → Settings → Environment Variables
   - 新增需要的變數

2. **使用 Vercel CLI**
   ```bash
   vercel env add VARIABLE_NAME
   ```

### 部署配置說明

#### vercel.json 配置

```json
{
  "framework": "nextjs",           // 指定 Next.js 框架
  "buildCommand": "npm run build",  // 建置指令
  "outputDirectory": ".next",      // 輸出目錄
  "installCommand": "npm install", // 安裝指令
  "devCommand": "npm run dev",      // 開發指令
  "regions": ["hkg1"],             // 部署區域（香港）
  "functions": {                   // 函數配置
    "app/**/*.tsx": {
      "runtime": "nodejs18.x"
    }
  }
}
```

#### 安全標頭設定

- `X-Content-Type-Options: nosniff` - 防止 MIME 類型嗅探
- `X-Frame-Options: DENY` - 防止點擊劫持
- `X-XSS-Protection: 1; mode=block` - XSS 保護

### 部署後檢查

1. **功能測試**
   - [ ] 首頁載入正常
   - [ ] 新增任務功能
   - [ ] 編輯任務功能
   - [ ] 刪除任務功能
   - [ ] 任務篩選功能
   - [ ] 排序功能
   - [ ] 資料匯出/匯入功能
   - [ ] 搜尋功能

2. **效能檢查**
   - [ ] 頁面載入速度
   - [ ] 動畫效果正常
   - [ ] 響應式設計

3. **瀏覽器相容性**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

### 常見問題

#### 1. 建置失敗
```bash
# 檢查 Node.js 版本
node --version

# 清除快取重新安裝
rm -rf node_modules package-lock.json
npm install
```

#### 2. 靜態資源載入失敗
- 確認 `public/` 目錄中的檔案
- 檢查 `next.config.js` 配置

#### 3. 環境變數問題
- 確認所有必要的環境變數都已設定
- 檢查變數名稱大小寫

### 自訂網域

1. **在 Vercel Dashboard**
   - 專案 → Settings → Domains
   - 新增自訂網域

2. **DNS 設定**
   - 將網域指向 Vercel 的 IP
   - 或使用 CNAME 記錄

### 監控和分析

1. **Vercel Analytics**
   - 自動啟用
   - 在 Dashboard 查看數據

2. **效能監控**
   - Core Web Vitals
   - 載入時間分析

### 更新部署

```bash
# 推送更新
git add .
git commit -m "更新功能"
git push origin main

# Vercel 會自動重新部署
```

### 回滾部署

```bash
# 查看部署歷史
vercel ls

# 回滾到特定部署
vercel rollback [deployment-url]
```

## 📱 PWA 功能

TaskBlue 已配置 PWA 功能：

- **manifest.json** - 應用程式清單
- **favicon.ico** - 網站圖示
- **apple-touch-icon.png** - iOS 圖示
- **android-chrome-*.png** - Android 圖示

部署後可安裝為桌面應用程式。

## 🔧 技術規格

- **框架**: Next.js 14
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **動畫**: Framer Motion
- **圖示**: Lucide React
- **日期**: date-fns
- **部署**: Vercel

## 📞 支援

如有部署問題，請檢查：

1. Vercel 部署日誌
2. 瀏覽器開發者工具
3. 網路連線狀態
4. 瀏覽器相容性

---

**部署成功後，您的 TaskBlue 任務管理工具就可以在網路上使用了！** 🎉
