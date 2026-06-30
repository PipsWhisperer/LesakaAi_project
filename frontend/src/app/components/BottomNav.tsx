import React from 'react';
import { Home, Map, Bell, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { id: 'map' as Screen, icon: Map, label: 'Map' },
    { id: 'alerts' as Screen, icon: Bell, label: 'Alerts' },
    { id: 'support' as Screen, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-colors relative"
              whileTap={{ scale: 0.95 }}
            >
              <Icon 
                className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-gray-500'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span 
                className={`mt-1 ${isActive ? 'text-primary' : 'text-gray-500'}`}
                style={{ fontSize: '0.75rem', fontWeight: isActive ? 600 : 400 }}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
