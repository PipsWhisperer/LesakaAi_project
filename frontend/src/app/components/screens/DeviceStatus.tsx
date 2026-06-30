import { Header } from '../layout/Header';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Battery, Radio, WifiOff } from 'lucide-react';

interface Device {
  id: string;
  deviceId: string;
  cattleTag: string;
  battery: number;
  signal: 'excellent' | 'good' | 'poor' | 'offline';
  status: 'online' | 'warning' | 'offline';
  lastUpdate: string;
}

export function DeviceStatus() {
  const devices: Device[] = [
    { id: '1', deviceId: 'DEV-A247-001', cattleTag: 'A247', battery: 45, signal: 'good', status: 'warning', lastUpdate: '2 min ago' },
    { id: '2', deviceId: 'DEV-B156-001', cattleTag: 'B156', battery: 92, signal: 'excellent', status: 'online', lastUpdate: '1 min ago' },
    { id: '3', deviceId: 'DEV-C234-001', cattleTag: 'C234', battery: 88, signal: 'excellent', status: 'online', lastUpdate: '3 min ago' },
    { id: '4', deviceId: 'DEV-D089-001', cattleTag: 'D089', battery: 76, signal: 'good', status: 'online', lastUpdate: '2 min ago' },
    { id: '5', deviceId: 'DEV-E102-001', cattleTag: 'E102', battery: 22, signal: 'poor', status: 'warning', lastUpdate: '8 min ago' },
    { id: '6', deviceId: 'DEV-F178-001', cattleTag: 'F178', battery: 95, signal: 'excellent', status: 'online', lastUpdate: '1 min ago' },
    { id: '7', deviceId: 'DEV-G145-001', cattleTag: 'G145', battery: 81, signal: 'good', status: 'online', lastUpdate: '4 min ago' },
    { id: '8', deviceId: 'DEV-H223-001', cattleTag: 'H223', battery: 15, signal: 'offline', status: 'offline', lastUpdate: '45 min ago' },
  ];

  const getStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'online': return 'bg-[#2E7D32]';
      case 'warning': return 'bg-[#FF8F00]';
      case 'offline': return 'bg-red-600';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-[#2E7D32]';
    if (battery > 30) return 'text-yellow-600';
    return 'text-[#FF8F00]';
  };

  const getSignalStrength = (signal: Device['signal']) => {
    switch (signal) {
      case 'excellent': return { bars: 4, color: 'text-[#2E7D32]' };
      case 'good': return { bars: 3, color: 'text-[#2E7D32]' };
      case 'poor': return { bars: 2, color: 'text-yellow-600' };
      case 'offline': return { bars: 0, color: 'text-red-600' };
    }
  };

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const warningDevices = devices.filter(d => d.status === 'warning').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 lg:pb-6">
      <Header title="Device Status" />
      
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-[#2E7D32] mx-auto mb-2"></div>
            <p className="text-2xl text-[#212121] mb-1">{onlineDevices}</p>
            <p className="text-xs text-gray-600">Online</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-[#FF8F00] mx-auto mb-2"></div>
            <p className="text-2xl text-[#212121] mb-1">{warningDevices}</p>
            <p className="text-xs text-gray-600">Warning</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-3 h-3 rounded-full bg-red-600 mx-auto mb-2"></div>
            <p className="text-2xl text-[#212121] mb-1">{offlineDevices}</p>
            <p className="text-xs text-gray-600">Offline</p>
          </Card>
        </div>

        {/* Device List - Mobile */}
        <div className="lg:hidden space-y-3">
          {devices.map((device) => {
            const signalInfo = getSignalStrength(device.signal);
            
            return (
              <Card key={device.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                      <h3 className="text-[#212121]">{device.cattleTag}</h3>
                    </div>
                    <p className="text-xs text-gray-500">{device.deviceId}</p>
                  </div>
                  <Badge variant={device.status === 'offline' ? 'destructive' : device.status === 'warning' ? 'secondary' : 'default'}>
                    {device.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                    <span className={`text-sm ${getBatteryColor(device.battery)}`}>{device.battery}%</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {device.signal === 'offline' ? (
                      <WifiOff className={`w-4 h-4 ${signalInfo.color}`} />
                    ) : (
                      <Radio className={`w-4 h-4 ${signalInfo.color}`} />
                    )}
                    <span className={`text-sm ${signalInfo.color}`}>
                      {device.signal.charAt(0).toUpperCase() + device.signal.slice(1)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">Updated: {device.lastUpdate}</p>
              </Card>
            );
          })}
        </div>

        {/* Device Table - Desktop */}
        <Card className="hidden lg:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Device ID</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Cattle Tag</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Battery</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Signal</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Last Update</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {devices.map((device) => {
                  const signalInfo = getSignalStrength(device.signal);
                  
                  return (
                    <tr key={device.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
                          <Badge variant={device.status === 'offline' ? 'destructive' : device.status === 'warning' ? 'secondary' : 'default'}>
                            {device.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {device.deviceId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-[#212121]">{device.cattleTag}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                          <span className={getBatteryColor(device.battery)}>{device.battery}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {device.signal === 'offline' ? (
                            <WifiOff className={`w-4 h-4 ${signalInfo.color}`} />
                          ) : (
                            <Radio className={`w-4 h-4 ${signalInfo.color}`} />
                          )}
                          <span className={signalInfo.color}>
                            {device.signal.charAt(0).toUpperCase() + device.signal.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {device.lastUpdate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
