import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LiveMap } from './components/LiveMap';
import { CattleList } from './components/CattleList';
import { CattleDetail } from './components/CattleDetail';
import { DeviceStatus } from './components/DeviceStatus';
import { Alerts } from './components/Alerts';
import { Reports } from './components/Reports';
import { Billing } from './components/Billing';
import { Support } from './components/Support';
import { Admin } from './components/Admin';
import { BottomNav } from './components/BottomNav';
import { SideNav } from './components/SideNav';
import { Header } from './components/Header';

export type Screen = 
  | 'dashboard' 
  | 'map' 
  | 'cattle-list' 
  | 'cattle-detail' 
  | 'device-status' 
  | 'alerts' 
  | 'reports' 
  | 'billing' 
  | 'support' 
  | 'admin';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedCattleId, setSelectedCattleId] = useState<string | null>(null);

  const navigateTo = (screen: Screen, cattleId?: string) => {
    setCurrentScreen(screen);
    if (cattleId) {
      setSelectedCattleId(cattleId);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'map':
        return <LiveMap onNavigate={navigateTo} />;
      case 'cattle-list':
        return <CattleList onNavigate={navigateTo} />;
      case 'cattle-detail':
        return <CattleDetail cattleId={selectedCattleId} onNavigate={navigateTo} />;
      case 'device-status':
        return <DeviceStatus onNavigate={navigateTo} />;
      case 'alerts':
        return <Alerts onNavigate={navigateTo} />;
      case 'reports':
        return <Reports onNavigate={navigateTo} />;
      case 'billing':
        return <Billing onNavigate={navigateTo} />;
      case 'support':
        return <Support onNavigate={navigateTo} />;
      case 'admin':
        return <Admin onNavigate={navigateTo} />;
      default:
        return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        <SideNav currentScreen={currentScreen} onNavigate={navigateTo} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header currentScreen={currentScreen} />
          <main className="flex-1 overflow-y-auto">
            {renderScreen()}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-screen">
        <Header currentScreen={currentScreen} />
        <main className="flex-1 overflow-y-auto pb-20">
          {renderScreen()}
        </main>
        <BottomNav currentScreen={currentScreen} onNavigate={navigateTo} />
      </div>
    </div>
  );
}
