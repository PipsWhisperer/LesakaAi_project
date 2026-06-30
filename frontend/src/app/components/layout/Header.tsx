import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
}

export function Header({ title, showNotifications = true }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center gap-3">
          <div className="lg:hidden w-10 h-10 rounded-lg bg-[#2E7D32] flex items-center justify-center">
            <span className="text-white text-xl">🐄</span>
          </div>
          <div>
            <h1 className="text-[#212121]">{title}</h1>
            <p className="text-xs text-gray-500 lg:hidden">HerdWatch</p>
          </div>
        </div>
        
        {showNotifications && (
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF8F00] rounded-full"></span>
          </button>
        )}
      </div>
    </header>
  );
}
