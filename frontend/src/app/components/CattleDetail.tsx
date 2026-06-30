import React from 'react';
import { ArrowLeft, MapPin, Radio, Battery, Activity, Calendar, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface CattleDetailProps {
  cattleId: string | null;
  onNavigate: (screen: Screen) => void;
}

export function CattleDetail({ cattleId, onNavigate }: CattleDetailProps) {
  const healthData = [
    { date: 'Mon', activity: 65 },
    { date: 'Tue', activity: 72 },
    { date: 'Wed', activity: 68 },
    { date: 'Thu', activity: 85 },
    { date: 'Fri', activity: 78 },
    { date: 'Sat', activity: 82 },
    { date: 'Sun', activity: 75 },
  ];

  const cattle = {
    id: cattleId || 'BW-MUN-1109',
    tag: cattleId || 'BW-MUN-1109',
    deviceId: 'HW-9021',
    breed: 'Brahman Cross',
    age: '2.5 years',
    weight: '550 kg',
    location: 'Main Grazing Camp Alpha',
    lastMovement: '5 minutes ago',
    battery: 85,
    signal: 'Good',
    thermalStatus: 'Nominal',
    notes: 'Regular pathological health checkup scheduled for next week. Thermal stress monitoring active. No anomalies detected in last 72-hour telemetry window.',
  };

  return (
    <div className="min-h-full bg-neutral-bg">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <motion.button
            onClick={() => onNavigate('cattle-list')}
            className="p-2 hover:bg-gray-100 rounded-lg"
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </motion.button>
          <div className="flex-1 min-w-0">
            <h2 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Agent Molemo Pathology Profile</h2>
            <p className="text-gray-500 break-words" style={{ fontSize: '0.875rem' }}>{cattle.tag}</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
        {/* Main Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg mb-2 flex-wrap">
                <span className="text-primary break-words" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Asset Tag ID: {cattle.tag}</span>
                <span className="text-gray-400">|</span>
                <span className="text-secondary break-words" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Device Transceiver: #{cattle.deviceId}</span>
              </div>
              <h3 className="text-text-dark mb-1 break-words" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{cattle.tag}</h3>
              <p className="text-gray-600 break-words">{cattle.breed}</p>
            </div>
            <div className="px-3 py-1 bg-success/10 text-success rounded-full whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
              Active
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Connected Hardware</p>
              <p className="text-text-dark break-words" style={{ fontWeight: 600 }}>{cattle.deviceId}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Age</p>
              <p className="text-text-dark break-words" style={{ fontWeight: 600 }}>{cattle.age}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Weight</p>
              <p className="text-text-dark break-words" style={{ fontWeight: 600 }}>{cattle.weight}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Last Movement Timestamp</p>
              <p className="text-text-dark break-words" style={{ fontWeight: 600 }}>{cattle.lastMovement}</p>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>Location</p>
                <p className="text-text-dark" style={{ fontWeight: 600, fontSize: '0.875rem' }}>{cattle.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Battery className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>Battery</p>
                <p className="text-text-dark" style={{ fontWeight: 600, fontSize: '0.875rem' }}>{cattle.battery}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Radio className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>Signal</p>
                <p className="text-text-dark" style={{ fontWeight: 600, fontSize: '0.875rem' }}>{cattle.signal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Activity className="w-5 h-5 text-primary flex-shrink-0" />
            <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Biological Health & Thermal Trend (7 Days)</h3>
          </div>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthData}>
                <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '0.75rem' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '0.75rem' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '0.875rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#2E7D32" 
                  strokeWidth={3}
                  dot={{ fill: '#2E7D32', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Diagnostic Console */}
        <div className="rounded-xl overflow-hidden border border-gray-800" style={{ backgroundColor: '#0D1117' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-gray-400 font-mono" style={{ fontSize: '0.75rem' }}>Agent Molemo :: Diagnostic Console</span>
            </div>
            <span className="px-2 py-0.5 bg-red-900/60 text-red-400 rounded font-mono whitespace-nowrap" style={{ fontSize: '0.65rem' }}>CRITICAL_FLAGS ACTIVE</span>
          </div>
          <div className="p-4 font-mono space-y-2" style={{ fontSize: '0.75rem' }}>
            <div className="flex gap-3 flex-wrap">
              <span className="text-gray-500 whitespace-nowrap">[SCAN_ID: S-2024-1109]</span>
              <span className="text-blue-400">PATHOLOGY_SCAN_COMPLETE</span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="text-gray-500 whitespace-nowrap">[FLAG_01]</span>
              <span className="text-red-400">Symptom Code: S01_LETHARGY</span>
              <span className="text-gray-400">|</span>
              <span className="text-yellow-300">Action: State Flag Critical Overheat</span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="text-gray-500 whitespace-nowrap">[FLAG_02]</span>
              <span className="text-yellow-400">Symptom Code: S04_THERMAL_STRESS</span>
              <span className="text-gray-400">|</span>
              <span className="text-yellow-300">Action: Escalate to Veterinary Review</span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="text-gray-500 whitespace-nowrap">[RECOMMENDATION]</span>
              <span className="text-green-400">ROUTE_TO_SUPERVISOR :: Intervention Required</span>
            </div>
          </div>
        </div>

        {/* Map Snippet */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Current Geospatial Position</h3>
          </div>
          <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 relative">
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="mini-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2E7D32" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#mini-grid)" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-12 h-12 bg-success rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" fill="white" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-hidden">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>System Notes</h3>
          </div>
          <p className="text-gray-700 break-words" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
            {cattle.notes}
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <motion.button
            className="bg-primary text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
            style={{ fontWeight: 600 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('map')}
          >
            <MapPin className="w-5 h-5" />
            <span className="break-words">View on Geofence Map</span>
          </motion.button>
          <motion.button
            className="bg-white border border-gray-200 text-text-dark px-6 py-3 rounded-lg flex items-center justify-center gap-2"
            style={{ fontWeight: 600 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-5 h-5" />
            <span className="break-words">View Movement History Stack</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}