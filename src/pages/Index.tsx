
import React from 'react';
import Hero from '../components/Hero';
import Navigation from '../components/Navigation';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Index;
