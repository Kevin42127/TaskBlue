'use client';

import TaskBlueLogo from './TaskBlueLogo';

export default function LogoShowcase() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">TaskBlue Logo 設計方案</h1>
        
        <div className="space-y-12">
          {/* 主要 Logo 變體 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">主要 Logo 變體</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-4">預設版本</h3>
                <TaskBlueLogo size="lg" variant="default" showText={true} />
                <p className="text-sm text-gray-600 mt-4">
                  經典的 TB 字母組合，搭配任務點裝飾，展現專業感
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-4">簡約版本</h3>
                <TaskBlueLogo size="lg" variant="minimal" showText={true} />
                <p className="text-sm text-gray-600 mt-4">
                  最簡潔的設計，適合小尺寸使用
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-4">堆疊版本</h3>
                <TaskBlueLogo size="lg" variant="stacked" showText={true} />
                <p className="text-sm text-gray-600 mt-4">
                  任務清單的視覺化表現，更具象徵意義
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-4">點陣版本</h3>
                <TaskBlueLogo size="lg" variant="dots" showText={true} />
                <p className="text-sm text-gray-600 mt-4">
                  三個點代表任務進度，現代幾何設計
                </p>
              </div>
            </div>
          </section>

          {/* 尺寸變體 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">不同尺寸</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <TaskBlueLogo size="sm" variant="default" showText={false} />
                  <p className="text-sm text-gray-600 mt-2">小尺寸 (24px)</p>
                </div>
                <div className="text-center">
                  <TaskBlueLogo size="md" variant="default" showText={false} />
                  <p className="text-sm text-gray-600 mt-2">中尺寸 (40px)</p>
                </div>
                <div className="text-center">
                  <TaskBlueLogo size="lg" variant="default" showText={false} />
                  <p className="text-sm text-gray-600 mt-2">大尺寸 (64px)</p>
                </div>
              </div>
            </div>
          </section>

          {/* 使用場景 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">使用場景</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Header 使用</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <TaskBlueLogo size="md" variant="default" showText={true} />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  應用程式頂部導航欄
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-4">按鈕使用</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <TaskBlueLogo size="sm" variant="minimal" showText={false} />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  小按鈕或圖標使用
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-700 mb-4">品牌展示</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <TaskBlueLogo size="lg" variant="default" showText={true} />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  品牌介紹或登陸頁面
                </p>
              </div>
            </div>
          </section>

          {/* 設計說明 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">設計說明</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">色彩方案</h3>
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-taskblue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TB</span>
                    </div>
                    <div className="w-12 h-12 bg-taskblue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TB</span>
                    </div>
                    <div className="w-12 h-12 bg-taskblue-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">TB</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    使用 TaskBlue 專屬色彩，從淺到深的漸變效果
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">設計元素</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• TB 字母：TaskBlue 的縮寫</li>
                    <li>• 圓角設計：現代友好的視覺感受</li>
                    <li>• 陰影效果：增加立體感和專業感</li>
                    <li>• 任務點：代表任務管理的核心功能</li>
                    <li>• 漸變背景：豐富的視覺層次</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
