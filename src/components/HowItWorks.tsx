
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StepCard = ({ step, title, description, delay }: {
  step: number;
  title: string;
  description: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: step % 2 === 0 ? 100 : -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: step % 2 === 0 ? 100 : -100 }}
      transition={{ duration: 0.8, delay }}
      className="flex items-center gap-8 mb-16"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
      >
        {step}
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 flex-1"
      >
        <h3 className="text-2xl font-bold text-cyan-400 mb-4">{title}</h3>
        <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      title: "Enter Your Criteria",
      description: "Simply input your target industry and location using our intuitive, futuristic search interface. Our AI understands context and provides intelligent suggestions."
    },
    {
      title: "AI Processing",
      description: "Our advanced algorithms scan through millions of data points across the web, social media, and business directories to find the perfect matches for your criteria."
    },
    {
      title: "Data Enrichment",
      description: "Each potential lead is enriched with comprehensive information including contact details, company data, ratings, and social media presence."
    },
    {
      title: "Quality Verification",
      description: "Our multi-layer verification process ensures that all leads are current, accurate, and relevant to your business requirements."
    },
    {
      title: "Instant Results",
      description: "Receive your curated list of high-quality leads in seconds, complete with all the information you need to start meaningful conversations."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our streamlined process makes lead generation effortless and incredibly effective.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 rounded-full opacity-30" />
          
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={index + 1}
              title={step.title}
              description={step.description}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
