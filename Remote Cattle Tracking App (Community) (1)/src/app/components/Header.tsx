import React from 'react';
import { Bell } from 'lucide-react';
import { Screen } from '../App';
import { LesakaIcon } from './LesakaIcon';

interface HeaderProps {
  currentScreen: Screen;
}

export function Header({ currentScreen }: HeaderProps) {
  const getTitle = () => {
    const titles: Record<Screen, string> = {
      'dashboard': 'Central Management Hub',
      'map': 'Geospatial Perimeter Interface',
      'cattle-list': 'Livestock Asset Registry',
      'cattle-detail': 'Agent Molemo Pathology Profiler',
      'device-status': 'Agent Loapi IoT Sensor Daemon',
      'alerts': 'Orchestration Engine Exception Manager',
      'reports': 'Agent Thekiso NDVI Matrix Analyzer',
      'billing': 'Commercial Subscription Ledger',
      'support': 'Field Technician Escalation Center',
      'admin': 'Multi-Tenant Infrastructure Panel'
    };
    return titles[currentScreen];
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <LesakaIcon size={40} className="md:w-[48px] md:h-[48px]" />
              <div className="hidden sm:block max-w-[280px]">
                <h1 className="text-primary leading-tight break-words" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  Lesaka AI
                </h1>
                <p className="text-gray-500 leading-tight break-words" style={{ fontSize: '0.65rem' }}>
                  Remote Cattle Tracking & Telemetry Hub
                </p>
              </div>
            </div>
            <div className="hidden md:block ml-8">
              <h2 className="text-text-dark break-words max-w-[400px]">{getTitle()}</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <span style={{ fontSize: '0.875rem' }}>AM</span>
              </div>
              <span className="text-gray-700" style={{ fontSize: '0.875rem' }}>Andries M Moiteelasilo</span>
            </div>
          </div>
        </div>
        
        <div className="md:hidden mt-2">
          <h2 className="text-text-dark break-words">{getTitle()}</h2>
        </div>
      </div>
    </header>
  );
}