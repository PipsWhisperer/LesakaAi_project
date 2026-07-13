import React from 'react';
import { CreditCard, Download, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Screen } from '../App';

interface BillingProps {
  onNavigate: (screen: Screen) => void;
}

export function Billing({ onNavigate }: BillingProps) {
  const currentPlan = {
    name: 'Enterprise Site Plan',
    bwpPrice: 'P7,990',
    billingCycle: 'monthly',
    devicesIncluded: 1200,
    devicesUsed: 1192,
    nextPaymentDate: 'June 15, 2026',
    features: [
      'Up to 1,200 edge node devices',
      'Real-time telemetry tracking',
      'Custom geofence alerts',
      'Advanced NDVI matrix reports',
      'Priority technical support',
      'Full API access & webhooks',
    ],
  };

  const invoices = [
    { id: 'INV-2026-005', date: 'May 15, 2026', amount: 'P7,990', status: 'paid' },
    { id: 'INV-2026-004', date: 'Apr 15, 2026', amount: 'P7,990', status: 'paid' },
    { id: 'INV-2026-003', date: 'Mar 15, 2026', amount: 'P7,990', status: 'paid' },
    { id: 'INV-2026-002', date: 'Feb 15, 2026', amount: 'P7,990', status: 'paid' },
    { id: 'INV-2026-001', date: 'Jan 15, 2026', amount: 'P7,990', status: 'paid' },
  ];

  const plans = [
    { name: 'Entry', tier: 'Tier 1', bwpPrice: 'P990', devices: 50, popular: false },
    { name: 'Professional', tier: 'Tier 2', bwpPrice: 'P2,990', devices: 250, popular: false },
    { name: 'Enterprise', tier: 'Tier 3', bwpPrice: 'P7,990', devices: 1200, popular: true },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Current Plan */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white overflow-hidden">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-white/80 mb-1 break-words" style={{ fontSize: '0.875rem' }}>Active Commercial Subscription</p>
            <h2 className="mb-2 break-words" style={{ fontSize: '1.75rem', fontWeight: 700 }}>{currentPlan.name}</h2>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="whitespace-nowrap" style={{ fontSize: '2rem', fontWeight: 700 }}>{currentPlan.bwpPrice}</span>
              <span className="text-white/80">/ month</span>
            </div>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm whitespace-nowrap">
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Active</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <span className="text-white/90 break-words" style={{ fontSize: '0.875rem' }}>Registered Edge Nodes</span>
            <span style={{ fontWeight: 600 }} className="whitespace-nowrap">{currentPlan.devicesUsed} / {currentPlan.devicesIncluded}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full"
              style={{ width: `${(currentPlan.devicesUsed / currentPlan.devicesIncluded) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/20">
          <p className="text-white/90 mb-1 break-words" style={{ fontSize: '0.875rem' }}>Next Automated Payment Date</p>
          <p style={{ fontWeight: 600 }} className="break-words">{currentPlan.nextPaymentDate}</p>
        </div>
      </div>

      {/* Plan Features */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-hidden">
        <h3 className="text-text-dark mb-4 break-words" style={{ fontWeight: 600 }}>Enterprise Plan Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentPlan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-gray-700 break-words" style={{ fontSize: '0.875rem' }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Options */}
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Available Subscription Plans</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl border-2 p-5 ${
                plan.popular ? 'border-primary' : 'border-gray-200'
              } relative overflow-hidden`}
              whileHover={{ y: -4 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full whitespace-nowrap" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  Current Plan
                </div>
              )}
              
              <p className="text-gray-400 mb-1 break-words" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em' }}>{plan.tier}</p>
              <h4 className="text-text-dark mb-2 break-words" style={{ fontWeight: 600, fontSize: '1.125rem' }}>{plan.name}</h4>
              <div className="flex items-baseline gap-1 mb-3 flex-wrap">
                <span className="text-text-dark whitespace-nowrap" style={{ fontSize: '1.75rem', fontWeight: 700 }}>{plan.bwpPrice}</span>
                <span className="text-gray-500 whitespace-nowrap" style={{ fontSize: '0.875rem' }}>/ month</span>
              </div>
              <p className="text-gray-600 mb-4 break-words" style={{ fontSize: '0.875rem' }}>
                Up to {plan.devices} node devices
              </p>
              
              {plan.popular ? (
                <button
                  className="w-full py-2 bg-gray-100 text-gray-500 rounded-lg"
                  style={{ fontWeight: 500 }}
                  disabled
                >
                  Current Plan
                </button>
              ) : (
                <motion.button
                  className="w-full py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-2"
                  style={{ fontWeight: 500 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {index > 1 ? 'Upgrade Node Capacity' : 'Downgrade'}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-hidden">
        <h3 className="text-text-dark mb-4 break-words" style={{ fontWeight: 600 }}>Payment Method</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg flex-wrap gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-text-dark break-words" style={{ fontWeight: 600 }}>•••• •••• •••• 4242</p>
              <p className="text-gray-500 whitespace-nowrap" style={{ fontSize: '0.75rem' }}>Expires 12/26</p>
            </div>
          </div>
          <motion.button
            className="text-primary whitespace-nowrap" 
            style={{ fontSize: '0.875rem', fontWeight: 500 }}
            whileHover={{ scale: 1.05 }}
          >
            Update
          </motion.button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Historical Transaction Ledger</h3>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-200">
          {invoices.map((invoice, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-text-dark break-words" style={{ fontWeight: 600 }}>{invoice.id}</span>
                <span className="px-2 py-1 bg-success/10 text-success rounded whitespace-nowrap" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                  Paid
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600 flex-wrap gap-2" style={{ fontSize: '0.875rem' }}>
                <span className="break-words">{invoice.date}</span>
                <span style={{ fontWeight: 600 }} className="whitespace-nowrap">{invoice.amount}</span>
              </div>
              <motion.button
                className="mt-2 text-primary flex items-center gap-1"
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Invoice ID</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Date</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Amount</th>
                <th className="px-6 py-3 text-left text-gray-600 whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-text-dark whitespace-nowrap" style={{ fontWeight: 600 }}>{invoice.id}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{invoice.date}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap" style={{ fontWeight: 600 }}>{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-success/10 text-success rounded whitespace-nowrap" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      className="text-primary flex items-center gap-1 whitespace-nowrap"
                      style={{ fontSize: '0.875rem', fontWeight: 500 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}