'use client';

export default function TestLogoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">LOGO 測試頁面</h1>
        
        <div className="space-y-8">
          {/* 測試 1: 直接使用 img 標籤 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">測試 1: 直接 img 標籤</h2>
            <img 
              src="/TASKBLUE.png" 
              alt="TaskBlue Logo" 
              className="w-16 h-16 object-contain border border-gray-300"
              onLoad={() => console.log('圖片載入成功')}
              onError={(e) => console.error('圖片載入失敗:', e)}
            />
          </div>

          {/* 測試 2: 檢查檔案路徑 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">測試 2: 檔案路徑檢查</h2>
            <div className="space-y-2">
              <p>當前路徑: <code>/TASKBLUE.png</code></p>
              <p>實際檔案位置: <code>public/TASKBLUE.png</code></p>
              <p>完整 URL: <code>http://localhost:3000/TASKBLUE.png</code></p>
            </div>
          </div>

          {/* 測試 3: 不同尺寸 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">測試 3: 不同尺寸</h2>
            <div className="flex items-center space-x-4">
              <img src="/TASKBLUE.png" alt="Small" className="w-6 h-6 object-contain border" />
              <img src="/TASKBLUE.png" alt="Medium" className="w-10 h-10 object-contain border" />
              <img src="/TASKBLUE.png" alt="Large" className="w-16 h-16 object-contain border" />
            </div>
          </div>

          {/* 測試 4: 背景色測試 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">測試 4: 不同背景</h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white border flex items-center justify-center">
                <img src="/TASKBLUE.png" alt="White BG" className="w-12 h-12 object-contain" />
              </div>
              <div className="w-16 h-16 bg-gray-100 border flex items-center justify-center">
                <img src="/TASKBLUE.png" alt="Gray BG" className="w-12 h-12 object-contain" />
              </div>
              <div className="w-16 h-16 bg-blue-100 border flex items-center justify-center">
                <img src="/TASKBLUE.png" alt="Blue BG" className="w-12 h-12 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
