
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface SearchFormProps {
  industry: string;
  location: string;
  isLoading: boolean;
  onIndustryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm = ({
  industry,
  location,
  isLoading,
  onIndustryChange,
  onLocationChange,
  onSubmit
}: SearchFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20"
    >
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Lead Discovery
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Enter your search criteria and let our AI find the perfect leads for your business
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={onSubmit}
          className="space-y-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <label className="block text-lg font-medium text-cyan-400 mb-3">
              Target Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => onIndustryChange(e.target.value)}
              placeholder="e.g., Cybersecurity, Marketing, Healthcare"
              className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 text-lg"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <label className="block text-lg font-medium text-cyan-400 mb-3">
              Target Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="e.g., Mumbai, New York, London"
              className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-md border-2 border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all duration-300 text-lg"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl text-xl font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              Generate Leads
              <ArrowUp className="w-5 h-5 rotate-45" />
            </span>
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default SearchForm;
