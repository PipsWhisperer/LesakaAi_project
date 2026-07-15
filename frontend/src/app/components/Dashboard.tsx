import React, { useState } from 'react';
import { ArrowRight, Beef, Radio, Bell, Battery, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const sandboxNodes = [
    { tag: 'BW-MUN-1109', device: 'HW-9021', lat: '-24.6531', lon: '25.9078', battery: '85%', signal: '-68 dBm', temp: '38.2°C', status: 'Nominal' },
    { tag: 'BW-MUN-2847', device: 'HW-4432', lat: '-24.6548', lon: '25.9091', battery: '31%', signal: '-74 dBm', temp: '39.1°C', status: 'Warning' },
    { tag: 'BW-MUN-0934', device: 'HW-7712', lat: '-24.6512', lon: '25.9055', battery: '92%', signal: '-61 dBm', temp: '40.5°C', status: 'Critical' },
    { tag: 'BW-MUN-1523', device: 'HW-3381', lat: '-24.6567', lon: '25.9102', battery: '78%', signal: '-70 dBm', temp: '37.8°C', status: 'Nominal' },
  ];

  const selectedNodeData = sandboxNodes.find(n => n.tag === selectedNode);

  const stats = [
    {
      icon: Beef,
      label: 'Total Tracking Nodes',
      value: '1,240',
      change: '+48 this month',
      color: 'bg-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Radio,
      label: 'Active Daemons',
      value: '1,192',
      change: '48 offline',
      color: 'bg-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Bell,
      label: 'Intercept Exceptions Today',
      value: '3',
      change: '2 unresolved',
      color: 'bg-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Battery,
      label: 'Battery Matrix Average',
      value: '78%',
      change: 'Nominal health',
      color: 'bg-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: TrendingUp,
      label: 'Market Export Value (BWP)',
      value: 'P46.5M',
      change: '+12% BMC/EU trend',
      color: 'bg-secondary',
      bgColor: 'bg-secondary/10',
    },
  ];

  const recentActivity = [
    { cattle: 'BW-MUN-1109', event: 'Geofence boundary breach detected', time: '10 mins ago', severity: 'high' },
    { cattle: 'BW-MUN-2847', event: 'Low battery warning threshold', time: '28 mins ago', severity: 'medium' },
    { cattle: 'BW-MUN-0934', event: 'Thermal stress alert detected', time: '1 hour ago', severity: 'high' },
    { cattle: 'BW-MUN-1523', event: 'Signal daemon restored', time: '2 hours ago', severity: 'low' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white">
        <h2 className="mb-1 break-words" style={{ fontWeight: 700 }}>Welcome back, Andries Mooketsi Moiteelasilo.</h2>
        <p className="text-white/90 mb-4 break-words">Regional Telemetry Nominal. All perimeter daemons operational.</p>
        <motion.button
          onClick={() => onNavigate('map')}
          className="bg-white text-primary px-6 py-2 rounded-lg flex items-center gap-2"
          style={{ fontWeight: 600 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to Live Geofence Map 🗺️
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            >
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.875rem' }}>{stat.label}</div>
              <div className="text-text-dark mb-1 break-words" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</div>
              <div className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.button
          onClick={() => onNavigate('cattle-list')}
          className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <List className="w-6 h-6 text-primary mx-auto mb-2" />
          <span className="text-gray-700" style={{ fontSize: '0.875rem', fontWeight: 500 }}>View Cattle</span>
        </motion.button>
        
        <motion.button
          onClick={() => onNavigate('device-status')}
          className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-secondary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Radio className="w-6 h-6 text-secondary mx-auto mb-2" />
          <span className="text-gray-700" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Devices</span>
        </motion.button>
        
        <motion.button
          onClick={() => onNavigate('alerts')}
          className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-accent transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-6 h-6 text-accent mx-auto mb-2" />
          <span className="text-gray-700" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Alerts</span>
        </motion.button>
        
        <motion.button
          onClick={() => onNavigate('reports')}
          className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BarChart3 className="w-6 h-6 text-primary mx-auto mb-2" />
          <span className="text-gray-700" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Reports</span>
        </motion.button>
      </div>

      {/* Interactive Sandbox Node Selector */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Interactive Node Telemetry Sandbox</h3>
          <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Select a node asset to inspect live telemetry properties</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          {sandboxNodes.map((node) => (
            <motion.button
              key={node.tag}
              onClick={() => setSelectedNode(selectedNode === node.tag ? null : node.tag)}
              className={`p-3 text-left transition-colors ${selectedNode === node.tag ? 'bg-primary/5 border-b-2 border-primary' : 'hover:bg-gray-50'}`}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-2 h-2 rounded-full mb-2 ${
                node.status === 'Nominal' ? 'bg-success' : node.status === 'Warning' ? 'bg-warning' : 'bg-error'
              }`} />
              <p className="text-text-dark break-words" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{node.tag}</p>
              <p className="text-gray-500 break-words" style={{ fontSize: '0.65rem' }}>{node.device}</p>
            </motion.button>
          ))}
        </div>
        {selectedNodeData && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-900 font-mono"
            style={{ fontSize: '0.75rem' }}
          >
            <p className="text-green-400 mb-2" style={{ fontWeight: 700 }}>&gt; TELEMETRY_FRAME :: {selectedNodeData.tag}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { key: 'DEVICE_HW_ID', val: selectedNodeData.device },
                { key: 'LATITUDE', val: selectedNodeData.lat },
                { key: 'LONGITUDE', val: selectedNodeData.lon },
                { key: 'BATTERY_PCT', val: selectedNodeData.battery },
                { key: 'SIGNAL_DBM', val: selectedNodeData.signal },
                { key: 'TEMP_CELSIUS', val: selectedNodeData.temp },
                { key: 'DAEMON_STATE', val: selectedNodeData.status },
                { key: 'TIMESTAMP', val: new Date().toISOString().slice(11, 19) + 'Z' },
              ].map(({ key, val }) => (
                <div key={key} className="break-words">
                  <span className="text-gray-400">{key}: </span>
                  <span className={`${key === 'DAEMON_STATE' && val === 'Critical' ? 'text-red-400' : key === 'DAEMON_STATE' && val === 'Warning' ? 'text-yellow-400' : 'text-green-300'}`}>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>System Event Log</h3>
          <button 
            onClick={() => onNavigate('alerts')}
            className="text-primary whitespace-nowrap" 
            style={{ fontSize: '0.875rem', fontWeight: 500 }}
          >
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-200 overflow-y-auto max-h-[400px]">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-text-dark break-words" style={{ fontWeight: 600 }}>{activity.cattle}</span>
                    {activity.severity === 'high' && (
                      <span className="px-2 py-0.5 bg-error/10 text-error rounded whitespace-nowrap" style={{ fontSize: '0.75rem' }}>
                        High
                      </span>
                    )}
                    {activity.severity === 'medium' && (
                      <span className="px-2 py-0.5 bg-warning/10 text-warning rounded whitespace-nowrap" style={{ fontSize: '0.75rem' }}>
                        Medium
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 break-words" style={{ fontSize: '0.875rem' }}>{activity.event}</p>
                </div>
                <span className="text-gray-400 whitespace-nowrap" style={{ fontSize: '0.75rem' }}>{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { List, BarChart3 } from 'lucide-react';