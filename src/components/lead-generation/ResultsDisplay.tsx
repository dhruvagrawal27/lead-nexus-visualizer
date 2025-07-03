
import React from 'react';
import { motion } from 'framer-motion';
import LeadCard from './LeadCard';
import { Lead } from '../../types/Lead';

interface ResultsDisplayProps {
  leads: Lead[];
  industry: string;
  location: string;
  onNewSearch: () => void;
}

const ResultsDisplay = ({ leads, industry, location, onNewSearch }: ResultsDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Lead Results
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Found {leads.length} high-quality leads for "{industry}" in "{location}"
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewSearch}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-full text-white font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all duration-300"
          >
            New Search
          </motion.button>
        </motion.div>

        {leads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map((lead, index) => (
              <LeadCard key={index} lead={lead} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">No Leads Found</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              We couldn't find any leads matching your criteria. Try adjusting your search terms or location.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNewSearch}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;
