import React, { useState } from 'react';
import { AlertTriangle, Battery, MapPin, Signal, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface AlertsProps {
  onNavigate: (screen: Screen) => void;
}

export function Alerts({ onNavigate }: AlertsProps) {
  const [filterTab, setFilterTab] = useState<'all' | 'critical' | 'resolved'>('all');

  const alerts = [
    {
      id: 1,
      type: 'Boundary Geofence Breach',
      cattle: 'BW-MUN-1109',
      severity: 'high',
      time: '10:14 AM',
      description: 'Livestock node has breached designated geofence perimeter in Main Grazing Camp Alpha',
      status: 'unresolved',
      icon: MapPin,
    },
    {
      id: 2,
      type: 'Thermal Stress Alert',
      cattle: 'BW-MUN-0934',
      severity: 'high',
      time: '08:30 AM',
      description: 'Biological thermal stress anomaly detected - agent requires intervention',
      status: 'unresolved',
      icon: AlertTriangle,
    },
    {
      id: 3,
      type: 'Low Battery Warning Threshold',
      cattle: 'BW-MUN-2847',
      severity: 'medium',
      time: '07:45 AM',
      description: 'Device battery matrix level below 35% - recharge or replacement cycle required',
      status: 'unresolved',
      icon: Battery,
    },
    {
      id: 4,
      type: 'Signal Daemon Offline',
      cattle: 'BW-MUN-0123',
      severity: 'high',
      time: 'Yesterday 18:20',
      description: 'IoT daemon has been offline for more than 45 minutes - no telemetry frame received',
      status: 'resolved',
      icon: Signal,
    },
    {
      id: 5,
      type: 'Boundary Geofence Breach',
      cattle: 'BW-MUN-3421',
      severity: 'high',
      time: 'Yesterday 16:30',
      description: 'Livestock moved outside West Field Perimeter boundary',
      status: 'resolved',
      icon: MapPin,
    },
    {
      id: 6,
      type: 'Unusual Movement Pattern',
      cattle: 'BW-MUN-0894',
      severity: 'low',
      time: 'Yesterday 14:10',
      description: 'Detected non-standard movement vector pattern - possibly grazing behavior shift',
      status: 'resolved',
      icon: AlertTriangle,
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-error/10', text: 'text-error', border: 'border-error' };
      case 'medium': return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning' };
      case 'low': return { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-300' };
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterTab === 'all') return true;
    if (filterTab === 'critical') return alert.severity === 'high' && alert.status === 'unresolved';
    if (filterTab === 'resolved') return alert.status === 'resolved';
    return true;
  });

  const unresolvedCount = alerts.filter(a => a.status === 'unresolved').length;

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Total System Events</p>
          <p className="text-text-dark break-words" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{alerts.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-error/20">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Critical Interrupts</p>
          <p className="text-error break-words" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{unresolvedCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>High Priority</p>
          <p className="text-text-dark break-words" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            {alerts.filter(a => a.severity === 'high').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Today</p>
          <p className="text-text-dark break-words" style={{ fontSize: '1.5rem', fontWeight: 700 }}>3</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'all' as const, label: 'All Alerts' },
          { key: 'critical' as const, label: 'Critical Interrupts' },
          { key: 'resolved' as const, label: 'Resolved Ledger' },
        ].map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setFilterTab(tab.key)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              filterTab === tab.key
                ? 'bg-primary text-white'
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
            style={{ fontWeight: filterTab === tab.key ? 600 : 400 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* LangGraph Terminal */}
      <div className="rounded-xl overflow-hidden border border-gray-800" style={{ backgroundColor: '#0D1117' }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-gray-400 font-mono" style={{ fontSize: '0.75rem' }}>LangGraph Supervisor Runtime Execution Trace Log</span>
        </div>
        <div className="p-4 font-mono space-y-1" style={{ fontSize: '0.75rem' }}>
          {[
            { ts: '10:14:02Z', line: 'Supervisor :: INIT_ROUTING_MATRIX', color: 'text-blue-400' },
            { ts: '10:14:03Z', line: 'Supervisor -> ROUTE_TO_MOLEMO_HEALTH :: Node=BW-MUN-1109', color: 'text-green-400' },
            { ts: '10:14:03Z', line: '[Agent Molemo] :: PATHOLOGY_SCAN_INITIATED', color: 'text-yellow-300' },
            { ts: '10:14:04Z', line: '[Agent Molemo] :: FLAG=CRITICAL_THERMAL_OVERHEAT :: temp=40.5°C', color: 'text-red-400' },
            { ts: '10:14:04Z', line: 'Supervisor -> ROUTE_TO_LOAPI_DAEMON :: Node=BW-MUN-2847', color: 'text-green-400' },
            { ts: '10:14:05Z', line: '[Agent Loapi] :: SIGNAL_DEGRADATION_DETECTED :: dBm=-81', color: 'text-yellow-300' },
            { ts: '10:14:05Z', line: 'Supervisor -> EXCEPTION_ESCALATION :: ExceptionCode=EX_003', color: 'text-red-400' },
            { ts: '10:14:06Z', line: 'Supervisor -> [END] :: 2 exceptions queued', color: 'text-gray-400' },
          ].map(({ ts, line, color }, i) => (
            <div key={i} className="flex gap-3 flex-wrap">
              <span className="text-gray-500 whitespace-nowrap">[{ts}]</span>
              <span className={color}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert, index) => {
          const Icon = alert.icon;
          const severityColors = getSeverityColor(alert.severity);
          
          return (
            <motion.div
              key={alert.id}
              className={`bg-white rounded-xl p-4 border-2 ${
                alert.status === 'unresolved' ? severityColors.border : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className={`w-10 h-10 ${severityColors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${severityColors.text}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-dark mb-1 break-words" style={{ fontWeight: 600 }}>{alert.type}</h3>
                      <p className="text-gray-600 break-words" style={{ fontSize: '0.875rem' }}>Node: {alert.cattle}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className={`px-2 py-1 ${severityColors.bg} ${severityColors.text} rounded whitespace-nowrap`}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                          {alert.severity}
                        </span>
                      </div>
                      {alert.status === 'resolved' && (
                        <div className="flex items-center gap-1 text-success whitespace-nowrap">
                          <CheckCircle className="w-4 h-4" />
                          <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Resolved</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 break-words" style={{ fontSize: '0.875rem' }}>
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-gray-500 whitespace-nowrap" style={{ fontSize: '0.75rem' }}>
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </div>
                    
                    {alert.status === 'unresolved' && (
                      <div className="flex gap-2">
                        <motion.button
                          className="px-3 py-1 bg-primary text-white rounded-lg whitespace-nowrap"
                          style={{ fontSize: '0.75rem', fontWeight: 500 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                        <motion.button
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg whitespace-nowrap"
                          style={{ fontSize: '0.75rem', fontWeight: 500 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Resolve Exception
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}