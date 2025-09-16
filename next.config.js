/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true, // 如果圖片載入有問題，可以嘗試這個設定
  },
}

module.exports = nextConfig
