import { Header } from '../layout/Header';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, MapPin, Battery, Radio, Clock, TrendingUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CattleDetail() {
  const navigate = useNavigate();
  const { tag } = useParams();

  const healthData = [
    { day: 'Mon', activity: 85 },
    { day: 'Tue', activity: 78 },
    { day: 'Wed', activity: 92 },
    { day: 'Thu', activity: 88 },
    { day: 'Fri', activity: 95 },
    { day: 'Sat', activity: 82 },
    { day: 'Sun', activity: 90 },
  ];

  const movementHistory = [
    { time: '14:30', location: 'North Pasture', duration: '2h 15m' },
    { time: '12:15', location: 'Water Point East', duration: '45m' },
    { time: '09:00', location: 'Main Grazing Area', duration: '3h 15m' },
    { time: '06:30', location: 'Shelter Area', duration: '2h 30m' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 lg:pb-6">
      <Header title={`Cattle ${tag}`} showNotifications={false} />
      
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/cattle')}
          className="flex items-center gap-2 text-[#2E7D32] mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cattle List
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-[#212121] mb-2">Cattle Information</h2>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Device ID</p>
                  <p className="text-[#212121]">DEV-{tag}-001</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tag</p>
                  <p className="text-lg text-[#212121]">{tag}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Breed</p>
                  <p className="text-lg text-[#212121]">Angus</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Age</p>
                  <p className="text-lg text-[#212121]">3y 2m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="text-lg text-[#212121]">650 kg</p>
                </div>
              </div>
            </Card>

            {/* Health Trend */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#2E7D32]" />
                <h3 className="text-[#212121]">Activity Trend (7 Days)</h3>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="day" stroke="#9E9E9E" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9E9E9E" style={{ fontSize: '12px' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="#2E7D32" 
                    strokeWidth={2}
                    dot={{ fill: '#2E7D32', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Map Snippet */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#1565C0]" />
                <h3 className="text-[#212121]">Current Location</h3>
              </div>
              
              <div className="relative h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <pattern id="detail-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(46, 125, 50, 0.1)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#detail-grid)" />
                  
                  <rect x="10%" y="10%" width="80%" height="80%" fill="rgba(46, 125, 50, 0.05)" stroke="#2E7D32" strokeWidth="2" strokeDasharray="8,4" rx="4" />
                </svg>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">🐄</span>
                  </div>
                  <div className="mt-2 bg-white px-3 py-1 rounded shadow text-sm text-center">
                    North Pasture
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-3">Last updated: 5 minutes ago</p>
            </Card>

            {/* Movement History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#212121]">Movement History</h3>
                <button className="text-sm text-[#2E7D32] hover:underline">
                  View Full History
                </button>
              </div>

              <div className="space-y-3">
                {movementHistory.map((movement, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-[#212121]">{movement.location}</p>
                      <p className="text-xs text-gray-500">Duration: {movement.duration}</p>
                    </div>
                    <p className="text-sm text-gray-600">{movement.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Device Status */}
            <Card className="p-6">
              <h3 className="text-[#212121] mb-4">Device Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-600">Battery</span>
                  </div>
                  <span className="text-yellow-600">45%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Radio className="w-5 h-5 text-[#2E7D32]" />
                    <span className="text-sm text-gray-600">Signal</span>
                  </div>
                  <span className="text-[#2E7D32]">Excellent</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#1565C0]" />
                    <span className="text-sm text-gray-600">GPS</span>
                  </div>
                  <span className="text-[#2E7D32]">Active</span>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-[#212121] mb-4">Quick Stats</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Distance Today</span>
                  <span className="text-[#212121]">4.2 km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Speed</span>
                  <span className="text-[#212121]">0.8 km/h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Grazing Time</span>
                  <span className="text-[#212121]">6h 45m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rest Time</span>
                  <span className="text-[#212121]">3h 20m</span>
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card className="p-6">
              <h3 className="text-[#212121] mb-4">Notes</h3>
              <p className="text-sm text-gray-600 mb-3">
                Healthy appetite. Regular grazing pattern. Battery replacement scheduled for next week.
              </p>
              <button className="text-sm text-[#2E7D32] hover:underline">
                Edit Notes
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
