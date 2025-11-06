
// views/CohortView.jsx
import React from 'react';
import { Plus } from 'lucide-react';
import CohortCard from '../components/CohortCard';

const CohortView = ({ cohorts, onOpenCohort }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Cohort Management</h2>
      <button className="btn-primary flex items-center gap-2">
        <Plus size={20} /> New Cohort
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cohorts.map((c) => <CohortCard key={c.id} cohort={c} onOpen={onOpenCohort} />)}
    </div>
  </div>
);

export default CohortView;
