import React, { useState } from 'react';
import { Search, Filter, MapPin, Battery, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface CattleListProps {
  onNavigate: (screen: Screen, cattleId?: string) => void;
}

export function CattleList({ onNavigate }: CattleListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBreed, setFilterBreed] = useState('all');

  const cattleData = [
    { id: 'BW-MUN-1109', tag: 'BW-MUN-1109', breed: 'Brahman Cross', age: '2.5 yrs', location: 'North Pasture Alpha', battery: 85, signal: 'good', lastSync: '2 mins ago' },
    { id: 'BW-MUN-2847', tag: 'BW-MUN-2847', breed: 'Nguni', age: '3.2 yrs', location: 'Water Point Delta', battery: 34, signal: 'good', lastSync: '5 mins ago' },
    { id: 'BW-MUN-0934', tag: 'BW-MUN-0934', breed: 'Bonsmara', age: '4.1 yrs', location: 'East Field Sector-B', battery: 92, signal: 'excellent', lastSync: '1 min ago' },
    { id: 'BW-MUN-1523', tag: 'BW-MUN-1523', breed: 'Brahman Cross', age: '1.8 yrs', location: 'South Grazing Zone', battery: 78, signal: 'good', lastSync: '3 mins ago' },
    { id: 'BW-MUN-3421', tag: 'BW-MUN-3421', breed: 'Simmental', age: '3.5 yrs', location: 'West Field Perimeter', battery: 67, signal: 'fair', lastSync: '8 mins ago' },
    { id: 'BW-MUN-0123', tag: 'BW-MUN-0123', breed: 'Afrikaner', age: '2.2 yrs', location: 'North Pasture Alpha', battery: 12, signal: 'offline', lastSync: '45 mins ago' },
    { id: 'BW-MUN-4532', tag: 'BW-MUN-4532', breed: 'Brahman Cross', age: '4.8 yrs', location: 'Center Field Matrix', battery: 89, signal: 'excellent', lastSync: '1 min ago' },
    { id: 'BW-MUN-2890', tag: 'BW-MUN-2890', breed: 'Nguni', age: '2.9 yrs', location: 'South Grazing Zone', battery: 73, signal: 'good', lastSync: '4 mins ago' },
  ];

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-success';
    if (level > 30) return 'text-warning';
    return 'text-error';
  };

  const getSignalColor = (signal: string) => {
    if (signal === 'excellent') return 'text-success';
    if (signal === 'good') return 'text-primary';
    if (signal === 'fair') return 'text-warning';
    return 'text-error';
  };

  const filteredCattle = cattleData.filter(cattle => {
    const matchesSearch = cattle.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cattle.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBreed === 'all' || cattle.breed === filterBreed;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by tag ID or breed classification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={filterBreed}
          onChange={(e) => setFilterBreed(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 whitespace-nowrap"
        >
          <option value="all">All Breed Types</option>
          <option value="Brahman Cross">Brahman Cross</option>
          <option value="Nguni">Nguni</option>
          <option value="Bonsmara">Bonsmara</option>
          <option value="Simmental">Simmental</option>
          <option value="Afrikaner">Afrikaner</option>
        </select>
      </div>

      {/* Stats Summary */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-gray-600 break-words">Total Livestock Nodes</span>
          <span className="text-text-dark whitespace-nowrap" style={{ fontWeight: 600 }}>{filteredCattle.length} / {cattleData.length}</span>
        </div>
      </div>

      {/* Cattle List - Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredCattle.map((cattle, index) => (
          <motion.div
            key={cattle.id}
            className="bg-white rounded-lg p-4 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('cattle-detail', cattle.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-text-dark mb-1" style={{ fontWeight: 600 }}>{cattle.tag}</h3>
                <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>{cattle.breed} • {cattle.age}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600" style={{ fontSize: '0.75rem' }}>{cattle.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <Battery className={`w-4 h-4 ${getBatteryColor(cattle.battery)}`} />
                <span className={getBatteryColor(cattle.battery)} style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  {cattle.battery}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getSignalColor(cattle.signal).replace('text-', 'bg-')}`}></div>
                <span className={getSignalColor(cattle.signal)} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                  {cattle.signal}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cattle List - Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Tag ID</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Breed</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Age</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Last Telemetry Position</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Battery</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Signal</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCattle.map((cattle, index) => (
                <motion.tr
                  key={cattle.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onNavigate('cattle-detail', cattle.id)}
                >
                  <td className="px-6 py-4 text-text-dark whitespace-nowrap" style={{ fontWeight: 600 }}>{cattle.tag}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{cattle.breed}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{cattle.age}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700 break-words" style={{ fontSize: '0.875rem' }}>{cattle.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Battery className={`w-4 h-4 ${getBatteryColor(cattle.battery)}`} />
                      <span className={getBatteryColor(cattle.battery)} style={{ fontWeight: 600 }}>
                        {cattle.battery}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getSignalColor(cattle.signal).replace('text-', 'bg-')}`}></div>
                      <span className={getSignalColor(cattle.signal)} style={{ fontWeight: 500 }}>
                        {cattle.signal}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}