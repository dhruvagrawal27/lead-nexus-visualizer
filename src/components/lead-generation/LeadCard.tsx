
import React from 'react';
import { motion } from 'framer-motion';
import { Lead } from '../../types/Lead';

interface LeadCardProps {
  lead: Lead;
  index: number;
}

const LeadCard = ({ lead, index }: LeadCardProps) => {
  const emails = lead.emailAddress && lead.emailAddress !== "Not Available" 
    ? lead.emailAddress.split(', ').filter(email => email.trim()) 
    : [];
  
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
          {lead.website && lead.website !== "Not Available" ? (
            <a
              href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
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
          {lead.rating !== "Not Available" && lead.rating && (
            <div className="text-yellow-400 text-sm">
              ⭐ {lead.rating} ({lead.ratingCount})
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-3 text-gray-300">
        {lead.category && (
          <div>
            <span className="text-cyan-400 font-medium">Category:</span>
            <p className="text-sm mt-1">{lead.category}</p>
          </div>
        )}
        
        {lead.exactAddress && lead.exactAddress !== "Not Available" && (
          <div>
            <span className="text-cyan-400 font-medium">Address:</span>
            <p className="text-sm mt-1">{lead.exactAddress}</p>
          </div>
        )}
        
        {lead.phoneNumber && lead.phoneNumber !== "Not Available" && (
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
        
        {lead.website && lead.website !== "Not Available" && (
          <div>
            <span className="text-cyan-400 font-medium">Website:</span>
            <a
              href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
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

export default LeadCard;
