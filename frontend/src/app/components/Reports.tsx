import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface ReportsProps {
  onNavigate: (screen: Screen) => void;
}

export function Reports({ onNavigate }: ReportsProps) {
  const [activeTab, setActiveTab] = useState('movement');

  const movementData = [
    { day: 'Mon', distance: 4.2 },
    { day: 'Tue', distance: 5.8 },
    { day: 'Wed', distance: 3.9 },
    { day: 'Thu', distance: 6.5 },
    { day: 'Fri', distance: 4.7 },
    { day: 'Sat', distance: 5.3 },
    { day: 'Sun', distance: 4.1 },
  ];

  const grazingData = [
    { area: 'North Pasture', hours: 45 },
    { area: 'East Field', hours: 32 },
    { area: 'South Grazing', hours: 28 },
    { area: 'West Field', hours: 25 },
    { area: 'Center Field', hours: 18 },
  ];

  const batteryData = [
    { range: '80-100%', count: 145, color: '#4CAF50' },
    { range: '50-80%', count: 78, color: '#2E7D32' },
    { range: '30-50%', count: 18, color: '#FF8F00' },
    { range: '0-30%', count: 6, color: '#D32F2F' },
  ];

  const cattleHistoryData = [
    { month: 'Jan', count: 220 },
    { month: 'Feb', count: 225 },
    { month: 'Mar', count: 232 },
    { month: 'Apr', count: 238 },
    { month: 'May', count: 241 },
    { month: 'Jun', count: 247 },
  ];

  const tabs = [
    { id: 'movement', label: 'Movement Report' },
    { id: 'grazing', label: 'Grazing Patterns' },
    { id: 'battery', label: 'Battery Health Matrix' },
    { id: 'history', label: 'Historical Ledger' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Header with Download */}
      <div className="flex items-center justify-between">
        <h2 className="text-text-dark" style={{ fontWeight: 600, fontSize: '1.25rem' }}>Reports & Analytics</h2>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
          style={{ fontWeight: 500, fontSize: '0.875rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          Export
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
            style={{ fontWeight: activeTab === tab.id ? 600 : 400 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Movement Report */}
      {activeTab === 'movement' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-text-dark" style={{ fontWeight: 600 }}>Average Daily Movement</h3>
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-4 h-4" />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>+12% vs last week</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={movementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '0.875rem' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '0.875rem' }} label={{ value: 'km', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '0.875rem'
                  }}
                />
                <Bar dataKey="distance" fill="#2E7D32" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Total Distance This Week</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>34.5 km</p>
              <p className="text-success" style={{ fontSize: '0.75rem' }}>+8% from last week</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Average Per Cattle</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>4.9 km</p>
              <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>per day</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Most Active</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>C-0894</p>
              <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>8.2 km today</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grazing Pattern */}
      {activeTab === 'grazing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-text-dark mb-4" style={{ fontWeight: 600 }}>Grazing Time by Area (This Week)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grazingData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '0.875rem' }} />
                <YAxis dataKey="area" type="category" stroke="#9CA3AF" style={{ fontSize: '0.875rem' }} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '0.875rem'
                  }}
                />
                <Bar dataKey="hours" fill="#1565C0" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {grazingData.map((area, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-gray-500 mb-1" style={{ fontSize: '0.75rem' }}>{area.area}</p>
                <p className="text-text-dark" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{area.hours}h</p>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary"
                    style={{ width: `${(area.hours / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* NDVI Vegetation Density Heat Map */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Agent Thekiso NDVI Vegetation Density Matrix</h3>
                <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Normalised Difference Vegetation Index — 7-day composite | Green=High Density, Brown=Low Density</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ height: '200px', position: 'relative' }}>
              {/* NDVI grid simulation */}
              <div className="absolute inset-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gridTemplateRows: 'repeat(10, 1fr)' }}>
                {Array.from({ length: 200 }).map((_, i) => {
                  const col = i % 20;
                  const row = Math.floor(i / 20);
                  const rawVal = Math.sin(col * 0.4 + row * 0.6) * 0.5 + Math.cos(col * 0.3 - row * 0.5) * 0.3 + 0.5;
                  const ndvi = Math.max(0, Math.min(1, rawVal));
                  const r = Math.round(139 * (1 - ndvi) + 46 * ndvi);
                  const g = Math.round(90 * (1 - ndvi) + 125 * ndvi);
                  const b = Math.round(43 * (1 - ndvi) + 50 * ndvi);
                  return <div key={i} style={{ backgroundColor: `rgb(${r},${g},${b})` }} />;
                })}
              </div>
              {/* Overlay labels */}
              <div className="absolute inset-0 flex items-end p-3">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 flex-wrap">
                  <span className="text-gray-700 whitespace-nowrap" style={{ fontSize: '0.65rem', fontWeight: 600 }}>NDVI INDEX:</span>
                  {[{ label: 'Dense', color: '#2E7D32' }, { label: 'Moderate', color: '#8BC34A' }, { label: 'Sparse', color: '#FFC107' }, { label: 'Bare', color: '#8B5A2B' }].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-1 whitespace-nowrap">
                      <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
                      <span style={{ fontSize: '0.65rem' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Battery Health */}
      {activeTab === 'battery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-text-dark mb-4" style={{ fontWeight: 600 }}>Battery Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={batteryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {batteryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-text-dark mb-4" style={{ fontWeight: 600 }}>Battery Status</h3>
              <div className="space-y-3">
                {batteryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-700" style={{ fontWeight: 500 }}>{item.range}</span>
                    </div>
                    <span className="text-text-dark" style={{ fontWeight: 600 }}>{item.count} devices</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Average Battery</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>78%</p>
              <p className="text-success" style={{ fontSize: '0.75rem' }}>Healthy overall</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Low Battery Alerts</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>6</p>
              <p className="text-warning" style={{ fontSize: '0.75rem' }}>Needs attention</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Charging Needed</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>24</p>
              <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>in next 7 days</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cattle History */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-text-dark mb-4" style={{ fontWeight: 600 }}>Cattle Count Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cattleHistoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '0.875rem' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '0.875rem' }} />
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
                  dataKey="count" 
                  stroke="#2E7D32" 
                  strokeWidth={3}
                  dot={{ fill: '#2E7D32', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Total Cattle</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>247</p>
              <p className="text-success" style={{ fontSize: '0.75rem' }}>+27 since Jan</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Added This Month</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>6</p>
              <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>new arrivals</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Growth Rate</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>12%</p>
              <p className="text-success" style={{ fontSize: '0.75rem' }}>6-month growth</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '0.875rem' }}>Average Age</p>
              <p className="text-text-dark" style={{ fontSize: '1.75rem', fontWeight: 700 }}>3.2 yrs</p>
              <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>across herd</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
