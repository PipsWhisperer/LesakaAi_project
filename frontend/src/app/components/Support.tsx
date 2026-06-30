import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, HelpCircle, ChevronDown, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen } from '../App';

interface SupportProps {
  onNavigate: (screen: Screen) => void;
}

export function Support({ onNavigate }: SupportProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: '',
  });

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Link Vector',
      description: 'Chat with field technician team',
      action: 'Start WhatsApp Chat',
      color: 'bg-primary',
      textColor: 'text-primary',
      available: true,
    },
    {
      icon: Mail,
      title: 'Tech Support Email Ingestion',
      description: 'support@lesakaai.com',
      action: 'Send Email',
      color: 'bg-secondary',
      textColor: 'text-secondary',
      available: true,
    },
    {
      icon: Phone,
      title: 'Emergency Voice Dispatch',
      description: '+27 (11) 555-0178',
      action: 'Call Support',
      color: 'bg-accent',
      textColor: 'text-accent',
      available: true,
    },
  ];

  const faqs = [
    {
      question: 'How do I register a new hardware device to my tenant account?',
      answer: 'Navigate to the Multi-Tenant Infrastructure Panel, select Hardware Asset Inventory, click "Add Device", and follow the provisioning wizard. You\'ll need the hardware ID and livestock node tag identifier.',
    },
    {
      question: 'What should I do if an IoT daemon goes offline?',
      answer: 'First, verify the device battery matrix is charged. If battery is nominal, attempt a hardware restart cycle. If the daemon remains offline for more than 45 minutes, contact field technical support.',
    },
    {
      question: 'How often should I recharge the tracking edge devices?',
      answer: 'Edge devices typically require recharging every 2-3 weeks depending on telemetry transmission frequency. You\'ll receive low battery threshold alerts when devices reach 30% capacity.',
    },
    {
      question: 'Can I customize alert exception thresholds?',
      answer: 'Yes! Navigate to System Settings > Alert Parameters to customize geofence boundary breach distances, battery warning levels, thermal stress thresholds, and other exception parameters.',
    },
    {
      question: 'How do I export matrix reports and analytics?',
      answer: 'Navigate to the Agent Thekiso NDVI Matrix Analyzer screen, select your desired report type, and click the "Export" button. Reports can be exported as PDF or CSV format.',
    },
    {
      question: 'What happens if I exceed my edge node capacity limit?',
      answer: 'You\'ll receive a notification when approaching your registered device limit. You can upgrade your commercial subscription plan anytime from the Billing screen to increase node capacity.',
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    alert('Support ticket submitted successfully!');
    setShowTicketForm(false);
    setTicketForm({ subject: '', category: 'technical', priority: 'medium', description: '' });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Contact Options */}
      <div>
        <h2 className="text-text-dark mb-4 break-words" style={{ fontWeight: 600, fontSize: '1.25rem' }}>Field Technician Escalation Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-5 overflow-hidden"
                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              >
                <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mb-3 flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-text-dark mb-1 break-words" style={{ fontWeight: 600 }}>{option.title}</h3>
                <p className="text-gray-600 mb-4 break-words" style={{ fontSize: '0.875rem' }}>{option.description}</p>
                <motion.button
                  className={`w-full py-2 ${option.textColor} border-2 ${option.textColor.replace('text-', 'border-')} rounded-lg`}
                  style={{ fontWeight: 600 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.action}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Submit Ticket */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Submit Technical Support Escalation Ticket</h3>
          <motion.button
            onClick={() => setShowTicketForm(!showTicketForm)}
            className="text-primary flex items-center gap-1 whitespace-nowrap"
            style={{ fontSize: '0.875rem', fontWeight: 500 }}
            whileTap={{ scale: 0.95 }}
          >
            {showTicketForm ? 'Cancel' : 'Create Ticket'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showTicketForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmitTicket} className="p-4 space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      Category
                    </label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing</option>
                      <option value="device">Device Setup</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      Priority
                    </label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    Description
                  </label>
                  <textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                    placeholder="Please provide detailed information about your issue..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-lg flex items-center justify-center gap-2"
                  style={{ fontWeight: 600 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Submit Ticket
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-text-dark break-words" style={{ fontWeight: 600 }}>Platform Frequently Asked Questions (FAQs)</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index}>
              <motion.button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors gap-2"
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-text-dark break-words" style={{ fontWeight: 500 }}>{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pl-12 md:pl-16">
                      <p className="text-gray-700 break-words" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-hidden">
        <h3 className="text-text-dark mb-4 break-words" style={{ fontWeight: 600 }}>System Documentation & Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="#" className="flex items-center gap-2 text-primary hover:underline break-words" style={{ fontSize: '0.875rem' }}>
            → Technical User Guide & API Documentation
          </a>
          <a href="#" className="flex items-center gap-2 text-primary hover:underline break-words" style={{ fontSize: '0.875rem' }}>
            → Hardware Device Provisioning Instructions
          </a>
          <a href="#" className="flex items-center gap-2 text-primary hover:underline break-words" style={{ fontSize: '0.875rem' }}>
            → Training Video Tutorials & Webinars
          </a>
          <a href="#" className="flex items-center gap-2 text-primary hover:underline break-words" style={{ fontSize: '0.875rem' }}>
            → Real-Time System Status & Health Page
          </a>
        </div>
      </div>

      {/* Support Hours */}
      <div className="bg-gradient-to-r from-secondary to-secondary/80 rounded-xl p-5 text-white overflow-hidden">
        <h3 className="mb-2 break-words" style={{ fontWeight: 600 }}>Support Operating Hours</h3>
        <p className="text-white/90 mb-3 break-words" style={{ fontSize: '0.875rem' }}>
          Monday - Friday: 8:00 AM - 8:00 PM SAST<br />
          Saturday: 9:00 AM - 5:00 PM SAST<br />
          Sunday: Closed (Critical emergency support available)
        </p>
        <p className="text-white/80 break-words" style={{ fontSize: '0.75rem' }}>
          Average response time: 2-4 hours for standard tickets | &lt;30 min for critical escalations
        </p>
      </div>
    </div>
  );
}