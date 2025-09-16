'use client';

interface TaskBlueImageLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function TaskBlueImageLogo({ 
  size = 'md', 
  showText = true,
  className = ''
}: TaskBlueImageLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const imageSize = {
    sm: 24,
    md: 40,
    lg: 64
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <img
          src="/TASKBLUE.png"
          alt="TaskBlue Logo"
          width={imageSize[size]}
          height={imageSize[size]}
          className={`${sizeClasses[size]} object-contain`}
          onError={(e) => {
            console.error('Failed to load logo:', e);
            // 如果圖片載入失敗，顯示備用文字
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        {/* 備用文字 LOGO */}
        <div className={`${sizeClasses[size]} bg-blue-600 rounded-lg flex items-center justify-center shadow-md hidden`}>
          <span className="text-white font-bold text-xs">TB</span>
        </div>
      </div>
      {showText && (
        <div>
          <h1 className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
            TaskBlue
          </h1>
        </div>
      )}
    </div>
  );
}
