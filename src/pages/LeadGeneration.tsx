import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface Lead {
  companyName: string;
  exactAddress: string;
  website: string;
  phoneNumber: string;
  emailAddress: string;
  rating: string;
  ratingCount: string;
}

const LoadingScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#00ffff" intensity={0.8} />
      
      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <mesh>
          <torusGeometry args={[2, 0.5, 16, 100]} />
          <MeshDistortMaterial
            color="#00ffff"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0}
            metalness={0.8}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, -2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#6600ff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </>
  );
};

const LeadCard = ({ lead, index }: { lead: Lead; index: number }) => {
  const emails = lead.emailAddress.split(', ').filter(email => email.trim());
  
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateY: 2, boxShadow: "0 25px 50px rgba(0, 255, 255, 0.2)" }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">
          {lead.website && lead.website !== "Not Known" ? (
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors duration-200"
            >
              {lead.companyName}
            </a>
          ) : (
            lead.companyName
          )}
        </h3>
        <div className="text-right">
          {lead.rating !== "Not Known" && (
            <div className="text-yellow-400 text-sm">
              ⭐ {lead.rating} ({lead.ratingCount})
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3 text-gray-300">
        <div>
          <span className="text-cyan-400 font-medium">Address:</span>
          <p className="text-sm mt-1">{lead.exactAddress}</p>
        </div>
        
        {lead.phoneNumber && (
          <div>
            <span className="text-cyan-400 font-medium">Phone:</span>
            <a
              href={`tel:${lead.phoneNumber}`}
              className="block text-sm mt-1 hover:text-cyan-400 transition-colors duration-200"
            >
              {lead.phoneNumber}
            </a>
          </div>
        )}
        
        {emails.length > 0 && (
          <div>
            <span className="text-cyan-400 font-medium">Email:</span>
            <div className="mt-1 space-y-1">
              {emails.map((email, emailIndex) => (
                <a
                  key={emailIndex}
                  href={`mailto:${email.trim()}`}
                  className="block text-sm hover:text-cyan-400 transition-colors duration-200"
                >
                  {email.trim()}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {lead.website && lead.website !== "Not Known" && (
          <div>
            <span className="text-cyan-400 font-medium">Website:</span>
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm mt-1 hover:text-cyan-400 transition-colors duration-200 truncate"
            >
              {lead.website}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

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
        setLeads(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch leads');
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
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900"
            >
              <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <Suspense fallback={null}>
                    <LoadingScene />
                  </Suspense>
                </Canvas>
              </div>
              <div className="relative z-10 text-center">
                <motion.h2
                  key={currentMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4"
                >
                  {loadingMessages[currentMessage]}
                </motion.h2>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 bg-cyan-400 rounded-full mx-auto"
                />
                <p className="text-sm text-gray-400 mt-4">
                  This may take up to 10 minutes for comprehensive results...
                </p>
              </div>
            </motion.div>
          ) : !hasSearched ? (
            <motion.div
              key="search"
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
                  onSubmit={handleSubmit}
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
                      onChange={(e) => setIndustry(e.target.value)}
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
                      onChange={(e) => setLocation(e.target.value)}
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
          ) : (
            <motion.div
              key="results"
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
                    onClick={handleNewSearch}
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
                      onClick={handleNewSearch}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LeadGeneration;
