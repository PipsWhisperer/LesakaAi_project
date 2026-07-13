import React, { useState } from 'react';
import { Radio, Battery, Signal, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface DeviceStatusProps {
  onNavigate: (screen: Screen) => void;
}

export function DeviceStatus({ onNavigate }: DeviceStatusProps) {
  const [filterStatus, setFilterStatus] = useState('all');

  const devices = [
    { id: 'HW-9021', cattleTag: 'BW-MUN-1109', battery: 85, signal: 95, status: 'good', lastSync: '2 mins ago', signalDbm: '-68 dBm' },
    { id: 'HW-3291', cattleTag: 'BW-MUN-2847', battery: 34, signal: 88, status: 'warning', lastSync: '5 mins ago', signalDbm: '-72 dBm' },
    { id: 'HW-5647', cattleTag: 'BW-MUN-0934', battery: 92, signal: 98, status: 'good', lastSync: '1 min ago', signalDbm: '-58 dBm' },
    { id: 'HW-1923', cattleTag: 'BW-MUN-1523', battery: 78, signal: 91, status: 'good', lastSync: '3 mins ago', signalDbm: '-70 dBm' },
    { id: 'HW-7234', cattleTag: 'BW-MUN-3421', battery: 67, signal: 75, status: 'good', lastSync: '8 mins ago', signalDbm: '-79 dBm' },
    { id: 'HW-4561', cattleTag: 'BW-MUN-0123', battery: 12, signal: 0, status: 'offline', lastSync: '2 hours ago', signalDbm: 'No Signal' },
    { id: 'HW-8902', cattleTag: 'BW-MUN-4532', battery: 89, signal: 96, status: 'good', lastSync: '1 min ago', signalDbm: '-64 dBm' },
    { id: 'HW-2347', cattleTag: 'BW-MUN-2890', battery: 73, signal: 84, status: 'good', lastSync: '4 mins ago', signalDbm: '-75 dBm' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success', label: 'Online / Good' };
      case 'warning': return { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning', label: 'Warning / Frame Degradation' };
      case 'offline': return { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error', label: 'Critical Offline / No Signal' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400', label: 'Unknown' };
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-success';
    if (level > 30) return 'text-warning';
    return 'text-error';
  };

  const getSignalStrength = (signal: number) => {
    if (signal > 85) return { label: 'Excellent', color: 'text-success' };
    if (signal > 65) return { label: 'Good', color: 'text-primary' };
    if (signal > 40) return { label: 'Fair', color: 'text-warning' };
    return { label: 'Poor', color: 'text-error' };
  };

  const filteredDevices = devices.filter(device => {
    if (filterStatus === 'all') return true;
    return device.status === filterStatus;
  });

  const statusCounts = {
    all: devices.length,
    good: devices.filter(d => d.status === 'good').length,
    warning: devices.filter(d => d.status === 'warning').length,
    offline: devices.filter(d => d.status === 'offline').length,
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Status Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All IoT Daemons', count: statusCounts.all },
          { key: 'good', label: 'Online', count: statusCounts.good },
          { key: 'warning', label: 'Warning', count: statusCounts.warning },
          { key: 'offline', label: 'Offline', count: statusCounts.offline },
        ].map(tab => (
          <motion.button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              filterStatus === tab.key
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
            style={{ fontWeight: filterStatus === tab.key ? 600 : 400 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label} ({tab.count})
          </motion.button>
        ))}
      </div>

      {/* Device List - Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredDevices.map((device, index) => {
          const statusColors = getStatusColor(device.status);
          const signalInfo = getSignalStrength(device.signal);
          
          return (
            <motion.div
              key={device.id}
              className="bg-white rounded-xl p-4 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-text-dark mb-1 break-words" style={{ fontWeight: 600 }}>{device.id}</h3>
                  <p className="text-gray-600 break-words" style={{ fontSize: '0.875rem' }}>Link: {device.cattleTag}</p>
                </div>
                <div className={`px-2 py-1 ${statusColors.bg} ${statusColors.text} rounded-lg flex items-center gap-1 flex-shrink-0`}>
                  <div className={`w-2 h-2 ${statusColors.dot} rounded-full`}></div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                    {device.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)} flex-shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Battery</p>
                    <p className={`${getBatteryColor(device.battery)} break-words`} style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {device.battery}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className={`w-4 h-4 ${signalInfo.color} flex-shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Signal</p>
                    <p className={`${signalInfo.color} break-words`} style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      {signalInfo.label}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>
                  Last sync: <span className="text-gray-700">{device.lastSync}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Device List - Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Hardware ID</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Assigned Cattle Tag Link</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Battery</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Signal Strength</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Connectivity State</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Last Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDevices.map((device, index) => {
                const statusColors = getStatusColor(device.status);
                const signalInfo = getSignalStrength(device.signal);
                
                return (
                  <motion.tr
                    key={device.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 text-text-dark whitespace-nowrap" style={{ fontWeight: 600 }}>{device.id}</td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{device.cattleTag}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                        <span className={getBatteryColor(device.battery)} style={{ fontWeight: 600 }}>
                          {device.battery}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Signal className={`w-4 h-4 ${signalInfo.color}`} />
                        <span className={signalInfo.color} style={{ fontWeight: 500 }}>
                          {device.signalDbm}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 ${statusColors.bg} ${statusColors.text} rounded-lg whitespace-nowrap`}>
                        <div className={`w-2 h-2 ${statusColors.dot} rounded-full flex-shrink-0`}></div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {statusColors.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem' }}>
                      {device.lastSync}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}