
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Transform your lead generation process today and start connecting with your ideal customers.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/leads"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full text-xl font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            >
              Start Generating Leads
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Email</h3>
            <p className="text-gray-300">support@leadnexus.com</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Live Chat</h3>
            <p className="text-gray-300">24/7 Support Available</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-cyan-500/20">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Get Started</h3>
            <p className="text-gray-300">No setup required</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
