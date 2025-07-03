
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchForm from '../components/lead-generation/SearchForm';
import LoadingOverlay from '../components/lead-generation/LoadingOverlay';
import ResultsDisplay from '../components/lead-generation/ResultsDisplay';
import { Lead } from '../types/Lead';

const LeadGeneration = () => {
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loadingMessages] = useState([
    "Scanning the digital universe for your perfect leads...",
    "Analyzing millions of data points across the web...",
    "AI algorithms are working their magic...",
    "Enriching data with comprehensive business insights...",
    "Preparing your curated lead collection..."
  ]);
  const [currentMessage, setCurrentMessage] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !location) return;

    setIsLoading(true);
    setHasSearched(true);
    setCurrentMessage(0);

    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    try {
      // Create AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minutes timeout

      const response = await fetch('https://dhruvthc.app.n8n.cloud/webhook/d728827d-2772-434f-aef7-68d5111b675f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry: industry,
          location: location
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log('Webhook response:', data); // Debug log
        
        // Handle both array and single object responses
        let processedLeads: Lead[] = [];
        if (Array.isArray(data)) {
          processedLeads = data;
        } else if (data && typeof data === 'object') {
          processedLeads = [data];
        }
        
        console.log('Processed leads:', processedLeads); // Debug log
        setLeads(processedLeads);
      } else {
        console.error('Failed to fetch leads, status:', response.status);
        setLeads([]);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timeout after 10 minutes');
      } else {
        console.error('Error fetching leads:', error);
      }
      setLeads([]);
    } finally {
      clearInterval(messageInterval);
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setLeads([]);
    setHasSearched(false);
    setIndustry('');
    setLocation('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              LeadNexus
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              ← Back to Home
            </motion.a>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingOverlay currentMessage={loadingMessages[currentMessage]} />
          ) : !hasSearched ? (
            <SearchForm
              industry={industry}
              location={location}
              isLoading={isLoading}
              onIndustryChange={setIndustry}
              onLocationChange={setLocation}
              onSubmit={handleSubmit}
            />
          ) : (
            <ResultsDisplay
              leads={leads}
              industry={industry}
              location={location}
              onNewSearch={handleNewSearch}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeadGeneration;
