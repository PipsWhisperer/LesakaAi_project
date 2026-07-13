import { useState } from 'react';
import { Header } from '../layout/Header';
import { Search, Filter, Battery, MapPin } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router-dom';

interface CattleData {
  id: string;
  tag: string;
  breed: string;
  age: string;
  lastLocation: string;
  battery: number;
  status: 'good' | 'warning' | 'alert';
}

export function CattleList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const cattleData: CattleData[] = [
    { id: '1', tag: 'A247', breed: 'Angus', age: '3y 2m', lastLocation: 'North Pasture', battery: 45, status: 'warning' },
    { id: '2', tag: 'B156', breed: 'Hereford', age: '2y 8m', lastLocation: 'Water Point East', battery: 92, status: 'good' },
    { id: '3', tag: 'C234', breed: 'Angus', age: '4y 1m', lastLocation: 'Main Grazing', battery: 88, status: 'good' },
    { id: '4', tag: 'D089', breed: 'Holstein', age: '1y 6m', lastLocation: 'South Field', battery: 76, status: 'good' },
    { id: '5', tag: 'E102', breed: 'Charolais', age: '3y 9m', lastLocation: 'Water Point East', battery: 22, status: 'alert' },
    { id: '6', tag: 'F178', breed: 'Angus', age: '2y 3m', lastLocation: 'North Pasture', battery: 95, status: 'good' },
    { id: '7', tag: 'G145', breed: 'Hereford', age: '5y 0m', lastLocation: 'Main Grazing', battery: 81, status: 'good' },
    { id: '8', tag: 'H223', breed: 'Angus', age: '1y 11m', lastLocation: 'South Field', battery: 67, status: 'good' },
  ];

  const filteredCattle = cattleData.filter(cattle => 
    cattle.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cattle.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-[#2E7D32]';
    if (battery > 30) return 'text-yellow-600';
    return 'text-[#FF8F00]';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 lg:pb-6">
      <Header title="Cattle List" />
      
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by tag or breed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center">
            <p className="text-2xl text-[#212121] mb-1">{cattleData.length}</p>
            <p className="text-xs text-gray-600">Total Cattle</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl text-[#2E7D32] mb-1">
              {cattleData.filter(c => c.status === 'good').length}
            </p>
            <p className="text-xs text-gray-600">Healthy</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl text-[#FF8F00] mb-1">
              {cattleData.filter(c => c.status === 'alert').length}
            </p>
            <p className="text-xs text-gray-600">Alerts</p>
          </Card>
        </div>

        {/* Cattle List - Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {filteredCattle.map((cattle) => (
            <Card 
              key={cattle.id}
              onClick={() => navigate(`/cattle/${cattle.tag}`)}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[#212121] mb-1">Tag: {cattle.tag}</h3>
                  <p className="text-sm text-gray-600">{cattle.breed} • {cattle.age}</p>
                </div>
                <Badge variant={cattle.status === 'alert' ? 'destructive' : cattle.status === 'warning' ? 'secondary' : 'default'}>
                  {cattle.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{cattle.lastLocation}</span>
                </div>
                <div className={`flex items-center gap-1 ${getBatteryColor(cattle.battery)}`}>
                  <Battery className="w-4 h-4" />
                  <span>{cattle.battery}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cattle Table - Desktop */}
        <Card className="hidden lg:block overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Tag</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Breed</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Last Location</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Battery</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCattle.map((cattle) => (
                  <tr 
                    key={cattle.id}
                    onClick={() => navigate(`/cattle/${cattle.tag}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#212121]">{cattle.tag}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {cattle.breed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {cattle.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {cattle.lastLocation}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 ${getBatteryColor(cattle.battery)}`}>
                        <Battery className="w-4 h-4" />
                        {cattle.battery}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={cattle.status === 'alert' ? 'destructive' : cattle.status === 'warning' ? 'secondary' : 'default'}>
                        {cattle.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
