import { Home, Map, List, Radio, AlertCircle, FileText, CreditCard, HelpCircle, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Map, label: 'Live Map', path: '/map' },
    { icon: List, label: 'Cattle List', path: '/cattle' },
    { icon: Radio, label: 'Device Status', path: '/devices' },
    { icon: AlertCircle, label: 'Alerts', path: '/alerts' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: CreditCard, label: 'Billing', path: '/billing' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
    { icon: Settings, label: 'Admin', path: '/admin' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#2E7D32] flex items-center justify-center">
            <span className="text-white text-xl">🐄</span>
          </div>
          <div>
            <h1 className="text-[#212121]">HerdWatch</h1>
            <p className="text-xs text-gray-500">Remote Cattle Tracking</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive 
                  ? 'bg-[#2E7D32]/10 text-[#2E7D32] border-r-4 border-[#2E7D32]' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-[#212121]">John Farmer</p>
            <p className="text-xs text-gray-500">john@greenacres.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
