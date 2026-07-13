import React from 'react';
import { Home, Map, List, Radio, Bell, BarChart3, CreditCard, HelpCircle, Settings, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface SideNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function SideNav({ currentScreen, onNavigate }: SideNavProps) {
  const navItems = [
    { id: 'dashboard' as Screen, icon: Home, label: 'Dashboard' },
    { id: 'map' as Screen, icon: Map, label: 'Live Map' },
    { id: 'cattle-list' as Screen, icon: List, label: 'Cattle List' },
    { id: 'device-status' as Screen, icon: Radio, label: 'Devices' },
    { id: 'alerts' as Screen, icon: Bell, label: 'Alerts' },
    { id: 'reports' as Screen, icon: BarChart3, label: 'Reports' },
    { id: 'billing' as Screen, icon: CreditCard, label: 'Billing' },
    { id: 'support' as Screen, icon: HelpCircle, label: 'Support' },
    { id: 'admin' as Screen, icon: Settings, label: 'Admin' },
  ];

  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span style={{ fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeSideTab"
                    className="ml-auto w-1 h-6 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Persona Context Switcher */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-dark truncate" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
              Andries Mooketsi Moiteelasilo
            </p>
            <p className="text-gray-500 truncate" style={{ fontSize: '0.75rem' }}>
              Principal System Administrator
            </p>
            <p className="text-gray-400 truncate" style={{ fontSize: '0.65rem' }}>
              +267 71 234 567
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}