
// components/CohortCard.jsx
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const CohortCard = ({ cohort, onOpen }) => (
  <div className="card p-5 hover:shadow-md transition">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{cohort.id}</h3>
        <p className="text-sm text-gray-600">{cohort.cohortType}</p>
      </div>
      <span className="pill-blue">{cohort.cohortSize} patients</span>
    </div>
    <div className="space-y-2 text-sm text-gray-700">
      <div className="flex items-center gap-2"><Clock size={16} className="text-gray-400" /><span>{cohort.liveSessionType}</span></div>
      <div className="flex items-center gap-2"><Calendar size={16} className="text-gray-400" /><span>{cohort.liveDays} at {cohort.liveTime}</span></div>
    </div>
    <button onClick={() => onOpen(cohort)} className="btn-secondary w-full mt-4">View Details</button>
  </div>
);

export default CohortCard;
