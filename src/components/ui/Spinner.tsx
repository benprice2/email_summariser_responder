export function Spinner({ size = 'default', className = '' }: { size?: 'small' | 'default' | 'large', className?: string }) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent ${className}`}></div>
  );
}
