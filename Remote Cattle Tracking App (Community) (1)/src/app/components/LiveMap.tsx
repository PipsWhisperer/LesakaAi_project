import React, { useState } from 'react';
import { MapPin, Navigation, Maximize2, ChevronUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from '../App';

interface LiveMapProps {
  onNavigate: (screen: Screen, cattleId?: string) => void;
}

export function LiveMap({ onNavigate }: LiveMapProps) {
  const [selectedCattle, setSelectedCattle] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(true);

  const cattlePositions = [
    { id: 'BW-MUN-1109', x: 25, y: 30, status: 'active', tag: 'BW-MUN-1109', breed: 'Brahman Cross' },
    { id: 'BW-MUN-2847', x: 45, y: 40, status: 'warning', tag: 'BW-MUN-2847', breed: 'Nguni' },
    { id: 'BW-MUN-0934', x: 60, y: 25, status: 'active', tag: 'BW-MUN-0934', breed: 'Bonsmara' },
    { id: 'BW-MUN-1523', x: 35, y: 55, status: 'active', tag: 'BW-MUN-1523', breed: 'Brahman Cross' },
    { id: 'BW-MUN-3421', x: 70, y: 50, status: 'active', tag: 'BW-MUN-3421', breed: 'Simmental' },
    { id: 'BW-MUN-0123', x: 50, y: 65, status: 'offline', tag: 'BW-MUN-0123', breed: 'Afrikaner' },
    { id: 'BW-MUN-4532', x: 80, y: 35, status: 'active', tag: 'BW-MUN-4532', breed: 'Brahman Cross' },
    { id: 'BW-MUN-2890', x: 40, y: 70, status: 'active', tag: 'BW-MUN-2890', breed: 'Nguni' },
  ];

  const recentMovements = [
    { cattle: 'BW-MUN-1109', location: 'Main Grazing Camp Alpha', time: '2 mins ago', distance: '1.2 km' },
    { cattle: 'BW-MUN-2847', location: 'Water Point Delta', time: '15 mins ago', distance: '0.8 km' },
    { cattle: 'BW-MUN-0934', location: 'East Field Sector-B', time: '23 mins ago', distance: '2.1 km' },
    { cattle: 'BW-MUN-1523', location: 'South Grazing Zone', time: '45 mins ago', distance: '1.5 km' },
  ];

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'offline': return 'bg-error';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="relative h-full bg-neutral-bg">
      {/* Map Container */}
      <div className="relative h-full">
        {/* Map Background - Simulated */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100">
          {/* Grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2E7D32" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Farm Boundary */}
          <svg className="absolute inset-0 w-full h-full">
            <polygon
              points="10%,15% 85%,20% 90%,80% 15%,85%"
              fill="none"
              stroke="#2E7D32"
              strokeWidth="3"
              strokeDasharray="10,5"
              className="opacity-60"
            />
          </svg>

          {/* Cattle Markers */}
          {cattlePositions.map((cattle) => (
            <motion.div
              key={cattle.id}
              className="absolute cursor-pointer"
              style={{ left: `${cattle.x}%`, top: `${cattle.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSelectedCattle(cattle.id);
                onNavigate('cattle-detail', cattle.id);
              }}
            >
              <div className="relative">
                <div className={`w-8 h-8 md:w-10 md:h-10 ${getMarkerColor(cattle.status)} rounded-full border-4 border-white shadow-lg flex items-center justify-center`}>
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" fill="white" />
                </div>
                {cattle.status === 'warning' && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-warning"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </div>
              <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap" style={{ fontSize: '0.75rem' }}>
                {cattle.tag}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <motion.button
            className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Navigation className="w-5 h-5 text-gray-700" />
          </motion.button>
          <motion.button
            className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>

        {/* Farm Info Card */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 md:p-4 max-w-[300px]">
          <h3 className="text-text-dark mb-1 break-words" style={{ fontWeight: 600 }}>Main Grazing Camp Alpha</h3>
          <p className="text-gray-600 break-words" style={{ fontSize: '0.875rem' }}>1,240 tracking nodes active</p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-gray-600" style={{ fontSize: '0.75rem' }}>Online: 1,192</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-gray-600" style={{ fontSize: '0.75rem' }}>Warning: 35</span>
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-gray-600" style={{ fontSize: '0.75rem' }}>Offline: 13</span>
            </div>
          </div>
        </div>

        {/* Bottom Sheet - Recent Movements */}
        <AnimatePresence>
          {showBottomSheet && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 100 || velocity.y > 500) {
                  setShowBottomSheet(false);
                }
              }}
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Recent Telemetry Geofence Movements</h3>
                  <button
                    onClick={() => setShowBottomSheet(false)}
                    className="text-gray-400 flex-shrink-0"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {recentMovements.map((movement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => onNavigate('cattle-detail', movement.cattle)}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-text-dark break-words" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {movement.cattle}
                          </p>
                          <p className="text-gray-600 break-words" style={{ fontSize: '0.75rem' }}>
                            {movement.location} • {movement.distance}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 whitespace-nowrap flex-shrink-0" style={{ fontSize: '0.75rem' }}>
                        <Clock className="w-3 h-3" />
                        {movement.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Bottom Sheet Button (when hidden) */}
        {!showBottomSheet && (
          <motion.button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 max-w-[90%]"
            onClick={() => setShowBottomSheet(true)}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-text-dark break-words" style={{ fontWeight: 600 }}>Show Recent Movements</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}