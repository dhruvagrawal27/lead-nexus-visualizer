import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TestimonialCard = ({ name, company, role, testimonial, delay }: {
  name: string;
  company: string;
  role: string;
  testimonial: string;
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
      whileHover={{ scale: 1.02, rotateY: 2 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
    >
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-white">{name}</h4>
          <p className="text-cyan-400 font-medium">{role}</p>
          <p className="text-gray-400 text-sm">{company}</p>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed italic">"{testimonial}"</p>
      <div className="flex text-yellow-400 mt-4">
        {[...Array(5)].map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CEO",
      testimonial: "SamparkX transformed our sales process. We went from spending hours researching prospects to having qualified leads delivered instantly. Our conversion rate increased by 300%!"
    },
    {
      name: "Michael Chen",
      company: "Growth Marketing Pro",
      role: "Marketing Director",
      testimonial: "The quality of leads from SamparkX is outstanding. Every contact we receive is relevant and ready to engage. It's like having a team of researchers working 24/7."
    },
    {
      name: "Emily Rodriguez",
      company: "SaaS Solutions Ltd",
      role: "Sales Manager",
      testimonial: "I've tried many lead generation tools, but none come close to SamparkX. The data accuracy and the futuristic interface make it a joy to use. Highly recommended!"
    },
    {
      name: "David Thompson",
      company: "Digital Ventures",
      role: "Founder",
      testimonial: "SamparkX helped us scale our outreach efforts dramatically. The AI-powered targeting is incredibly precise, and we're closing deals faster than ever before."
    },
    {
      name: "Lisa Park",
      company: "Innovate Corp",
      role: "Business Development",
      testimonial: "The speed and accuracy of SamparkX is remarkable. What used to take us weeks now takes minutes. It's revolutionized how we approach lead generation."
    },
    {
      name: "James Wilson",
      company: "CloudTech Systems",
      role: "VP Sales",
      testimonial: "Outstanding platform! The 3D interface is not just beautiful but functional. Our team loves using it, and the results speak for themselves - 250% increase in qualified leads."
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their business with SamparkX.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              company={testimonial.company}
              role={testimonial.role}
              testimonial={testimonial.testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
