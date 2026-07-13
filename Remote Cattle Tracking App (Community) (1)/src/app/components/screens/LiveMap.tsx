import { useState } from 'react';
import { Header } from '../layout/Header';
import { MapPin, ZoomIn, ZoomOut, Maximize2, Navigation } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Badge } from '../ui/badge';
import { useNavigate } from 'react-router-dom';

interface Cattle {
  id: string;
  tag: string;
  lat: number;
  lng: number;
  status: 'good' | 'warning' | 'alert';
  lastUpdate: string;
}

export function LiveMap() {
  const navigate = useNavigate();
  const [selectedCattle, setSelectedCattle] = useState<Cattle | null>(null);
  
  const cattle: Cattle[] = [
    { id: '1', tag: 'A247', lat: 35, lng: 25, status: 'alert', lastUpdate: '2 min ago' },
    { id: '2', tag: 'B156', lat: 55, lng: 45, status: 'good', lastUpdate: '5 min ago' },
    { id: '3', tag: 'C234', lat: 45, lng: 65, status: 'good', lastUpdate: '3 min ago' },
    { id: '4', tag: 'D089', lat: 65, lng: 35, status: 'warning', lastUpdate: '8 min ago' },
    { id: '5', tag: 'E102', lat: 75, lng: 55, status: 'good', lastUpdate: '1 min ago' },
    { id: '6', tag: 'F178', lat: 25, lng: 75, status: 'good', lastUpdate: '4 min ago' },
  ];

  const recentMovements = [
    { tag: 'A247', time: '2 min ago', location: 'North Pasture (Boundary)', status: 'alert' },
    { tag: 'E102', time: '1 min ago', location: 'Water Point East', status: 'good' },
    { tag: 'C234', time: '3 min ago', location: 'Main Grazing Area', status: 'good' },
    { tag: 'D089', time: '8 min ago', location: 'South Field', status: 'warning' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 lg:pb-0">
      <Header title="Live Map" />
      
      <div className="relative h-[calc(100vh-4rem-5rem)] lg:h-[calc(100vh-4rem)]">
        {/* Map Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
          {/* Farm Boundary */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(46, 125, 50, 0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Farm Boundary Line */}
            <path
              d="M 10% 10% L 90% 10% L 90% 90% L 10% 90% Z"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="3"
              strokeDasharray="10,5"
            />
            
            {/* Pasture Zones */}
            <rect x="12%" y="12%" width="35%" height="35%" fill="rgba(46, 125, 50, 0.05)" stroke="rgba(46, 125, 50, 0.3)" strokeWidth="1" rx="4" />
            <rect x="52%" y="12%" width="35%" height="35%" fill="rgba(21, 101, 192, 0.05)" stroke="rgba(21, 101, 192, 0.3)" strokeWidth="1" rx="4" />
            <rect x="12%" y="52%" width="75%" height="35%" fill="rgba(46, 125, 50, 0.05)" stroke="rgba(46, 125, 50, 0.3)" strokeWidth="1" rx="4" />
          </svg>
          
          {/* Cattle Markers */}
          {cattle.map((cow) => (
            <button
              key={cow.id}
              onClick={() => setSelectedCattle(cow)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform cursor-pointer"
              style={{ left: `${cow.lng}%`, top: `${cow.lat}%` }}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  cow.status === 'alert' ? 'bg-[#FF8F00] animate-pulse' :
                  cow.status === 'warning' ? 'bg-yellow-500' :
                  'bg-[#2E7D32]'
                }`}>
                  <span className="text-white text-lg">🐄</span>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow text-xs">
                  {cow.tag}
                </div>
              </div>
            </button>
          ))}
          
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
            <p className="text-xs text-gray-600 mb-2">Farm: Green Acres</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-[#2E7D32]"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-[#FF8F00]"></div>
                <span>Alert</span>
              </div>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </button>
            <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <ZoomOut className="w-5 h-5 text-gray-700" />
            </button>
            <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <Maximize2 className="w-5 h-5 text-gray-700" />
            </button>
            <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <Navigation className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Bottom Sheet - Recent Movements */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl p-4 max-h-48 overflow-y-auto">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 className="mb-3 text-[#212121]">Recent Movements</h3>
          
          <div className="space-y-2">
            {recentMovements.map((movement, idx) => (
              <div 
                key={idx}
                onClick={() => navigate(`/cattle/${movement.tag}`)}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    movement.status === 'alert' ? 'bg-[#FF8F00]' :
                    movement.status === 'warning' ? 'bg-yellow-500' :
                    'bg-[#2E7D32]'
                  }`}></div>
                  <div>
                    <p className="text-sm text-[#212121]">{movement.tag}</p>
                    <p className="text-xs text-gray-500">{movement.location}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{movement.time}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Cattle Detail Popup */}
        {selectedCattle && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-80 max-w-[90vw]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[#212121] mb-1">Cattle {selectedCattle.tag}</h3>
                <Badge variant={selectedCattle.status === 'alert' ? 'destructive' : 'default'}>
                  {selectedCattle.status.toUpperCase()}
                </Badge>
              </div>
              <button 
                onClick={() => setSelectedCattle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Last Update: {selectedCattle.lastUpdate}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate(`/cattle/${selectedCattle.tag}`)}
              className="w-full bg-[#2E7D32] text-white py-2 rounded-lg hover:bg-[#1B5E20] transition-colors"
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
