import React, { useState } from 'react';
import { Users, Package, CheckSquare, Search, Plus, Edit, Trash2, ChevronDown, Check, Shield, FileText, Lock, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface AdminProps {
  onNavigate: (screen: Screen) => void;
}

export function Admin({ onNavigate }: AdminProps) {
  const [activeTab, setActiveTab] = useState('clients');
  const [selectedWorkspace, setSelectedWorkspace] = useState('Lesaka AI | Tracking & Veterinary Hub');
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: 'Hardware ID confirmed and scanned', checked: true },
    { id: 2, label: 'Livestock node tag (BW-MUN-XXXX) registered in database', checked: true },
    { id: 3, label: 'Device-to-cattle mapping verified in Asset Registry', checked: true },
    { id: 4, label: 'GPS signal lock confirmed (>4 satellites)', checked: false },
    { id: 5, label: 'Cellular / LoRa telemetry frame transmission confirmed', checked: false },
    { id: 6, label: 'Battery charge >80% before field deployment', checked: false },
    { id: 7, label: 'Geofence boundary assigned to tracking node', checked: false },
    { id: 8, label: 'Alert thresholds configured for this node', checked: false },
  ]);

  const workspaces = ['Lesaka AI | Tracking & Veterinary Hub', 'Greenfield Ranch', 'Orapa Cluster', 'Ghanzi Feedlot'];

  const toggleChecklist = (id: number) => {
    setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const clients = [
    { id: 1, name: 'Lesaka AI | Tracking & Veterinary Hub', contact: 'Andries Mooketsi Moiteelasilo', email: 'andries@lesakaai.com', devices: 1240, status: 'active', plan: 'Enterprise' },
    { id: 2, name: 'Greenfield Ranch', contact: 'Jane Smith', email: 'jane@greenfield.co.bw', devices: 842, status: 'active', plan: 'Professional' },
    { id: 3, name: 'Orapa Cluster', contact: 'Thabo Kgosi', email: 'thabo@orapa.co.bw', devices: 618, status: 'active', plan: 'Enterprise' },
    { id: 4, name: 'Ghanzi Feedlot', contact: 'Lesego Modise', email: 'lesego@ghanzifeedlot.co.bw', devices: 374, status: 'active', plan: 'Professional' },
  ];

  const inventory = [
    { id: 'HW-8472', status: 'deployed', client: 'Greenfield Ranch', lastSync: '2 mins ago', battery: 85 },
    { id: 'HW-3291', status: 'deployed', client: 'Greenfield Ranch', lastSync: '5 mins ago', battery: 34 },
    { id: 'HW-5647', status: 'deployed', client: 'Sunset Farms', lastSync: '1 min ago', battery: 92 },
    { id: 'HW-9823', status: 'available', client: null, lastSync: null, battery: 100 },
    { id: 'HW-1234', status: 'maintenance', client: null, lastSync: '2 days ago', battery: 0 },
  ];

  const installations = [
    { id: 1, client: 'Valley View Ranch', date: 'Nov 5, 2025', devices: 25, status: 'completed', technician: 'Mike Wilson' },
    { id: 2, client: 'Oak Tree Farm', date: 'Nov 8, 2025', devices: 15, status: 'scheduled', technician: 'Sarah Lee' },
    { id: 3, client: 'Prairie Cattle Co', date: 'Nov 10, 2025', devices: 30, status: 'pending', technician: 'Unassigned' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'deployed':
      case 'completed':
        return { bg: 'bg-success/10', text: 'text-success' };
      case 'scheduled':
      case 'available':
        return { bg: 'bg-secondary/10', text: 'text-secondary' };
      case 'pending':
      case 'maintenance':
        return { bg: 'bg-warning/10', text: 'text-warning' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-text-dark break-words" style={{ fontWeight: 600, fontSize: '1.25rem' }}>Multi-Tenant Infrastructure Panel</h2>
        <div className="px-3 py-1 bg-accent/10 text-accent rounded-full whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
          Internal Use Only
        </div>
      </div>

      {/* Global Workspace Selector */}
      <div className="relative">
        <p className="text-gray-500 mb-2 break-words" style={{ fontSize: '0.75rem', fontWeight: 600 }}>ACTIVE WORKSPACE CONTEXT</p>
        <motion.button
          onClick={() => setWorkspaceOpen(!workspaceOpen)}
          className="w-full md:w-auto flex items-center gap-3 px-4 py-3 bg-white border-2 border-primary rounded-xl text-left"
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-text-dark break-words" style={{ fontWeight: 600 }}>{selectedWorkspace}</p>
            <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Multi-Tenant Supervisor Context</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${workspaceOpen ? 'rotate-180' : ''}`} />
        </motion.button>
        {workspaceOpen && (
          <div className="absolute top-full mt-1 w-full md:w-auto min-w-[280px] bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
            {workspaces.map(ws => (
              <motion.button
                key={ws}
                onClick={() => { setSelectedWorkspace(ws); setWorkspaceOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ws === selectedWorkspace ? 'bg-primary' : 'bg-gray-200'}`}>
                  <Users className={`w-4 h-4 ${ws === selectedWorkspace ? 'text-white' : 'text-gray-500'}`} />
                </div>
                <span className="text-text-dark break-words" style={{ fontWeight: ws === selectedWorkspace ? 600 : 400 }}>{ws}</span>
                {ws === selectedWorkspace && <Check className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Total Client Tenants</p>
          <p className="text-text-dark break-words" style={{ fontSize: '1.75rem', fontWeight: 700 }}>{clients.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Total Edge Nodes</p>
          <p className="text-text-dark break-words" style={{ fontSize: '1.75rem', fontWeight: 700 }}>2,894</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Available Devices</p>
          <p className="text-text-dark break-words" style={{ fontSize: '1.75rem', fontWeight: 700 }}>147</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-500 mb-1 break-words" style={{ fontSize: '0.75rem' }}>Pending Installs</p>
          <p className="text-text-dark break-words" style={{ fontSize: '1.75rem', fontWeight: 700 }}>2</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'clients', label: 'Client Tenants', icon: Users },
          { id: 'inventory', label: 'Hardware Asset Inventory', icon: Package },
          { id: 'installations', label: 'Field Installation Checklist', icon: CheckSquare },
          { id: 'rbac', label: 'RBAC Matrix', icon: Shield },
          { id: 'audit', label: 'Audit Logs', icon: FileText },
          { id: 'security', label: 'Security Status', icon: Lock },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
              style={{ fontWeight: activeTab === tab.id ? 600 : 400 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Clients List */}
      {activeTab === 'clients' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search client tenants..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ fontSize: '0.875rem' }}
              />
            </div>
            <motion.button
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 whitespace-nowrap"
              style={{ fontWeight: 500 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add Client
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Tenant Name</th>
                  <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Contact</th>
                  <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email</th>
                  <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Edge Nodes</th>
                  <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Plan</th>
                  <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Status</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client, index) => {
                  const statusColors = getStatusColor(client.status);
                  return (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-text-dark whitespace-nowrap" style={{ fontWeight: 600 }}>{client.name}</td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{client.contact}</td>
                      <td className="px-6 py-4 text-gray-700">{client.email}</td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap" style={{ fontWeight: 600 }}>{client.devices}</td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{client.plan}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 ${statusColors.bg} ${statusColors.text} rounded whitespace-nowrap`} style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <motion.button className="p-1 hover:bg-gray-100 rounded" whileTap={{ scale: 0.9 }}>
                            <Edit className="w-4 h-4 text-gray-600" />
                          </motion.button>
                          <motion.button className="p-1 hover:bg-gray-100 rounded" whileTap={{ scale: 0.9 }}>
                            <Trash2 className="w-4 h-4 text-error" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Device Inventory */}
      {activeTab === 'inventory' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ fontSize: '0.875rem' }}
              />
            </div>
            <motion.button
              className="ml-3 px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
              style={{ fontWeight: 500 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add Device
            </motion.button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Device ID</th>
                  <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Status</th>
                  <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Client</th>
                  <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Last Sync</th>
                  <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Battery</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inventory.map((device, index) => {
                  const statusColors = getStatusColor(device.status);
                  return (
                    <tr key={device.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-text-dark" style={{ fontWeight: 600 }}>{device.id}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 ${statusColors.bg} ${statusColors.text} rounded`} style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {device.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{device.client || '-'}</td>
                      <td className="px-6 py-4 text-gray-700">{device.lastSync || '-'}</td>
                      <td className="px-6 py-4 text-gray-700" style={{ fontWeight: 600 }}>{device.battery}%</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <motion.button className="p-1 hover:bg-gray-100 rounded" whileTap={{ scale: 0.9 }}>
                            <Edit className="w-4 h-4 text-gray-600" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Installations / Field Checklist */}
      {activeTab === 'installations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Field Installation Checklist</h3>
                <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Verify secure database mapping operations before node activation</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 whitespace-nowrap" style={{ fontSize: '0.875rem' }}>
                  {checklistItems.filter(i => i.checked).length}/{checklistItems.length} verified
                </span>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all"
                    style={{ width: `${(checklistItems.filter(i => i.checked).length / checklistItems.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {checklistItems.map(item => (
                <motion.button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  whileTap={{ scale: 0.99 }}
                >
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    item.checked ? 'bg-success border-success' : 'border-gray-300'
                  }`}>
                    {item.checked && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`break-words ${item.checked ? 'text-gray-400 line-through' : 'text-text-dark'}`} style={{ fontSize: '0.875rem', fontWeight: item.checked ? 400 : 500 }}>
                    {item.label}
                  </span>
                  {item.checked && (
                    <span className="ml-auto text-success whitespace-nowrap" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Confirmed</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Hardware Inventory Log */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Hardware Inventory Configuration Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Client</th>
                    <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Date</th>
                    <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Devices</th>
                    <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Technician</th>
                    <th className="px-6 py-3 text-left text-gray-600" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {installations.map((install) => {
                    const statusColors = getStatusColor(install.status);
                    return (
                      <tr key={install.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-text-dark" style={{ fontWeight: 600 }}>{install.client}</td>
                        <td className="px-6 py-4 text-gray-700">{install.date}</td>
                        <td className="px-6 py-4 text-gray-700" style={{ fontWeight: 600 }}>{install.devices}</td>
                        <td className="px-6 py-4 text-gray-700">{install.technician}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 ${statusColors.bg} ${statusColors.text} rounded`} style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            {install.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* RBAC Matrix - INFS 402 Enhancement */}
      {activeTab === 'rbac' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Enhanced RBAC Permission Matrix</h3>
              <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Fine-grained access control for INFS 402 Advanced Data Governance</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Permission</th>
                    <th className="px-4 py-3 text-center text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin</th>
                    <th className="px-4 py-3 text-center text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Broker</th>
                    <th className="px-4 py-3 text-center text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Farmer</th>
                    <th className="px-4 py-3 text-center text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Viewer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { perm: 'View Telemetry Data', admin: true, broker: true, farmer: true, viewer: true },
                    { perm: 'Manage Cattle Records', admin: true, broker: true, farmer: true, viewer: false },
                    { perm: 'Configure Geofences', admin: true, broker: true, farmer: true, viewer: false },
                    { perm: 'Access Audit Logs', admin: true, broker: true, farmer: false, viewer: false },
                    { perm: 'Manage Users', admin: true, broker: false, farmer: false, viewer: false },
                    { perm: 'System Configuration', admin: true, broker: false, farmer: false, viewer: false },
                    { perm: 'Export Reports', admin: true, broker: true, farmer: true, viewer: false },
                    { perm: 'API Access', admin: true, broker: true, farmer: false, viewer: false },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap" style={{ fontSize: '0.875rem' }}>{row.perm}</td>
                      <td className="px-4 py-3 text-center">{row.admin ? <Check className="w-4 h-4 text-success mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                      <td className="px-4 py-3 text-center">{row.broker ? <Check className="w-4 h-4 text-success mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                      <td className="px-4 py-3 text-center">{row.farmer ? <Check className="w-4 h-4 text-success mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                      <td className="px-4 py-3 text-center">{row.viewer ? <Check className="w-4 h-4 text-success mx-auto" /> : <span className="text-gray-300">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Audit Logs - INFS 402 Enhancement */}
      {activeTab === 'audit' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Audit Trail Log</h3>
                <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Complete data access and modification tracking</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-success/10 text-success rounded whitespace-nowrap" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                  Logging Active
                </span>
              </div>
            </div>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Timestamp</th>
                    <th className="px-4 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>User</th>
                    <th className="px-4 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Action</th>
                    <th className="px-4 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Resource</th>
                    <th className="px-4 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { ts: '2026-07-13 10:14:02', user: 'admin@lesakaai.com', action: 'UPDATE', resource: 'cattle/BW-MUN-1109', ip: '192.168.1.45' },
                    { ts: '2026-07-13 10:12:15', user: 'andries@lesakaai.com', action: 'READ', resource: 'telemetry/all', ip: '192.168.1.45' },
                    { ts: '2026-07-13 10:08:33', user: 'admin@lesakaai.com', action: 'CREATE', resource: 'user/new', ip: '192.168.1.45' },
                    { ts: '2026-07-13 09:55:21', user: 'jane@greenfield.co.bw', action: 'READ', resource: 'cattle/list', ip: '41.215.12.89' },
                    { ts: '2026-07-13 09:42:18', user: 'admin@lesakaai.com', action: 'DELETE', resource: 'alert/45', ip: '192.168.1.45' },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap" style={{ fontSize: '0.75rem' }}>{log.ts}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap" style={{ fontSize: '0.875rem' }}>{log.user}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded whitespace-nowrap ${
                          log.action === 'CREATE' ? 'bg-success/10 text-success' :
                          log.action === 'UPDATE' ? 'bg-warning/10 text-warning' :
                          log.action === 'DELETE' ? 'bg-error/10 text-error' :
                          'bg-secondary/10 text-secondary'
                        }`} style={{ fontSize: '0.75rem', fontWeight: 500 }}>{log.action}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap" style={{ fontSize: '0.875rem' }}>{log.resource}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap" style={{ fontSize: '0.75rem' }}>{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Status - INFS 402 Enhancement */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Data Encryption</h3>
                  <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>AES-256 at rest and TLS 1.3 in transit</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Database Encryption</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>API Encryption</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Field Encryption</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Active</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Privacy Compliance</h3>
                  <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>GDPR and Botswana Data Protection Act</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Data Anonymization</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Consent Management</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Right to Deletion</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Implemented</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Security Metrics</h3>
                  <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Real-time security monitoring</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Failed Login Attempts (24h)</span>
                  <span className="text-text-dark" style={{ fontSize: '0.875rem', fontWeight: 600 }}>3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Active Sessions</span>
                  <span className="text-text-dark" style={{ fontSize: '0.875rem', fontWeight: 600 }}>12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Security Score</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>98/100</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Compliance Status</h3>
                  <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>Regulatory compliance tracking</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>3NF Database Validation</span>
                  <span className="px-2 py-1 bg-success/10 text-success rounded" style={{ fontSize: '0.75rem', fontWeight: 500 }}>Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Data Quality Score</span>
                  <span className="text-text-dark" style={{ fontSize: '0.875rem', fontWeight: 600 }}>94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600" style={{ fontSize: '0.875rem' }}>Last Audit</span>
                  <span className="text-gray-600" style={{ fontSize: '0.75rem' }}>2026-07-01</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Admin Footer */}
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-text-dark break-words" style={{ fontSize: '0.875rem', fontWeight: 700 }}>Andries Mooketsi Moiteelasilo</p>
            <p className="text-gray-500 break-words" style={{ fontSize: '0.75rem' }}>System Admin | +267 71 234 567</p>
          </div>
        </div>
        <span className="px-2 py-1 bg-primary/10 text-primary rounded whitespace-nowrap" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
          Principal System Administrator
        </span>
      </div>
    </div>
  );
}