import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FeatureCard = ({ icon, title, description, delay }: { 
  icon: string; 
  title: string; 
  description: string; 
  delay: number; 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
    >
      <div className="text-5xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: "🎯",
      title: "Precision Targeting",
      description: "Our AI-powered algorithms identify the most relevant leads for your specific industry and location, ensuring higher conversion rates."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get comprehensive lead data in seconds, not hours. Our advanced infrastructure processes thousands of data points instantly."
    },
    {
      icon: "🔒",
      title: "Secure & Compliant",
      description: "All data is collected and processed following strict privacy regulations and security protocols to protect your business."
    },
    {
      icon: "📊",
      title: "Rich Data Insights",
      description: "Access detailed company information, contact details, ratings, and more to make informed business decisions."
    },
    {
      icon: "🌐",
      title: "Global Coverage",
      description: "Search for leads across multiple countries and regions with our extensive global database network."
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "Every lead is verified and enriched with multiple data sources to ensure accuracy and completeness."
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Why Choose SamparkX?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of lead generation with SamparkX's cutting-edge technology and unmatched precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
