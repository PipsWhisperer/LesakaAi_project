import { Header } from '../layout/Header';
import { Card } from '../ui/card';
import { ArrowRight, Radio, AlertTriangle, Battery } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const stats = [
    { 
      label: 'Total Cattle', 
      value: '247', 
      icon: '🐄',
      color: 'bg-[#2E7D32]',
      change: '+5 this month'
    },
    { 
      label: 'Active Devices', 
      value: '243', 
      icon: Radio,
      color: 'bg-[#1565C0]',
      change: '98% uptime'
    },
    { 
      label: 'Alerts Today', 
      value: '3', 
      icon: AlertTriangle,
      color: 'bg-[#FF8F00]',
      change: '2 resolved'
    },
    { 
      label: 'Battery Average', 
      value: '87%', 
      icon: Battery,
      color: 'bg-[#2E7D32]',
      change: 'Good health'
    },
  ];

  const recentAlerts = [
    { id: 1, type: 'Boundary Breach', tag: 'A247', time: '2 hours ago', severity: 'high' },
    { id: 2, type: 'Low Battery', tag: 'B102', time: '4 hours ago', severity: 'medium' },
    { id: 3, type: 'No Signal', tag: 'C089', time: '6 hours ago', severity: 'low' },
  ];

  const recentActivity = [
    { id: 1, tag: 'A247', action: 'Moved to North Pasture', time: '1 hour ago' },
    { id: 2, tag: 'B156', action: 'Grazing at Water Point', time: '2 hours ago' },
    { id: 3, tag: 'C234', action: 'Returned to Main Herd', time: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 lg:pb-6">
      <Header title="Dashboard" />
      
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = typeof stat.icon === 'string' ? null : stat.icon;
            
            return (
              <Card key={stat.label} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    {Icon ? (
                      <Icon className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-xl">{stat.icon}</span>
                    )}
                  </div>
                </div>
                <p className="text-2xl lg:text-3xl text-[#212121] mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <Link to="/map">
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="mb-2">View Live Map</h3>
                  <p className="text-sm opacity-90">Track cattle movements in real-time</p>
                </div>
                <ArrowRight className="w-6 h-6" />
              </div>
            </Card>
          </Link>
          
          <Link to="/cattle">
            <Card className="p-6 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-[#1565C0] to-[#0D47A1]">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h3 className="mb-2">Cattle List</h3>
                  <p className="text-sm opacity-90">View all cattle and their status</p>
                </div>
                <ArrowRight className="w-6 h-6" />
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#212121]">Recent Alerts</h3>
              <Link to="/alerts" className="text-sm text-[#2E7D32] hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    alert.severity === 'high' ? 'bg-[#FF8F00]' : 
                    alert.severity === 'medium' ? 'bg-yellow-500' : 
                    'bg-gray-400'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-[#212121]">{alert.type}</p>
                    <p className="text-xs text-gray-500">Tag: {alert.tag} • {alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#212121]">Recent Activity</h3>
              <Link to="/cattle" className="text-sm text-[#2E7D32] hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-xs">
                    {activity.tag}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#212121]">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
