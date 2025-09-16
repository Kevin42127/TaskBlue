'use client';

interface TaskBlueLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'stacked' | 'dots';
  showText?: boolean;
  className?: string;
}

export default function TaskBlueLogo({ 
  size = 'md', 
  variant = 'default', 
  showText = true,
  className = ''
}: TaskBlueLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const iconSizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const renderLogo = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} bg-taskblue-600 rounded-lg flex items-center justify-center shadow-md`}>
              <span className={`text-white font-bold ${textSizeClasses[size]}`}>TB</span>
            </div>
          </div>
        );

      case 'stacked':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} bg-gradient-to-br from-taskblue-400 to-taskblue-600 rounded-xl flex items-center justify-center shadow-lg`}>
              <div className="flex flex-col space-y-0.5">
                <div className="w-3 h-0.5 bg-white rounded"></div>
                <div className="w-3 h-0.5 bg-white rounded"></div>
                <div className="w-3 h-0.5 bg-white rounded"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-md">
              <div className={`${iconSizeClasses[size]} bg-taskblue-500 rounded-full`}></div>
            </div>
          </div>
        );

      case 'dots':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} bg-gradient-to-br from-taskblue-500 to-taskblue-700 rounded-xl flex items-center justify-center shadow-lg`}>
              <div className="flex space-x-1">
                <div className={`${iconSizeClasses[size]} bg-white rounded-full`}></div>
                <div className={`${iconSizeClasses[size]} bg-white rounded-full`}></div>
                <div className={`${iconSizeClasses[size]} bg-white rounded-full`}></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} bg-gradient-to-br from-taskblue-500 to-taskblue-700 rounded-xl flex items-center justify-center shadow-lg`}>
              <span className={`text-white font-bold ${textSizeClasses[size]}`}>TB</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
              <div className={`${iconSizeClasses[size]} bg-taskblue-500 rounded-full`}></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {renderLogo()}
      {showText && (
        <div>
          <h1 className={`font-bold text-gray-900 ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-3xl' : 'text-2xl'}`}>
            TaskBlue
          </h1>
          {size !== 'sm' && (
            <p className="text-xs text-taskblue-600 font-medium">藍色專注，任務清晰</p>
          )}
        </div>
      )}
    </div>
  );
}
